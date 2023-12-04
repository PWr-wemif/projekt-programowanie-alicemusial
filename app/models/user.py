from pydantic import BaseModel, Field, ConfigDict
from pydantic.functional_validators import BeforeValidator
from typing import Optional, List
from typing_extensions import Annotated
from bson import ObjectId
from app.models.userproject import UserProject

PyObjectId = Annotated[str, BeforeValidator(str)]


class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    password: str = Field(..., min_length=6)
    username: str = Field(..., min_length=6, unique=True)
    avatar: str
    user_projects: List[int]
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "password": "password123",
                "username": "testuser",
                "avatar": "avatar.jpg",
                "user_projects": [1, 2, 3],
            }
        },
    )


class UpdateUser(BaseModel):
    id: Optional[int] = None
    password: Optional[str] = None
    username: Optional[str] = None
    avatar: Optional[str] = None
    user_projects: Optional[List[int]] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        json_schema_extra={
            "example": {
                "id": 1,
                "password": "password123",
                "username": "testuser",
                "avatar": "avatar.jpg",
                "user_projects": [1, 2, 3],
            }
        },
    )


class NewUser(BaseModel):
    id: Optional[int] = None
    password: Optional[str] = None
    username: Optional[str] = None
    avatar: Optional[str] = None
    user_projects: Optional[List[int]] = None
