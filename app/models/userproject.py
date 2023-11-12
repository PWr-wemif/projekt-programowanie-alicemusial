from pydantic import BaseModel


class UserProject(BaseModel):
    project_id: int
    status: str
