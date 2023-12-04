from app.database.user import user_collection
from app.models.user import User
from fastapi import APIRouter, Body, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

user_router = APIRouter(
    prefix="/user"
)


@user_router.get("/")
def get_user() -> User:
    return User(id=678, password="1234", username="myname", avatar="qwer12", user_projects=[])


@user_router.post("/sign_up")
async def sign_up(user: User = Body(...)):
    new_user = await user_collection.insert_one(
        user.model_dump(by_alias=True, exclude=["id"])
    )
    created_user = await user_collection.find_one(
        {"_id": new_user.inserted_id}
    )
    return {"message": f"New user created successfully: {created_user}"}



