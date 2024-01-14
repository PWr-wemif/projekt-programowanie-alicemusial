from pydantic import BaseModel
from typing import Optional
from beanie import Document


class Yarn(Document):
    user_id: str
    brand: str
    blend: str
    hook_size: float
    weight: int
    length: int
    photo: str


class NewYarn(BaseModel):
    brand: str
    blend: str
    hook_size: float
    weight: Optional[int]
    length: Optional[int]
    photo: Optional[str]
