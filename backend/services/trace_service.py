from datetime import datetime
from models.schemas import Trace
from database.mongodb import get_database

class TraceService:
    @staticmethod
    async def log_event(workflow_id: str, agent: str, event: str, logs: str, metadata: dict = {}):
        database = await get_database()
        trace = Trace(
            workflow_id=workflow_id,
            agent=agent,
            event=event,
            logs=logs,
            metadata=metadata
        )
        await database["traces"].insert_one(trace.model_dump())
        print(f"[{datetime.now()}] {agent}: {event}")
        return trace

    @staticmethod
    async def get_by_workflow(workflow_id: str):
        database = await get_database()
        cursor = database["traces"].find({"workflow_id": workflow_id}).sort("timestamp", 1)
        return await cursor.to_list(length=100)
