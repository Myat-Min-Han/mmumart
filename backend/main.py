from flask import Flask, jsonify, request
from flask_cors import CORS
from db.models import User
from db.index import db

app = Flask(__name__)
CORS(app) # Connects your frontend and backend

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/register", methods=["POST"])
def create_user():

    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing fields"}), 400
    
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"error": "Email already registered"}), 409
    
    try:
        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            "message": "User created successfully!",
            "user": {"username": username, "email": email}
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)})


