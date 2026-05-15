from fastapi import APIRouter
from services.article_service import ArticleService
from services.publishing_service import PublishingService
from typing import List

router = APIRouter()

@router.get("/articles")
async def get_articles():
    return await ArticleService.get_all()

@router.get("/posts")
async def get_posts():
    return await PublishingService.get_all_posts()
