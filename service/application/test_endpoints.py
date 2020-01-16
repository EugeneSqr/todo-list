from os import getenv
from datetime import datetime
import json
import requests

port = getenv('FLASK_RUN_PORT')
host = getenv('FLASK_RUN_HOST')
headers = {'Content-Type': 'application/json'}
todos_url = f'http://{host}:{port}/todos'


def test_add_todo():
    code, body = insert_todo({'name': 'todo 1', 'priority': 'Low'})
    assert code == 201
    assert body['id'] is not None


def test_add_todo_ignores_explicitly_set_ids():
    explicit_id = 412342
    code, body = insert_todo({'id': explicit_id, 'name': 'todo 1'})
    assert code == 201
    assert body['id'] != explicit_id
    # sending request with same id is valid (since client ids are skipped)
    code, body = insert_todo({'id': explicit_id, 'name': 'todo 1'})
    assert code == 201
    assert body['id'] != explicit_id


def test_add_todo_accepts_empty_name():
    code, body = insert_todo({})
    assert code == 201
    assert body['name'] is None


def test_add_todo_defaults_empty_priority_to_medium():
    code, body = insert_todo({'name': 'empty priority'})
    assert code == 201
    assert body['priority'] == 'Medium'


def test_add_todo_defaults_empty_marked_done_to_false():
    code, body = insert_todo({})
    assert code == 201
    assert body['marked_done'] is False


def test_add_todo_ignores_explicitly_set_date_created():
    explicit_datetime = datetime(2017, 3, 5, 12, 30, 10)
    code, body = insert_todo({'date_created': explicit_datetime})
    assert code == 201
    assert body['date_created'][:4] != '2017'


def test_update_todo_correctly_updates_todo():
    code, body = insert_todo({'name': 'old_name', 'priority': 'Low'})
    old_id = body['id']
    explicit_id = 1234
    explicit_datetime = datetime(2017, 3, 5, 12, 30, 10)
    updated_todo = {
        'id': 1234,
        'name': 'new_name',
        'priority': 'High',
        'marked_done': True,
        'date_created': explicit_datetime
    }
    code, body = update_todo(old_id, updated_todo)
    assert code == 204
    updated_todo = next(x for x in get_all_todos()[1] if x['id'] == old_id)
    assert updated_todo['id'] != explicit_id
    assert updated_todo['name'] == 'new_name'
    assert updated_todo['priority'] == 'High'
    assert updated_todo['marked_done'] is True
    assert updated_todo['date_created'][:4] != '2017'


def test_update_todo_returns_not_found_when_item_does_not_exist():
    code, body = update_todo(1423412343, {'name': 'new name'})
    assert code == 404


def test_update_todo_returns_not_found_when_id_is_not_an_int():
    code, body = update_todo(None, {'name': 'test'})
    assert code == 404


def test_update_todo_returns_bad_request_if_no_data_provided():
    code, body = update_todo(123123, {})
    assert code == 400


def test_delete_todo():
    code, body = insert_todo({'name': 'old_name', 'priority': 'Low'})
    old_id = body['id']
    code, body = delete_todo(old_id)
    assert code == 204
    assert old_id not in map(lambda x: x['id'], get_all_todos()[1])


def test_delete_todo_returns_not_found():
    code, body = delete_todo(88888)
    assert code == 404


def test_delete_todo_returns_not_found_when_id_is_not_correct():
    code, body = delete_todo('asdf')
    assert code == 404


def test_get_todo_list_returns_list_of_items():
    code, body = get_all_todos()
    assert code == 200
    assert isinstance(body, list)


def datetime_converter(o):
    if isinstance(o, datetime):
        return o.__str__()


def get_all_todos():
    response = requests.get(todos_url)
    return get_data_from_response(response)


def insert_todo(data):
    response = requests.post(
        todos_url,
        data=json.dumps(data, default=datetime_converter),
        headers=headers)
    return get_data_from_response(response)


def update_todo(todo_id, data):
    response = requests.put(
        get_todo_by_id_url(todo_id),
        data=json.dumps(data, default=datetime_converter),
        headers=headers)
    return get_data_from_response(response)


def delete_todo(todo_id):
    response = requests.delete(
        get_todo_by_id_url(todo_id),
        headers=headers)
    return get_data_from_response(response)


def get_todo_by_id_url(todo_id):
    return f'{todos_url}/{todo_id}'


def get_data_from_response(response):
    try:
        body = response.json()
    except json.decoder.JSONDecodeError:
        body = ''

    return response.status_code, body
