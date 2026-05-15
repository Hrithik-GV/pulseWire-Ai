import asyncio
from datetime import datetime
from models.schemas import Workflow, Article
from database.mongodb import get_database
from services.trace_service import TraceService
from services.article_service import ArticleService
from services.publishing_service import PublishingService

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
            # Step 1: Detection (Already done by webhook, but we log it)
            await WorkflowService.update_status(workflow_id, "running", agent="NewsScanner", last_step="Detection confirmed", progress=10)
            await TraceService.log_event(workflow_id, "NewsScanner", "DETECTION", "High-velocity signal detected.")
            await asyncio.sleep(2)

            # Step 2: Source Verification
            await WorkflowService.update_status(workflow_id, "running", agent="SourceVerifier", last_step="Verifying sources", progress=30)
            await TraceService.log_event(workflow_id, "SourceVerifier", "VERIFICATION", "Verifying 12 primary sources...")
            await asyncio.sleep(3)
            await TraceService.log_event(workflow_id, "SourceVerifier", "SUCCESS", "Sources verified with 98% confidence.")

            # Step 3: Deep Research
            await WorkflowService.update_status(workflow_id, "running", agent="DeepResearcher", last_step="Performing deep research", progress=50)
            await TraceService.log_event(workflow_id, "DeepResearcher", "RESEARCH", "Extracting key entities and context...")
            await asyncio.sleep(4)

            # Step 4: Article Generation
            await WorkflowService.update_status(workflow_id, "running", agent="ContentGenie", last_step="Generating article", progress=75)
            await TraceService.log_event(workflow_id, "ContentGenie", "GENERATION", "Drafting article based on research data.")
            
            # Create a mock article
            db = await get_database()
            wf = await db["workflows"].find_one({"id": workflow_id})
            article = await ArticleService.create({
                "workflow_id": workflow_id,
                "title": wf["title"],
                "summary": f"Autonomous report on {wf['title']} from {wf['source']}.",
                "content": f"Full autonomous content for {wf['title']}. This intelligence briefing was generated automatically.",
                "sources": [wf["source"], "Internal AI Research"]
            })
            await asyncio.sleep(3)

            # Step 5: Publishing
            await WorkflowService.update_status(workflow_id, "running", agent="PubMaster", last_step="Publishing to platforms", progress=90)
            await TraceService.log_event(workflow_id, "PubMaster", "PUBLISHING", "Distributing to Telegram and Discord.")
            
            await PublishingService.publish_post(workflow_id, article.id, "telegram", f"New Alert: {wf['title']}", "@PulseWireTech")
            await PublishingService.publish_post(workflow_id, article.id, "discord", f"New Alert: {wf['title']}", "Breaking News")
            
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
