from app.models.user import User
from fastapi import APIRouter

user_router = APIRouter(
    prefix="/user"
)


@user_router.get("/")
def get_user() -> User:
    return User(id=678, password="1234", username="myname", avatar="qwer12", user_projects=[])
