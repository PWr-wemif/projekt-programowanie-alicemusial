from app.models.project import UserProject
from fastapi import APIRouter

user_project = APIRouter(
    prefix="/user_project"
)


@user_project.get("/")
def get_user_project() -> UserProject:
    return UserProject(project_id=98, status="done")