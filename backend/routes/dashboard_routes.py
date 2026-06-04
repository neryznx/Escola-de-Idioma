from flask import Blueprint
from controllers.dashboard_controller import get_stats

dashboard_bp = Blueprint('dashboard_bp', __name__)
dashboard_bp.route('/stats', methods=['GET'])(get_stats)
