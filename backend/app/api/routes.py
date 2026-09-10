"""Versioned API router composition."""
from fastapi import APIRouter
from app.api.v1 import analyze, mitigate, simulate, upload

api_router = APIRouter(prefix="/api")
api_router.include_router(upload.router)
api_router.include_router(analyze.router)
api_router.include_router(simulate.router)
api_router.include_router(mitigate.router)
