from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped, relationship
from sqlalchemy import String, Float, Integer, ForeignKey
from db.index import engine

class Base(DeclarativeBase):
    pass

class Item(Base):
    __tablename__ = 'items'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)          # Item name
    description: Mapped[str] = mapped_column(String(255), nullable=True)     # Item details
    price: Mapped[float] = mapped_column(Float, nullable=False)              # Price
    category: Mapped[str] = mapped_column(String(50), nullable=False)        # Category
    quantity: Mapped[int] = mapped_column(Integer, default=1)                # Stock count
    seller_id: Mapped[int] = mapped_column(ForeignKey("Users.id"), nullable=False)  # Link to User

    seller = relationship("User", back_populates="items")

Base.metadata.create_all(engine)

print("Item table created successfully!")