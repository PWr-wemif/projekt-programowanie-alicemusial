from fastapi import APIRouter, Body, status, Depends
from app.models.project import Project, CreateProject
from app.auth.user import current_active_user
from beanie import PydanticObjectId
from typing import Optional

project_router = APIRouter(
    prefix="/project"
)


@project_router.post(
    "/",
    response_description="Add new project",
    response_model=Project,
    status_code=status.HTTP_201_CREATED,
    response_model_by_alias=False
)
async def create_project(user=Depends(current_active_user), project: CreateProject = Body(...)):
    project_db = Project(user_id=str(user.id), title=project.title, description=project.description,
                         pattern_url=project.pattern_url, status=project.status, public=project.public,
                         materials=project.materials)
    new_project = await Project.insert_one(
        project_db
    )
    return new_project


@project_router.put(
    path="/{project_id}",
    response_model=Optional[Project],
    status_code=status.HTTP_202_ACCEPTED
)
async def update_project(project_id: str, user=Depends(current_active_user), project: CreateProject = Body(...)):
    current_project = await Project.find_one(Project.user_id == str(user.id),
                                             Project.id == PydanticObjectId(project_id))
    if current_project:
        current_project.title = project.title
        current_project.description = project.description
        current_project.pattern_url = project.pattern_url
        current_project.status = project.status
        current_project.public = project.public
        current_project.materials = project.materials
        await current_project.save()
        return current_project
    return None


@project_router.delete(
    path="/{project_id}",
    response_model=Optional[Project],
    status_code=status.HTTP_202_ACCEPTED
)
async def delete_project(project_id: str, user=Depends(current_active_user), project: CreateProject = Body(...)):
    project = await Project.find_one(Project.user_id == str(user.id),
                                     Project.id == PydanticObjectId(project_id))
    if project:
        await project.delete()

    return None

