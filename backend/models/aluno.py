from config import get_db_connection

class AlunoModel:
    @staticmethod
    def create_aluno(nome, email, senha_hash):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "INSERT INTO alunos (nome, email, senha) VALUES (%s, %s, %s)"
                cursor.execute(sql, (nome, email, senha_hash))
            connection.commit()
            return cursor.lastrowid
        finally:
            connection.close()

    @staticmethod
    def get_aluno_by_email(email):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT * FROM alunos WHERE email = %s"
                cursor.execute(sql, (email,))
                result = cursor.fetchone()
                return result
        finally:
            connection.close()
