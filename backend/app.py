from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp

app = Flask(__name__)
CORS(app) # Allow cross-origin requests from frontend

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')

@app.route('/api/health')
def health_check():
    return {"status": "up"}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
