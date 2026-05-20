from flask import request, jsonify
from models.curso import CursoModel

def create_curso():
    data = request.get_json()
    if not data or not data.get('nome') or not data.get('duracao') or not data.get('nivel'):
        return jsonify({"message": "Dados incompletos. Nome, duração e nível são obrigatórios."}), 400

    nome = data.get('nome')
    descricao = data.get('descricao', '')
    duracao = data.get('duracao')
    nivel = data.get('nivel')
    imagem = data.get('imagem', '')
    professor_id = data.get('professor_id') # Can be null if created by admin or general

    try:
        curso_id = CursoModel.create_curso(nome, descricao, duracao, nivel, imagem, professor_id)
        return jsonify({"message": "Curso criado com sucesso", "id": curso_id}), 201
    except Exception as e:
        return jsonify({"message": f"Erro interno ao criar curso: {str(e)}"}), 500

def get_cursos():
    try:
        cursos = CursoModel.get_all_cursos()
        return jsonify(cursos), 200
    except Exception as e:
        return jsonify({"message": f"Erro interno ao listar cursos: {str(e)}"}), 500
