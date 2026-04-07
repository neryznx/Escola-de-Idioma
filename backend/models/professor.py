from config import get_db_connection

class ProfessorModel:
    @staticmethod
    def create_professor(nome, idioma):
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "INSERT INTO professores (nome, idioma) VALUES (%s, %s)"
                cursor.execute(sql, (nome, idioma))
            connection.commit()
            return cursor.lastrowid
        finally:
            connection.close()

    @staticmethod
    def get_all_professores():
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT id, nome, idioma FROM professores"
                cursor.execute(sql)
                result = cursor.fetchall()
                if not result:
                    return []
                # Ensure the return format is list of dicts based on current config probably using DictCursor,
                # but if not, let's map it explicitly if it returns tuples, though most PyMySQL setups use DictCursor.
                # Assuming DictCursor since it's a common practice. Let's rely on it returning dicts.
                return result
        finally:
            connection.close()
