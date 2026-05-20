from flask import Blueprint
from controllers.curso_controller import create_curso, get_cursos

curso_bp = Blueprint('curso_bp', __name__)

curso_bp.route('/', methods=['POST'])(create_curso)
curso_bp.route('/', methods=['GET'])(get_cursos)
