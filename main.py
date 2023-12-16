import uvicorn
from fastapi import FastAPI
from app.routers.project import project_router
from app.routers.user import user_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(project_router)
app.include_router(user_router)

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def get_status():
    return {"message": ":)"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
