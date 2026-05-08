from sqlalchemy import create_engine
from sqlalchemy import Column,Integer,String
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()
engine = create_engine('postgresql://neondb_owner:npg_HoOAUYMB73XC@ep-raspy-cell-am24q0px-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require')  
Session = sessionmaker(bind=engine)
session = Session()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)

new_user = User(name= "Jas",  email= "jas@example.com", password= "password123")

Base.metadata.create_all(engine)

session.add(new_user)
session.commit()

for user in session.query(User).all():
    print(user.name, user.email, user.password)
