from app.models.project import User
from fastapi import APIRouter

user = APIRouter(
    prefix="/user"
)


@user.get("/")
def get_user() -> User:
    return User(id=678, password="1234", username="myname", avatar="qwer12", user_projects=[])
