from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TodoModel(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), unique=False, nullable=True)

def initialize():
    from flask import current_app
    from sqlalchemy_utils import database_exists, create_database
    from .settings import SQLALCHEMY_DATABASE_URI 
    db.init_app(current_app)
    if not database_exists(SQLALCHEMY_DATABASE_URI):
        create_database(SQLALCHEMY_DATABASE_URI)
        db.create_all()
