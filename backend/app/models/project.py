from pydantic import BaseModel, Field, ConfigDict
from pydantic.functional_validators import BeforeValidator
from typing import Optional, List
from typing_extensions import Annotated
from bson import ObjectId

PyObjectId = Annotated[str, BeforeValidator(str)]


class Project(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: int
    title: str
    description: str
    pattern_url: str
    materials: List[int]
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "user_id": 1,
                "title": "Project Title",
                "description": "Project Description",
                "pattern_url": "http://example.com/pattern",
                "materials": [1, 2, 3],
            }
        },
    )


class UpdateProject(BaseModel):
    author_id: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    pattern_url: Optional[str] = None
    materials_ids: Optional[List[int]] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        json_schema_extra={
            "example": {
                "author_id": 1,
                "title": "Project Title",
                "description": "Project Description",
                "pattern_url": "http://example.com/pattern",
                "materials_ids": [1, 2, 3],
            }
        },
    )


class ProjectCollection(BaseModel):
    projects: List[Project]
