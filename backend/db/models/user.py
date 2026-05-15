from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import String
from typing import List
from .base import Base

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(30), nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(200), nullable=False)
    
    items: Mapped[List["Item"]] = relationship(
        "Item", 
        back_populates="owner", 
        cascade="all, delete-orphan"
    )
