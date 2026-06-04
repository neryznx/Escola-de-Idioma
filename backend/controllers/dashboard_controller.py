from flask import jsonify
from config import get_db_connection

def get_stats():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Contagem total de professores
            cursor.execute("SELECT COUNT(*) as count FROM professores")
            total_professores = cursor.fetchone()['count']
            
            # Contagem total de alunos
            cursor.execute("SELECT COUNT(*) as count FROM alunos")
            total_alunos = cursor.fetchone()['count']
            
            # Contagem total de cursos
            cursor.execute("SELECT COUNT(*) as count FROM cursos")
            total_cursos = cursor.fetchone()['count']
            
            return jsonify({
                "total_professores": total_professores,
                "total_alunos": total_alunos,
                "total_cursos": total_cursos
            }), 200
    except Exception as e:
        return jsonify({"message": f"Erro interno ao carregar estatísticas: {str(e)}"}), 500
    finally:
        connection.close()
