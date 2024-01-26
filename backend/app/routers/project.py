from fastapi import APIRouter, Body, status, Depends
from app.models.project import Project, CreateProject, UpdateProject
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
    project_db = Project(author_id=str(user.id), title=project.title, project_image=project.project_image,
                         description=project.description,
                         pattern_url=project.pattern_url, is_public=project.is_public)
    new_project = await Project.insert_one(
        project_db
    )
    return new_project


@project_router.put(
    path="/{project_id}",
    response_model=Optional[Project],
    status_code=status.HTTP_202_ACCEPTED
)
async def update_project(
    project_id: str,
    project: UpdateProject,
    user=Depends(current_active_user)
):
    current_project = await Project.find_one(
        Project.author_id == str(user.id),
        Project.id == PydanticObjectId(project_id)
    )

    if current_project:
        if project.title is not None:
            current_project.title = project.title
        if project.project_image is not None:
            current_project.project_image = project.project_image
        if project.description is not None:
            current_project.description = project.description
        if project.pattern_url is not None:
            current_project.pattern_url = project.pattern_url
        if project.is_public is not None:
            current_project.is_public = project.is_public

        await current_project.save()
        return current_project

    return None

@project_router.delete(
    path="/{project_id}",
    response_model=Optional[Project],
    status_code=status.HTTP_202_ACCEPTED
)
async def delete_project(project_id: str, user=Depends(current_active_user)):
    project = await Project.find_one(Project.author_id == str(user.id),
                                     Project.id == PydanticObjectId(project_id))
    if project:
        await project.delete()

    return None

@project_router.get(
    path="/",
    status_code=status.HTTP_200_OK
)
async def list_private_projects(user=Depends(current_active_user)):
    projects_list = await Project.find(Project.author_id == str(user.id)).to_list()

    return projects_list

@project_router.get(
    path="/public",
    status_code=status.HTTP_200_OK
)
async def list_public_projects():
    public_projects = await Project.find(Project.is_public == True).to_list()

    return public_projects



