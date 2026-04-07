from flask import Flask
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.professor_routes import professor_bp

app = Flask(__name__)
CORS(app) # Allow cross-origin requests from frontend

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(professor_bp, url_prefix='/api/professores')

@app.route('/api/health')
def health_check():
    return {"status": "up"}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
