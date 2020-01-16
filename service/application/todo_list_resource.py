from flask import request
from flask_restful import Resource
from marshmallow import ValidationError
from .model import TodoModel, db
from .schema import todo_list_schema, todo_schema


class TodoListResource(Resource):
    def get(self):
        return todo_list_schema.dump(TodoModel.query.all())

    def post(self):
        json_data = request.get_json()
        if json_data:
            try:
                data = todo_schema.load(json_data)
            except ValidationError as err:
                return err.messages, 400
        else:
            data = {}

        todo_item = TodoModel(**data)
        db.session.add(todo_item)
        db.session.commit()
        return todo_schema.dump(todo_item), 201
