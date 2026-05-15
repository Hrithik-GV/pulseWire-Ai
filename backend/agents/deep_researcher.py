from .agent_base import BaseAgent
from utils.llm_provider import llm
from typing import Dict, Any

class DeepResearcher(BaseAgent):
    def __init__(self):
        super().__init__(
            name="DeepResearcher",
            role="Contextual Research & Entity Extraction Agent"
        )

    async def execute(self, workflow_id: str, context: Dict[str, Any]) -> Dict[str, Any]:
        await self.log(workflow_id, "RESEARCH_START", "Extracting key entities, timelines, and background context...")
        
        title = context.get("title")
        
        prompt = f"Perform deep research on the topic: {title}. Identify key players, historical context, and potential future implications."
        system_instruction = "You are a research analyst. Extract entities and provide a structured context summary."
        
        result = await llm.generate_text(prompt, system_instruction)
        
        await self.log(workflow_id, "RESEARCH_COMPLETE", "Research report generated.")
        
        return {
            "research_report": result
        }
