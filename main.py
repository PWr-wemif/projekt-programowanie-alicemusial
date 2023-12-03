import uvicorn
from fastapi import FastAPI
from app.routers.project import project_router
from app.routers.user import user_router


app = FastAPI()
app.include_router(project_router)
app.include_router(user_router)


@app.get('/')
def get_status():
    return {"message": ":)"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
