import datetime
import jwt
from flask import Blueprint, request, jsonify, g
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash, check_password_hash
from backend.decorators.auth import token_required
from db.index import engine
from db.models.user import User

user_bp = Blueprint("user", __name__, url_prefix="/users")
SECRET_KEY = "David is GOATED"

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
        "exp": datetime.datetime.unow(datetime.UTC) + datetime.timedelta(hours=1)  # expires in 1 hour
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

