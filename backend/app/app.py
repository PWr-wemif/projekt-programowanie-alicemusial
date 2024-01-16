from fastapi import FastAPI, Depends
from app.routers.project import project_router
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from app.database.database import User, db
from app.auth.user import auth_backend, current_active_user, fastapi_users
from app.models.user import UserCreate, UserRead, UserUpdate
from app.models.project import Project
from app.routers.file import file_router
from app.models.yarn import Yarn
from app.routers.yarn import yarn_router

app = FastAPI()

app.include_router(file_router, tags=["image"])
app.include_router(project_router, tags=["project"])
app.include_router(yarn_router, tags=["yarn-stash"])
app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

origins = [
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await init_beanie(
        database=db,
        document_models=[
            User,
            Project,
            Yarn
        ],
    )


@app.get('/')
def get_status():
    return {"message": ":)"}


@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}


