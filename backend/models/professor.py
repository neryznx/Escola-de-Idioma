from config import get_db_connection

class ProfessorModel:
    @staticmethod
    def create_professor(nome, email, senha_hash, idioma):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "INSERT INTO professores (nome, email, senha, idioma) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (nome, email, senha_hash, idioma))
            connection.commit()
            return cursor.lastrowid
        finally:
            connection.close()

    @staticmethod
    def get_professor_by_email(email):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT * FROM professores WHERE email = %s"
                cursor.execute(sql, (email,))
                result = cursor.fetchone()
                return result
        finally:
            connection.close()

    @staticmethod
    def get_all_professores():
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT id, nome, email, idioma FROM professores"
                cursor.execute(sql)
                result = cursor.fetchall()
                if not result:
                    return []
                return result
        finally:
            connection.close()
