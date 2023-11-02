from pydantic import BaseModel


class Project(BaseModel):
    id: int
    user_id: int
    title: str
    description: str | None = None
    pattern_url: str
    materials: None
