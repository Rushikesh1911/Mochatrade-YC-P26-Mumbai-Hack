"""Centralized, environment-driven application settings."""
from dataclasses import dataclass
import os

@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "HedgeMind API")
    environment: str = os.getenv("ENVIRONMENT", "development")
    frontend_origin: str = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./hedgemind.db")

settings = Settings()
