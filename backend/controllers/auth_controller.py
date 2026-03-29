import bcrypt
from flask import request, jsonify
from models.aluno import AlunoModel

def register():
    data = request.get_json()
    if not data or not data.get('nome') or not data.get('email') or not data.get('senha'):
        return jsonify({"message": "Dados incompletos"}), 400

    nome = data.get('nome')
    email = data.get('email')
    senha = data.get('senha')

    # check if user exists
    existing_user = AlunoModel.get_aluno_by_email(email)
    if existing_user:
        return jsonify({"message": "E-mail já cadastrado"}), 400

    # hash password
    hashed = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt())

    # save user
    try:
        new_id = AlunoModel.create_aluno(nome, email, hashed.decode('utf-8'))
        return jsonify({"message": "Usuário registrado com sucesso", "id": new_id}), 201
    except Exception as e:
        return jsonify({"message": f"Erro interno: {str(e)}"}), 500

def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('senha'):
        return jsonify({"message": "Dados incompletos"}), 400
    
    email = data.get('email')
    senha = data.get('senha')

    aluno = AlunoModel.get_aluno_by_email(email)
    if not aluno:
        return jsonify({"message": "Credenciais inválidas"}), 401

    if bcrypt.checkpw(senha.encode('utf-8'), aluno['senha'].encode('utf-8')):
        return jsonify({"message": "Login bem-sucedido", "aluno": {"id": aluno['id'], "nome": aluno['nome'], "email": aluno['email']}}), 200
    else:
        return jsonify({"message": "Credenciais inválidas"}), 401
