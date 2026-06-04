from config import get_db_connection

class MatriculaModel:
    @staticmethod
    def create_matricula(aluno_id, curso_id):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "INSERT INTO matriculas (aluno_id, curso_id) VALUES (%s, %s)"
                cursor.execute(sql, (aluno_id, curso_id))
            connection.commit()
            return cursor.lastrowid
        finally:
            connection.close()

    @staticmethod
    def is_aluno_matriculado(aluno_id, curso_id):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT 1 FROM matriculas WHERE aluno_id = %s AND curso_id = %s"
                cursor.execute(sql, (aluno_id, curso_id))
                return cursor.fetchone() is not None
        finally:
            connection.close()
