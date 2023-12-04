from app.database.user import user_collection
from app.models.user import User
from auth.jwt_handler import sign_jwt
from fastapi import APIRouter, Body, HTTPException
from passlib.context import CryptContext
from app.schemas.user import UserData, UserSignIn

user_router = APIRouter(
    prefix="/user"
)


@user_router.get("/")
def get_user() -> User:
    return User(id=678, password="1234", username="myname", avatar="qwer12", user_projects=[])


@user_router.post("/sign_up", response_model=UserData)
async def sign_up(user: User = Body(...)):
    user_exists = await user_collection.find_one(User.username == user.username)
    if user_exists:
        raise HTTPException(
            status_code=409, detail="User with username supplied already exists"
        )

    user.password = hash_helper.encrypt(user.password)
    new_user = await add_user(user)
    return {"message": f"New user created successfully: {new_user}"}


hash_helper = CryptContext(schemes=["bcrypt"])


@user_router.post("/login")
async def login(user_credentials: UserSignIn = Body(...)):
    user_exists = await User.find_one(User.username == user_credentials.username)
    if user_exists:
        password = hash_helper.verify(user_credentials.password, user_exists.password)
        if password:
            return sign_jwt(user_credentials.username)

        raise HTTPException(status_code=403, detail="Incorrect email or password")

    raise HTTPException(status_code=403, detail="Incorrect email or password")
