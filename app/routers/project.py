from app.models.project import Project, UpdateProject, ProjectCollection
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import Response
from app.database.project import project_collection
from bson import ObjectId
from pymongo import ReturnDocument


project_router = APIRouter(
    prefix="/project"
)


@project_router.get("/")
def get_project() -> Project:
    return Project(id=123, user_id=456, title="title", pattern_url="", materials=None)


@project_router.post(
    "/",
    response_description="Add new project",
    response_model=Project,
    status_code=status.HTTP_201_CREATED,
    response_model_by_alias=False
)
async def create_project(project: Project = Body(...)):
    new_project = await project_collection.insert_one(
        project.model_dump(by_alias=True, exclude=["id"])
    )
    created_project = await project_collection.find_one(
        {"_id": new_project.inserted_id}
    )
    return created_project


@project_router.get(
    "/",
    response_description="List all projects",
    response_model=ProjectCollection,
    response_model_by_alias=False
)
async def list_projects():
    projects_data = await project_collection.find().to_list(1000)

    for project in projects_data:
        try:
            project['author_id'] = int(project['author_id'])
        except ValueError:
            project['author_id'] = None

    return ProjectCollection(projects=projects_data)


@project_router.get(
    "/{id}",
    response_description="Get a single project",
    response_model=Project,
    response_model_by_alias=False,
)
async def show_project(id: str):
    if (
        project := await project_collection.find_one({"_id": ObjectId(id)})
    ) is not None:
        return project

    raise HTTPException(status_code=404, detail=f"Project {id} not found")


@project_router.put(
    "/{id}",
    response_description="Update a project",
    response_model=Project,
    response_model_by_alias=False,
)
async def update_project(id: str, project: UpdateProject = Body(...)):
    project = {
        k: v for k, v in project.model_dump(by_alias=True).items() if v is not None
    }

    if len(project) >= 1:
        update_result = await project_collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": project},
            return_document=ReturnDocument.AFTER,
        )
        if update_result is not None:
            return update_result
        else:
            raise HTTPException(status_code=404, detail=f"Project {id} not found")

    if (existing_project := await project_collection.find_one({"_id": id})) is not None:
        return existing_project

    raise HTTPException(status_code=404, detail=f"Project {id} not found")


@project_router.delete("/projects/{id}", response_description="Delete a project")
async def delete_project(id: str):
    delete_result = await project_collection.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Project {id} not found")