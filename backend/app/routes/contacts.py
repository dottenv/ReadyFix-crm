from flask_restx import Namespace, Resource, fields
from flask import g
from app import db
from app.models import ContactRequest
from app.utils.auth import login_required

api = Namespace('contacts', description='Обратная связь')

contact_model = api.model('ContactRequest', {
    'name': fields.String(required=True, description='Имя'),
    'phone': fields.String(required=True, description='Телефон'),
    'message': fields.String(description='Сообщение'),
})

contact_update_model = api.model('ContactUpdate', {
    'status': fields.String(description='Статус'),
    'assigned_to': fields.Integer(description='ID исполнителя'),
})


@api.route('/')
class ContactList(Resource):
    @api.doc('list_contacts')
    @login_required
    def get(self):
        return [c.to_dict() for c in ContactRequest.query.order_by(ContactRequest.created_at.desc()).all()]

    @api.doc('create_contact')
    @api.expect(contact_model)
    def post(self):
        data = api.payload
        req = ContactRequest(
            name=data['name'],
            phone=data['phone'],
            message=data.get('message', ''),
        )
        db.session.add(req)
        db.session.commit()
        return req.to_dict(), 201


@api.route('/<int:contact_id>')
class ContactDetail(Resource):
    @api.doc('update_contact')
    @api.expect(contact_update_model)
    @login_required
    def patch(self, contact_id):
        contact = db.session.get(ContactRequest, contact_id)
        if not contact:
            return {'message': 'Запись не найдена'}, 404

        data = api.payload
        if 'status' in data:
            contact.status = data['status']
        if 'assigned_to' in data:
            contact.assigned_to = data['assigned_to']

        db.session.commit()
        return contact.to_dict()

    @api.doc('delete_contact')
    @login_required
    def delete(self, contact_id):
        if g.current_user.role not in ('director', 'admin'):
            return {'message': 'Недостаточно прав'}, 403
        contact = db.session.get(ContactRequest, contact_id)
        if not contact:
            return {'message': 'Запись не найдена'}, 404
        db.session.delete(contact)
        db.session.commit()
        return {'message': 'Запись удалена'}
