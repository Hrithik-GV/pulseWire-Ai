from fastapi import APIRouter, BackgroundTasks, HTTPException
from ..models.schemas import WebhookRequest, Workflow
from ..services.workflow_service import WorkflowService
from ..services.trace_service import TraceService
from typing import List

router = APIRouter()

@router.post("/webhook/news")
async def trigger_news_workflow(request: WebhookRequest, background_tasks: BackgroundTasks):
    """
    Receives incoming news trigger and starts the autonomous workflow.
    """
    # 1. Create Workflow in DB
    workflow = await WorkflowService.create_workflow(
        title=request.title,
        source=request.source,
        url=request.url
    )
    
    # 2. Start Async Execution
    background_tasks.add_task(WorkflowService.execute_autonomous_workflow, workflow.id)
    
    return {
        "message": "Workflow initiated successfully",
        "workflow_id": workflow.id,
        "status": "running"
    }

@router.get("/workflows", response_model=List[Workflow])
async def get_all_workflows():
    return await WorkflowService.get_all()

@router.get("/workflow/{id}")
async def get_workflow_details(id: str):
    workflow = await WorkflowService.get_by_id(id)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
        
    traces = await TraceService.get_by_workflow(id)
    
    return {
        "workflow": workflow,
        "traces": traces
    }
