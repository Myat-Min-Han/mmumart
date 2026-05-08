from sqlalchemy import (
    Column,
    Integer,
    String,
    text                
)   
from sqlalchemy.orm import declarative_base
from index import engine

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)

Base.metadata.create_all(engine)

print("Tables created successfully!")