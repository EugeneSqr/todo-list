from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from .priority import Priority

db = SQLAlchemy()


class TodoModel(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), unique=False, nullable=True)
    priority = db.Column(db.Enum(Priority), default=Priority.medium)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    marked_done = db.Column(db.Boolean, default=False)


def initialize():
    from flask import current_app
    db.init_app(current_app)
    db.create_all()
