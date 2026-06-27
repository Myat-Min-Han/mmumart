from backend.models import cart, item
from sqlalchemy import create_engine
from backend.models.base import Base
from backend.models import user, item, cart

engine = create_engine(
    'postgresql://neondb_owner:npg_HoOAUYMB73XC@ep-raspy-cell-am24q0px-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
)

def init_db():
    Base.metadata.create_all(engine)
    print("Migration completed! Tables are created successfully!")

if __name__ == "__main__":
    init_db()

