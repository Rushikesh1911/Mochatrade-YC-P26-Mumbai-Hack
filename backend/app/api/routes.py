"""Versioned API router composition."""
from fastapi import APIRouter
from app.api.v1 import analyze, upload

api_router = APIRouter(prefix="/api")
api_router.include_router(upload.router)
api_router.include_router(analyze.router)
