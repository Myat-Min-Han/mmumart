from flask import Flask
from flask_cors import CORS
from routes.user import user_bp
from routes.item import item_bp
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(user_bp)
app.register_blueprint(item_bp)
if __name__ == "__main__":
    app.run(debug=True, port=5002)


