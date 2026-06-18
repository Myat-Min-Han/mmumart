import datetime
import jwt
from flask import Blueprint, request, jsonify, g
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash, check_password_hash
from decorators.auth import token_required
from db.index import engine
from db.models.user import User
from config import SECRET_KEY

user_bp = Blueprint("user", __name__, url_prefix="/users")

@user_bp.route("/signup", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    hashed_pw = generate_password_hash(password)

    with Session(engine) as session:
        if session.query(User).filter_by(email=email).first():
            return jsonify({"error": "Email already registered"}), 400

        new_user = User(name=name, email=email, password=hashed_pw)
        session.add(new_user)
        session.commit()

    return jsonify({"message": "Account created successfully!"}), 201


@user_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    with Session(engine) as session:
        user = session.query(User).filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid email or password"}), 401

    payload = {
        "user_id": user.id,
        "email": user.email,
        "exp": datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=1)  # expires in 1 hour
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return jsonify({"message": "Login successful!", "token": token}), 200

@user_bp.route("/profile", methods=["GET"])
@token_required
def profile():
    user_id = g.current_user.get('user_id')
    with Session(engine) as session:
        user = session.query(User).filter_by(id=user_id).first()
        if not user: 
            return jsonify({ "error": "User not found"}), 404
        
        return jsonify({
            "id": user.id,
            "email": user.email,
            "name": user.name
        }), 200

@user_bp.route("/delete", methods=["DELETE"])
@token_required
def delete_user():
    user_id = g.current_user.get('user_id')
    with Session(engine) as session:
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404
        session.delete(user)
        session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

@user_bp.route("/update", methods=["PUT"])
@token_required
def update_user():
    user_id = g.current_user.get("user_id")
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    with Session(engine) as session:
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        if name:
            user.name = name
        if email:
            # prevent duplicate email
            if session.query(User).filter(User.email == email, User.id != user_id).first():
                return jsonify({"error": "Email already in use"}), 400
            user.email = email
        if password:
            user.password = generate_password_hash(password)

        session.commit()
        return jsonify({"message": "User updated successfully"}), 200
