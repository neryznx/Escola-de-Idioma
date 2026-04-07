from flask import Blueprint
from controllers.professor_controller import create_professor, get_professors

professor_bp = Blueprint('professor_bp', __name__)

professor_bp.route('/', methods=['POST'])(create_professor)
professor_bp.route('/', methods=['GET'])(get_professors)
