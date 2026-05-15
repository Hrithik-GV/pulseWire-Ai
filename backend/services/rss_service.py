import feedparser
import httpx
from typing import List, Dict

class RSSService:
    @staticmethod
    async def fetch_latest_news(feed_url: str) -> List[Dict]:
        """
        Fetches and parses news from an RSS feed.
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(feed_url)
                if response.status_code != 200:
                    return []
                
                feed = feedparser.parse(response.text)
                news_items = []
                
                for entry in feed.entries[:10]: # Limit to top 10
                    news_items.append({
                        "title": entry.title,
                        "link": entry.link,
                        "summary": entry.get("summary", ""),
                        "published": entry.get("published", ""),
                        "source": feed.feed.get("title", "Unknown Source")
                    })
                
                return news_items
        except Exception as e:
            print(f"Error fetching RSS: {e}")
            return []
