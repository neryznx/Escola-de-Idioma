from flask import Blueprint
from controllers.aluno_controller import get_alunos

aluno_bp = Blueprint('aluno_bp', __name__)
aluno_bp.route('/', methods=['GET'])(get_alunos)
