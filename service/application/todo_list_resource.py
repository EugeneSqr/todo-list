from flask_restful import Resource
from .model import TodoModel

class TodoListResource(Resource):
    def get(self):
        return TodoModel.query.all()
    def post(self):
        pass
