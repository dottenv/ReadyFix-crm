import jwt
import datetime
from functools import wraps
from flask import request, g, current_app
from app import db
from app.models import User

JWT_SECRET_KEY = 'readyfix-secret-key-change-in-production'
JWT_ALGORITHM = 'HS256'


def create_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=7),
        'iat': datetime.datetime.now(datetime.timezone.utc),
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return {'message': 'Требуется авторизация'}, 401
        token = auth_header.split(' ', 1)[1]
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            user = db.session.get(User, payload['user_id'])
            if not user or not user.is_active:
                return {'message': 'Пользователь не найден или заблокирован'}, 401
            g.current_user = user
        except jwt.ExpiredSignatureError:
            return {'message': 'Токен истёк'}, 401
        except jwt.InvalidTokenError:
            return {'message': 'Неверный токен'}, 401
        return f(*args, **kwargs)
    return decorated


def role_required(*roles):
    def decorator(f):
        @wraps(f)
        @login_required
        def decorated(*args, **kwargs):
            if g.current_user.role not in roles:
                return {'message': 'Недостаточно прав'}, 403
            return f(*args, **kwargs)
        return decorated
    return decorator
