from flask import Blueprint
from sqlalchemy.orm import Session
from backend.db.models.item import Item
from db.index import engine


item_bp = Blueprint('item', __name__, url_prefix='/items')
@item_bp.route('/', methods=['GET'])
def get_items():
    with Session(engine) as session:
        items = session.select(Item).all()
    return items
