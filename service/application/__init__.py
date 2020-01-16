from flask import Flask
from flask_restful import Api
from .todo_list_resource import TodoListResource
from .todo_resource import TodoResource


def create_app():
    app = Flask(__name__)
    app.config.from_object('application.settings')

    api = Api(app)
    api.add_resource(TodoListResource, '/todos')
    api.add_resource(TodoResource, '/todos/<int:todo_id>')

    from . import model
    with app.app_context():
        model.initialize()

    return app
