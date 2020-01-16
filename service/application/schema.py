from marshmallow import Schema, fields, EXCLUDE
from marshmallow_enum import EnumField
from .priority import Priority


class TodoSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    priority = EnumField(Priority, by_value=True)
    date_created = fields.DateTime(dump_only=True)
    marked_done = fields.Bool()


todo_schema = TodoSchema(unknown=EXCLUDE)
todo_list_schema = TodoSchema(many=True)
