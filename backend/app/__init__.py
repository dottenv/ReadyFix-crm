from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restx import Api

db = SQLAlchemy()
migrate = Migrate()
api = Api(doc='/api/docs')


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    api.init_app(app)

    from app.routes.auth import api as auth_ns
    api.add_namespace(auth_ns, path='/api/auth')

    from app.routes.orders import api as orders_ns
    api.add_namespace(orders_ns, path='/api/orders')

    from app.routes.contacts import api as contacts_ns
    api.add_namespace(contacts_ns, path='/api/contacts')

    with app.app_context():
        db.create_all()

    return app
