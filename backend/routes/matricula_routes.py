from flask import Blueprint
from controllers.matricula_controller import create_matricula

matricula_bp = Blueprint('matricula_bp', __name__)
matricula_bp.route('/', methods=['POST'])(create_matricula)
