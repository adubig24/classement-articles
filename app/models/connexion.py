from pymongo import MongoClient

class MongoAccess : 
    __USER = "root"
    __PW = "example"
    __HOST = "127.0.0.1"
    __PORT = 27017
    __DB_NAME = "DBLP"
    __COLLECTION_NAME = "publis"

    @classmethod
    def connexion(cls) :
        cls.client = MongoClient(f"mongodb://root:example@mongo:27017")
        cls.db = cls.client[cls.__DB_NAME]
        cls.collection = cls.db[cls.__COLLECTION_NAME]
        return cls.collection
    
    @classmethod
    def deconnexion(cls) :
        cls.client.close()