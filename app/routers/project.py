from app.models.project import Project
from fastapi import APIRouter

project = APIRouter(
    prefix="/project"
)


@project.get("/")
def get_project() -> Project:
    return Project(id=123, user_id=456, title="title", pattern_url="", materials=None)

