import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "pulsewire_db")

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

    async def connect(self):
        self.client = AsyncIOMotorClient(MONGODB_URI)
        self.db = self.client[DATABASE_NAME]
        print(f"Connected to MongoDB: {DATABASE_NAME}")

    async def close(self):
        if self.client:
            self.client.close()
            print("MongoDB connection closed")

db = MongoDB()

async def get_database():
    return db.db
