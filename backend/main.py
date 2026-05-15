import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database.mongodb import db
from routes import workflow_routes, content_routes

load_dotenv()

app = FastAPI(
    title="PulseWire AI Backend",
    description="Autonomous AI journalism and multi-platform publishing platform",
    version="1.0.0"
)

# CORS Configuration
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Events
@app.on_event("startup")
async def startup_db_client():
    await db.connect()

@app.on_event("shutdown")
async def shutdown_db_client():
    await db.close()

# Routes
app.include_router(workflow_routes.router, tags=["Workflows"])
app.include_router(content_routes.router, tags=["Content"])

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "PulseWire AI Backend",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
