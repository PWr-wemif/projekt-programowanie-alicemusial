from beanie import PydanticObjectId
from fastapi_users import schemas
from typing import Optional


class UserRead(schemas.BaseUser[PydanticObjectId]):
    username: str

class UserCreate(schemas.BaseUserCreate):
    username: str

class UserUpdate(schemas.BaseUserUpdate):
    pass