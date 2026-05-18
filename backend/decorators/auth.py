from functools import wraps
from flask import g, jsonify, request
import jwt
from routes.user import SECRET_KEY

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({"error": "Missing token"}), 401

        try:
            token = auth_header.split(" ")[1]  # Expect "Bearer <token>"
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            g.current_user = decoded  # store decoded payload
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401

        return f(*args, **kwargs)
    return decorated