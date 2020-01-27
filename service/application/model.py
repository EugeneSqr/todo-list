from datetime import datetime
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from .priority import Priority

db = SQLAlchemy()


class TodoModel(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), unique=False, nullable=True)
    priority = db.Column(db.Enum(Priority), default=Priority.medium)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    marked_done = db.Column(db.Boolean, default=False)

    @validates('name')
    def truncate(self, field, value):
        return self.truncate_to_field_length(field, value)

    def truncate_to_field_length(self, field, value):
        max_len = getattr(self.__class__, field).prop.columns[0].type.length
        if value and len(value) > max_len:
            return value[:max_len]
        else:
            return value


def initialize():
    db.init_app(current_app)
    db.create_all()
