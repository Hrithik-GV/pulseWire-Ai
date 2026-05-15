from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
from uuid import uuid4

class WebhookRequest(BaseModel):
    title: str
    source: str
    url: str

class Workflow(BaseModel):
    id: str = Field(default_factory=lambda: f"wf_{uuid4().hex[:8]}")
    status: str = "pending" # pending, running, completed, error
    title: str
    source: str
    url: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    current_agent: Optional[str] = None
    last_step: Optional[str] = None
    progress: int = 0

class Article(BaseModel):
    id: str = Field(default_factory=lambda: f"art_{uuid4().hex[:8]}")
    workflow_id: str
    title: str
    summary: str
    content: str
    sources: List[str]
    published_at: datetime = Field(default_factory=datetime.utcnow)
    reach: Optional[str] = "0"

class Post(BaseModel):
    id: str = Field(default_factory=lambda: f"post_{uuid4().hex[:8]}")
    workflow_id: str
    article_id: str
    platform: str # telegram, discord, reddit
    content: str
    status: str = "pending" # pending, success, error
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    channel: Optional[str] = None

class Trace(BaseModel):
    id: str = Field(default_factory=lambda: f"tr_{uuid4().hex[:8]}")
    workflow_id: str
    agent: str
    event: str
    logs: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: Dict = {}
