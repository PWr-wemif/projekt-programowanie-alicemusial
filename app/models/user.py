from pydantic import BaseModel
from app.models.project import UserProject


class User(BaseModel):
    id: int
    password: str
    username: str
    avatar: str
    user_projects: []UserProject

