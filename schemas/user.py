from pydantic import BaseModel
from fastapi.security import HTTPBasicCredentials


class UserSignIn(HTTPBasicCredentials):
    class Config:
        schema_extra = {
            "example": {"username": "testuser", "password": "3xt3m#"}
        }


class AdminData(BaseModel):
    username: str

    class Config:
        schema_extra = {
            "example": {
                "username": "username",
            }
        }