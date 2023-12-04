import motor.motor_asyncio

DATABASE_URL = "mongodb://localhost:27017"
client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URL)
database = client.app
user_collection = database.get_collection("user")
