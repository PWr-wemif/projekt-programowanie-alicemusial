from app.models.userproject import UserProject, UserProjectResponse, UpdateUserProjectStatus
from fastapi import APIRouter, status, Depends, Body
from app.auth.user import current_active_user
from bson import ObjectId
from fastapi import HTTPException
from beanie import PydanticObjectId
from app.models.project import Project

user_project_router = APIRouter(
    prefix="/user_project"
)


@user_project_router.post(
    "/{project_id}",
    response_description="Add user project",
    response_model=UserProject,
    status_code=status.HTTP_201_CREATED,
    response_model_by_alias=False
)
async def add_user_project(project_id: str, user=Depends(current_active_user)):
    user_project_db = UserProject(user_id=str(user.id), project_id=project_id, status="planned")
    new_user_project = await UserProject.insert_one(user_project_db)
    return new_user_project

@user_project_router.put(
    path="/",
    response_model=UserProject,
    status_code=status.HTTP_202_ACCEPTED
)
async def update_user_project(user=Depends(current_active_user), user_project: UpdateUserProjectStatus = Body(...)):
    current_user_project = await UserProject.find_one(
        UserProject.id == PydanticObjectId(user_project.id),
        UserProject.user_id == str(user.id)
    )
        
    if current_user_project:
        current_user_project.status = user_project.status
        await current_user_project.save()
        return current_user_project
    
    return None

@user_project_router.get(
    path="/",
    response_model=list[UserProjectResponse],
    status_code=status.HTTP_200_OK)
async def get_user_projects(user=Depends(current_active_user)):
    user_projects_response = []
    user_projects = await UserProject.find(UserProject.user_id == str(user.id)).to_list()
    for user_project in user_projects:
        project = await Project.find_one(Project.id == PydanticObjectId(user_project.project_id))
        user_project_response = UserProjectResponse(
            id=user_project.id,
            user_id=user_project.user_id,
            project_id=user_project.project_id,
            status=user_project.status,
            title=project.title,
            description=project.description,
            project_image=project.project_image,
            pattern_url=project.pattern_url,
            is_public=project.is_public,
            materials=project.materials
        )
        user_projects_response.append(user_project_response)
    
    return user_projects_response