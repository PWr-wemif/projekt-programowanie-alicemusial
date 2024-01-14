from pydantic import BaseModel
from typing import List, Literal, Optional
from beanie import Document


class Project(Document):
    user_id: str
    project_image: str
    title: str
    description: str
    pattern_url: str
    is_public: bool
    materials: List[str]


class CreateProject(BaseModel):
    title: str
    project_image: str
    description: Optional[str]
    pattern_url: str
    is_public: bool
    materials: List[str]

