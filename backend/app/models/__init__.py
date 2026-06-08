from app import db
from datetime import datetime, timezone


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), default='')
    role = db.Column(db.String(20), default='master')
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    ROLES = ('director', 'admin', 'master', 'courier')

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'phone': self.phone,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
        }


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    device = db.Column(db.String(100), nullable=False)
    problem = db.Column(db.Text, default='')
    status = db.Column(db.String(20), default='new')
    assigned_to = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    assigned_user = db.relationship('User', backref='orders', foreign_keys=[assigned_to])
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    STATUSES = ('new', 'in_progress', 'done', 'cancelled', 'awaiting_parts')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'device': self.device,
            'problem': self.problem,
            'status': self.status,
            'assigned_to': self.assigned_to,
            'assigned_name': self.assigned_user.name if self.assigned_user else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


class ContactRequest(db.Model):
    __tablename__ = 'contact_requests'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    message = db.Column(db.Text, default='')
    status = db.Column(db.String(20), default='new')
    assigned_to = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    assigned_user = db.relationship('User', backref='contact_requests', foreign_keys=[assigned_to])
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'message': self.message,
            'status': self.status,
            'assigned_to': self.assigned_to,
            'assigned_name': self.assigned_user.name if self.assigned_user else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
