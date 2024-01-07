from pydantic import BaseModel
from typing import List, Literal
from beanie import Document


class Project(Document):
    user_id: str
    title: str
    description: str
    pattern_url: str
    status: Literal["Planned", "Active", "Completed"]
    public: bool
    materials: List[str]


class CreateProject(BaseModel):
    title: str
    description: str
    pattern_url: str
    status: Literal["Planned", "Active", "Completed"]
    public: bool
    materials: List[str]

