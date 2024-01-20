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
from app.routers.userproject import user_project_router
from app.models.userproject import UserProject

app = FastAPI()

app.include_router(file_router, tags=["image"])
app.include_router(project_router, tags=["project"])
app.include_router(yarn_router, tags=["yarn-stash"])
app.include_router(user_project_router, tags=["user-project"])
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



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
            Yarn,
            UserProject
        ],
    )


@app.get('/')
def get_status():
    return {"message": ":)"}
