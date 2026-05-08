from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash, check_password_hash
from db.index import engine
from db.models.user import User

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

    return jsonify({"message": "Login successful!"}), 200
