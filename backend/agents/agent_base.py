import os
from abc import ABC, abstractmethod
from typing import Dict, Any
from services.trace_service import TraceService

class BaseAgent(ABC):
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role

    async def log(self, workflow_id: str, event: str, logs: str, metadata: dict = {}):
        """Logs agent activity to the tracing system."""
        await TraceService.log_event(
            workflow_id=workflow_id,
            agent=self.name,
            event=event,
            logs=logs,
            metadata=metadata
        )

    @abstractmethod
    async def execute(self, workflow_id: str, context: Dict[str, Any]) -> Dict[str, Any]:
        """Core logic of the agent."""
        pass
