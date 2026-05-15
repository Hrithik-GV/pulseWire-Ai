from ..models.schemas import Article
from ..database.mongodb import get_database

class ArticleService:
    @staticmethod
    async def create(article_data: dict):
        database = await get_database()
        article = Article(**article_data)
        await database["articles"].insert_one(article.model_dump())
        return article

    @staticmethod
    async def get_all():
        database = await get_database()
        cursor = database["articles"].find().sort("published_at", -1)
        return await cursor.to_list(length=100)

    @staticmethod
    async def get_by_workflow(workflow_id: str):
        database = await get_database()
        return await database["articles"].find_one({"workflow_id": workflow_id})
