from flask import request, jsonify
from models.professor import ProfessorModel

def create_professor():
    data = request.get_json()
    nome = data.get('nome')
    idioma = data.get('idioma')

    if not nome or not idioma:
        return jsonify({"message": "Nome e idioma são obrigatórios"}), 400

    try:
        professor_id = ProfessorModel.create_professor(nome, idioma)
        return jsonify({"message": "Professor criado com sucesso", "id": professor_id}), 201
    except Exception as e:
        return jsonify({"message": "Erro ao criar professor", "error": str(e)}), 500

def get_professors():
    try:
        professores = ProfessorModel.get_all_professores()
        return jsonify(professores), 200
    except Exception as e:
        return jsonify({"message": "Erro ao buscar professores", "error": str(e)}), 500
