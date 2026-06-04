from flask import jsonify
from models.aluno import AlunoModel

def get_alunos():
    try:
        alunos = AlunoModel.get_all_alunos()
        return jsonify(alunos), 200
    except Exception as e:
        return jsonify({"message": f"Erro interno ao listar alunos: {str(e)}"}), 500
