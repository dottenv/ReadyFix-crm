from flask_restx import Namespace, Resource, fields
from flask import g
from app import db
from app.models import Order
from app.utils.auth import login_required, role_required

api = Namespace('orders', description='Заявки на ремонт')

order_model = api.model('Order', {
    'name': fields.String(required=True, description='Имя'),
    'phone': fields.String(required=True, description='Телефон'),
    'device': fields.String(required=True, description='Устройство'),
    'problem': fields.String(description='Описание проблемы'),
})

order_update_model = api.model('OrderUpdate', {
    'status': fields.String(description='Статус'),
    'assigned_to': fields.Integer(description='ID исполнителя'),
})


@api.route('/')
class OrderList(Resource):
    @api.doc('list_orders')
    @login_required
    def get(self):
        user = g.current_user
        query = Order.query.order_by(Order.created_at.desc())

        if user.role == 'master':
            query = query.filter_by(assigned_to=user.id)
        elif user.role == 'courier':
            query = query.filter(Order.assigned_to == user.id)

        return [o.to_dict() for o in query.all()]

    @api.doc('create_order')
    @api.expect(order_model)
    def post(self):
        data = api.payload
        order = Order(
            name=data['name'],
            phone=data['phone'],
            device=data['device'],
            problem=data.get('problem', ''),
        )
        db.session.add(order)
        db.session.commit()
        return order.to_dict(), 201


@api.route('/<int:order_id>')
class OrderDetail(Resource):
    @api.doc('update_order')
    @api.expect(order_update_model)
    @login_required
    def patch(self, order_id):
        order = db.session.get(Order, order_id)
        if not order:
            return {'message': 'Заявка не найдена'}, 404

        user = g.current_user
        data = api.payload

        if 'status' in data:
            if data['status'] not in Order.STATUSES:
                return {'message': f'Недопустимый статус. Доступно: {", ".join(Order.STATUSES)}'}, 400
            order.status = data['status']

        if 'assigned_to' in data:
            if user.role not in ('director', 'admin'):
                return {'message': 'Недостаточно прав'}, 403
            order.assigned_to = data['assigned_to']

        db.session.commit()
        return order.to_dict()

    @api.doc('get_order')
    @login_required
    def get(self, order_id):
        order = db.session.get(Order, order_id)
        if not order:
            return {'message': 'Заявка не найдена'}, 404
        return order.to_dict()

    @api.doc('delete_order')
    @login_required
    def delete(self, order_id):
        if g.current_user.role not in ('director', 'admin'):
            return {'message': 'Недостаточно прав'}, 403
        order = db.session.get(Order, order_id)
        if not order:
            return {'message': 'Заявка не найдена'}, 404
        db.session.delete(order)
        db.session.commit()
        return {'message': 'Заявка удалена'}
