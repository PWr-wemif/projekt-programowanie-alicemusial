from fastapi import APIRouter, Body, status, Depends
from app.models.yarn import Yarn, NewYarn
from app.auth.user import current_active_user
from beanie import PydanticObjectId
from typing import Optional

yarn_router = APIRouter(
    prefix="/yarn-stash"
)


@yarn_router.post(
    "/",
    response_description="Add new yarn",
    response_model=Yarn,
    status_code=status.HTTP_201_CREATED,
    response_model_by_alias=False
)
async def add_yarn(user=Depends(current_active_user), yarn: NewYarn = Body(...)):
    yarn_db = Yarn(user_id=str(user.id), brand=yarn.brand, blend=yarn.blend,
                   hook_size=yarn.hook_size, weight=yarn.weight,
                   length=yarn.length, photo=yarn.photo)
    new_yarn = await Yarn.insert_one(
        yarn_db
    )
    return new_yarn


@yarn_router.put(
    path="/{yarn_id}",
    response_model=Optional[Yarn],
    status_code=status.HTTP_202_ACCEPTED
)
async def update_yarn(yarn_id: str, user=Depends(current_active_user), yarn: NewYarn = Body(...)):
    current_yarn = await Yarn.find_one(Yarn.user_id == str(user.id),
                                       Yarn.id == PydanticObjectId(yarn_id))
    if current_yarn:
        current_yarn.brand = yarn.brand,
        current_yarn.blend = yarn.blend,
        current_yarn.hook_size = yarn.hook_size,
        current_yarn.weight = yarn.weight,
        current_yarn.length = yarn.length,
        current_yarn.photo = yarn.photo
        await current_yarn.save()
        return current_yarn
    return None


@yarn_router.delete(
    path="/{yarn_id}",
    response_model=Optional[Yarn],
    status_code=status.HTTP_202_ACCEPTED
)
async def delete_yarn(yarn_id: str, user=Depends(current_active_user), yarn: NewYarn = Body(...)):
    yarn = await Yarn.find_one(Yarn.user_id == str(user.id),
                                     Yarn.id == PydanticObjectId(yarn_id))
    if yarn:
        await yarn.delete()

    return None


@yarn_router.get(
    path="/{yarn_id}",
    status_code=status.HTTP_200_OK
)
async def list_yarn(user=Depends(current_active_user)):
    yarn_list = await Yarn.find(Yarn.user_id == str(user.id)).to_list()

    return yarn_list
