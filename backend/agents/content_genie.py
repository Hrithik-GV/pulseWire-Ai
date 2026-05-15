from .agent_base import BaseAgent
from utils.llm_provider import llm
from typing import Dict, Any

class ContentGenie(BaseAgent):
    def __init__(self):
        super().__init__(
            name="ContentGenie",
            role="Editorial Content Generation Agent"
        )

    async def execute(self, workflow_id: str, context: Dict[str, Any]) -> Dict[str, Any]:
        await self.log(workflow_id, "GENERATION_START", "Drafting article and social posts...")
        
        news_title = context.get("title")
        news_source = context.get("source")
        research_data = context.get("research", "No deep research provided.")
        
        prompt = f"""
        Generate a professional journalism article and two social media posts based on this news:
        Title: {news_title}
        Source: {news_source}
        Research Data: {research_data}
        
        Article should be around 300 words.
        Social posts should be for Telegram and X (Twitter).
        """
        
        system_instruction = "You are a professional AI journalist for PulseWire AI. Write in a neutral, informative, and high-impact style."
        
        result = await llm.generate_text(prompt, system_instruction)
        
        await self.log(workflow_id, "GENERATION_SUCCESS", "Article and social posts drafted successfully.")
        
        return {
            "content": result,
            "agent": self.name
        }
