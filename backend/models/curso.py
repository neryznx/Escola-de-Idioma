from config import get_db_connection

class CursoModel:
    @staticmethod
    def create_curso(nome, descricao, duracao, nivel, imagem, professor_id):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = """
                    INSERT INTO cursos (nome, descricao, duracao, nivel, imagem, professor_id) 
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (nome, descricao, duracao, nivel, imagem, professor_id))
            connection.commit()
            return cursor.lastrowid
        finally:
            connection.close()

    @staticmethod
    def get_all_cursos():
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = """
                    SELECT c.id, c.nome, c.descricao, c.duracao, c.nivel, c.imagem, c.professor_id, p.nome AS professor_nome 
                    FROM cursos c 
                    LEFT JOIN professores p ON c.professor_id = p.id
                """
                cursor.execute(sql)
                result = cursor.fetchall()
                if not result:
                    return []
                return result
        finally:
            connection.close()
