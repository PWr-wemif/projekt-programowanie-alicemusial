from app.models.user import User
from app.auth.hashing import Hash
from fastapi import APIRouter, HTTPException, Depends, status
from app.auth.jwttoken import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
import motor.motor_asyncio

DATABASE_URL = "mongodb://localhost:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URL)
db = client.app


origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

user_router = APIRouter(
    prefix="/user"
)


@user_router.post('/register')
def create_user(request: User):
    hashed_pass = Hash.bcrypt(request.password)
    user_object = dict(request)
    user_object["password"] = hashed_pass
    user_id = db["users"].insert(request.id)
    return {"res": "created"}


@user_router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends()):
    user = db["users"].find_one({"username": request.username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if not Hash.verify(user["password"], request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}
