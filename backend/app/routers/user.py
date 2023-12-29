from fastapi import APIRouter, HTTPException, Depends, status
from app.auth.hashing import Hash
from app.auth.jwttoken import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user import Register, User
from app.database.database import user_collection

user_router = APIRouter(prefix="/user")


@user_router.post('/register')
async def create_user(request: Register):
    existing_user = await user_collection.find_one({"username": request.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_pass = Hash.bcrypt(request.password)
    user_object = User(password=hashed_pass, username=request.username, user_projects=[]).model_dump()
    await user_collection.insert_one(user_object)
    return {"res": "created"}


@user_router.post('/login')
async def login(request: OAuth2PasswordRequestForm = Depends()):
    user = await user_collection.find_one({"username": request.username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if not Hash.verify(user["password"], request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect password")
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}
