from flask import request, jsonify
from models.matricula import MatriculaModel

def create_matricula():
    data = request.get_json()
    if not data or not data.get('aluno_id') or not data.get('curso_id'):
        return jsonify({"message": "Dados incompletos. Aluno e Curso são obrigatórios."}), 400

    aluno_id = data.get('aluno_id')
    curso_id = data.get('curso_id')

    try:
        # Validar duplicidade
        if MatriculaModel.is_aluno_matriculado(aluno_id, curso_id):
            return jsonify({"message": "Este aluno já está matriculado neste curso."}), 400

        matricula_id = MatriculaModel.create_matricula(aluno_id, curso_id)
        return jsonify({"message": "Inscrição confirmada com sucesso!", "id": matricula_id}), 201
    except Exception as e:
        return jsonify({"message": f"Erro interno ao realizar matrícula: {str(e)}"}), 500
