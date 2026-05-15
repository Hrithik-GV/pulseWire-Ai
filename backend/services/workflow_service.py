import asyncio
from datetime import datetime
from models.schemas import Workflow, Article
from database.mongodb import get_database
from services.trace_service import TraceService
from services.article_service import ArticleService
from services.publishing_service import PublishingService
from agents.source_verifier import SourceVerifier
from agents.deep_researcher import DeepResearcher
from agents.content_genie import ContentGenie

class WorkflowService:
    @staticmethod
    async def create_workflow(title: str, source: str, url: str):
        database = await get_database()
        workflow = Workflow(title=title, source=source, url=url)
        await database["workflows"].insert_one(workflow.model_dump())
        return workflow

    @staticmethod
    async def update_status(workflow_id: str, status: str, agent: str = None, last_step: str = None, progress: int = None):
        database = await get_database()
        update_data = {"status": status}
        if agent: update_data["current_agent"] = agent
        if last_step: update_data["last_step"] = last_step
        if progress is not None: update_data["progress"] = progress
        if status == "completed": update_data["completed_at"] = datetime.utcnow()
        
        await database["workflows"].update_one({"id": workflow_id}, {"$set": update_data})

    @staticmethod
    async def execute_autonomous_workflow(workflow_id: str):
        """
        Orchestrates the multi-agent workflow asynchronously.
        """
        try:
            # Step 1: Detection (Already done by webhook)
            await WorkflowService.update_status(workflow_id, "running", agent="NewsScanner", last_step="Detection confirmed", progress=10)
            await TraceService.log_event(workflow_id, "NewsScanner", "DETECTION", "Signal received and validated.")

            # Context for agents
            db = await get_database()
            wf = await db["workflows"].find_one({"id": workflow_id})
            context = {"title": wf["title"], "source": wf["source"], "url": wf["url"]}

            # Step 2: Source Verification
            await WorkflowService.update_status(workflow_id, "running", agent="SourceVerifier", last_step="Verifying sources", progress=30)
            verifier = SourceVerifier()
            v_report = await verifier.execute(workflow_id, context)
            context["verification"] = v_report

            # Step 3: Deep Research
            await WorkflowService.update_status(workflow_id, "running", agent="DeepResearcher", last_step="Performing deep research", progress=50)
            researcher = DeepResearcher()
            r_report = await researcher.execute(workflow_id, context)
            context["research"] = r_report["research_report"]

            # Step 4: Article Generation
            await WorkflowService.update_status(workflow_id, "running", agent="ContentGenie", last_step="Generating article", progress=75)
            genie = ContentGenie()
            content_report = await genie.execute(workflow_id, context)
            
            # Save the real AI generated article
            article = await ArticleService.create({
                "workflow_id": workflow_id,
                "title": wf["title"],
                "summary": f"Autonomous intelligence briefing on {wf['title']}.",
                "content": content_report["content"],
                "sources": [wf["source"], "AI Research"]
            })

            # Step 5: Publishing
            await WorkflowService.update_status(workflow_id, "running", agent="PubMaster", last_step="Publishing to platforms", progress=90)
            await TraceService.log_event(workflow_id, "PubMaster", "PUBLISHING", "Distributing to social platforms.")
            
            await PublishingService.publish_post(workflow_id, article.id, "telegram", f"🚨 BREAKING: {wf['title']}\nRead more: http://pulsewire.ai/article/{article.id}", "@PulseWireNews")
            await PublishingService.publish_post(workflow_id, article.id, "discord", f"**NEWS ALERT**: {wf['title']}", "Breaking Feed")
            
            await asyncio.sleep(2)

            # Finalize
            await WorkflowService.update_status(workflow_id, "completed", progress=100, last_step="Published to all platforms")
            await TraceService.log_event(workflow_id, "System", "COMPLETED", "Workflow finished successfully.")

        except Exception as e:
            await WorkflowService.update_status(workflow_id, "error", last_step=f"Error: {str(e)}")
            await TraceService.log_event(workflow_id, "System", "ERROR", f"Workflow failed: {str(e)}")

    @staticmethod
    async def get_all():
        database = await get_database()
        cursor = database["workflows"].find().sort("created_at", -1)
        return await cursor.to_list(length=100)

    @staticmethod
    async def get_by_id(workflow_id: str):
        database = await get_database()
        return await database["workflows"].find_one({"id": workflow_id})
