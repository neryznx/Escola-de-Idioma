from flask import Blueprint
from controllers.auth_controller import register, login, register_teacher, login_teacher

auth_bp = Blueprint('auth_bp', __name__)

auth_bp.route('/register', methods=['POST'])(register)
auth_bp.route('/login', methods=['POST'])(login)
auth_bp.route('/register-teacher', methods=['POST'])(register_teacher)
auth_bp.route('/login-teacher', methods=['POST'])(login_teacher)

