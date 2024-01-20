from beanie import Document
from pydantic import BaseModel
from typing import List, Literal
from beanie import PydanticObjectId

class UserProject(Document):
    user_id: str
    project_id: str
    status: Literal["planned", "active", "completed"]

class UserProjectResponse(BaseModel):
    id: PydanticObjectId
    user_id: str
    project_id: str
    status: str
    title: str
    description: str
    project_image: str
    pattern_url: str
    is_public: bool
    materials: List[str]


class UpdateUserProjectStatus(BaseModel):
    id: str
    status: Literal["planned", "active", "completed"]