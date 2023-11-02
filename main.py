import uvicorn
from fastapi import FastAPI
from app.routers.project import project

app = FastAPI()
app.include_router(project)


@app.get('/')
def get_status():
    return {"message": ":)"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
