from pydantic import BaseModel
from typing import List, Literal, Optional
from beanie import Document


class Project(Document):
    author_id: str
    project_image: str
    title: str
    description: str
    pattern_url: str
    is_public: bool


class CreateProject(BaseModel):
    title: str
    project_image: str
    description: Optional[str]
    pattern_url: Optional[str]
    is_public: bool


class UpdateProject(BaseModel):
    title: str | None = None
    project_image: str | None = None
    description: str | None = None
    pattern_url: str | None = None
    is_public: bool | None = None
