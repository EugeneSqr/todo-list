from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from .todo_list_resource import TodoListResource
from .todo_resource import TodoResource
from . import model


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object('application.settings')

    api = Api(app)
    api.add_resource(TodoListResource, '/todos')
    api.add_resource(TodoResource, '/todos/<int:todo_id>')

    with app.app_context():
        model.initialize()

    return app
