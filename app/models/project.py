from pydantic import BaseModel, Field


class Project(BaseModel):
    id: int
    user_id: int = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    pattern_url: str = Field(...)
    materials: None
