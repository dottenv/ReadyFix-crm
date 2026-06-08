from flask_restx import Namespace, Resource, fields
from werkzeug.security import generate_password_hash, check_password_hash
from flask import g
from app import db
from app.models import User
from app.utils.auth import create_token, login_required

api = Namespace('auth', description='Аутентификация')

register_model = api.model('Register', {
    'email': fields.String(required=True, description='Email'),
    'password': fields.String(required=True, description='Пароль'),
    'name': fields.String(required=True, description='Имя'),
    'phone': fields.String(description='Телефон'),
    'role': fields.String(description='Роль', default='master'),
})

login_model = api.model('Login', {
    'email': fields.String(required=True, description='Email'),
    'password': fields.String(required=True, description='Пароль'),
})


@api.route('/register')
class Register(Resource):
    @api.doc('register_user')
    @api.expect(register_model)
    def post(self):
        data = api.payload
        email = data['email'].strip().lower()

        if User.query.filter_by(email=email).first():
            return {'message': 'Email уже зарегистрирован'}, 409

        role = data.get('role', 'master')
        if role not in User.ROLES:
            return {'message': f'Недопустимая роль. Доступно: {", ".join(User.ROLES)}'}, 400

        user = User(
            email=email,
            password_hash=generate_password_hash(data['password']),
            name=data['name'],
            phone=data.get('phone', ''),
            role=role,
        )
        db.session.add(user)
        db.session.commit()

        token = create_token(user.id)
        return {'token': token, 'user': user.to_dict()}, 201


@api.route('/login')
class Login(Resource):
    @api.doc('login_user')
    @api.expect(login_model)
    def post(self):
        data = api.payload
        email = data['email'].strip().lower()
        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password_hash, data['password']):
            return {'message': 'Неверный email или пароль'}, 401

        if not user.is_active:
            return {'message': 'Пользователь заблокирован'}, 403

        token = create_token(user.id)
        return {'token': token, 'user': user.to_dict()}


@api.route('/me')
class Me(Resource):
    @api.doc('get_current_user')
    @login_required
    def get(self):
        return {'user': g.current_user.to_dict()}


@api.route('/users')
class UserList(Resource):
    @api.doc('list_users')
    @login_required
    def get(self):
        if g.current_user.role not in ('director', 'admin'):
            return {'message': 'Недостаточно прав'}, 403
        return {
            'users': [u.to_dict() for u in User.query.order_by(User.created_at.desc()).all()]
        }
