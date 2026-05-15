from ..models.schemas import Post
from ..database.mongodb import get_database
from datetime import datetime

class PublishingService:
    @staticmethod
    async def publish_post(workflow_id: str, article_id: str, platform: str, content: str, channel: str = None):
        database = await get_database()
        
        # Simulate publishing delay
        print(f"Publishing to {platform}...")
        
        post = Post(
            workflow_id=workflow_id,
            article_id=article_id,
            platform=platform,
            content=content,
            channel=channel,
            status="success", # In real app, this would depend on API response
            timestamp=datetime.utcnow()
        )
        
        await database["posts"].insert_one(post.model_dump())
        return post

    @staticmethod
    async def get_all_posts():
        database = await get_database()
        cursor = database["posts"].find().sort("timestamp", -1)
        return await cursor.to_list(length=100)
