from bson.objectid import ObjectId
import motor.motor_asyncio

MONGO_DETAILS = "mongodb://localhost:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client.app
project_collection = database.get_collection("project")


def project_helper(project) -> dict:
    return {
        "id": int(project["_id"]),
        "user_id": project["user_id"],
        "title": project["title"],
        "description": project["description"],
        "pattern_url": project["pattern_url"]
    }


# get all projects existing in the database
async def get_all_projects():
    projects = []
    async for project in project_collection.find():
        projects.append(project_helper(project))
    return projects


# adds new project into the database
async def add_project(project_data: dict) -> dict:
    project = await project_collection.insert_one(project_data)
    new_project = await project_collection.find_one({"_id": project.inserted_id})
    return project_helper(new_project)


# get a project with same id
async def get_project(id: str) -> dict:
    project = await project_collection.find_one({"_id": ObjectId(id)})
    if project:
        return project_helper(project)


# update project with same id
async def update_project(id: str, data: dict):
    # return false if an empty request is sent.
    if len(data) < 1:
        return False
    project = await project_collection.find_one({"_id": ObjectId(id)})
    if project:
        updated_project = await project_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_project:
            return True
        return False


# delete project from the database
async def delete_project(id: str):
    project = await project_collection.find_one({"_id": ObjectId(id)})
    if project:
        await project_collection.delete_one({"_id": ObjectId(id)})
        return True
