from flask import Blueprint, jsonify, jsonify, request
from sqlalchemy.orm import Session
from backend.db.models.item import Item
from db.index import engine


item_bp = Blueprint('item', __name__, url_prefix='/items')
@item_bp.route('/', methods=['GET'])
def get_items():
    with Session(engine) as session:
        items = session.query(Item).all()
    return jsonify([item.to_dict() for item in items])

@item_bp.route('/<int:item_id>', methods=['GET'])
def get_item(item_id):
    with Session(engine) as session:
        item = session.get(Item, item_id)
        if item:
            return jsonify(item.to_dict())
        return jsonify({"error": "Item not found"}), 404

@item_bp.route('/', methods=['POST'])
def create_item():
    data = request.json
    with Session(engine) as session:
        new_item = Item(**data)
        session.add(new_item)
        session.commit()
        return jsonify(new_item.to_dict()), 201

# UPDATE existing item
@item_bp.route('/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.json
    with Session(engine) as session:
        item = session.get(Item, item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404
        for key, value in data.items():
            setattr(item, key, value)
        session.commit()
        return jsonify(item.to_dict())

# DELETE item
@item_bp.route('/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    with Session(engine) as session:
        item = session.get(Item, item_id)
        if not item:
            return jsonify({"error": "Item not found"}), 404
        session.delete(item)
        session.commit()
        return jsonify({"message": "Item deleted"})
