import os
import google.generativeai as genai
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

class LLMProvider:
    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY")
        self.openai_key = os.getenv("OPENAI_API_KEY")
        
        if self.gemini_key:
            genai.configure(api_key=self.gemini_key)
            self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')
        
        if self.openai_key:
            self.openai_client = AsyncOpenAI(api_key=self.openai_key)

    async def generate_text(self, prompt: str, system_instruction: str = "") -> str:
        # Prefer Gemini for PulseWire AI
        if self.gemini_key:
            try:
                response = self.gemini_model.generate_content(
                    f"System Instruction: {system_instruction}\n\nPrompt: {prompt}"
                )
                return response.text
            except Exception as e:
                print(f"Gemini Error: {e}")
        
        if self.openai_key:
            try:
                response = await self.openai_client.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": system_instruction},
                        {"role": "user", "content": prompt}
                    ]
                )
                return response.choices[0].message.content
            except Exception as e:
                print(f"OpenAI Error: {e}")

        return "Simulation: AI output generated based on context."

llm = LLMProvider()
