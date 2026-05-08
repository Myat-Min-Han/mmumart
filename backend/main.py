from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Connects your frontend and backend

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/")
def home():
    return jsonify({"message": "Hello! Your Flask backend is working!"})






