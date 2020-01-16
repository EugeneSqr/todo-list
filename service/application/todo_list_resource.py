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
        if not json_data:
            return {"message": "No input data provided"}, 400
        try:
            data = todo_schema.load(json_data)
        except ValidationError as err:
            return err.messages, 400

        db.session.add(TodoModel(**data))
        db.session.commit()
