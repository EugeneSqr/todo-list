from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from .model import TodoModel, db
from .schema import todo_schema


class TodoResource(Resource):
    def put(self, todo_id):
        json_data = request.get_json()
        if not json_data:
            return {"message": "No input data provided"}, 400
        try:
            data = todo_schema.load(json_data)
        except ValidationError as err:
            return err.messages, 400

        todo_item = TodoModel.query.get_or_404(todo_id)
        todo_item.name = data['name']
        todo_item.priority = data['priority']
        todo_item.marked_done = data['marked_done']
        db.session.commit()
        return '', 204

    def delete(self, todo_id):
        todo_item = TodoModel.query.get_or_404(todo_id)
        db.session.delete(todo_item)
        db.session.commit()
        return '', 204
