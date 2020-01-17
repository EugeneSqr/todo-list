'use strict';
import fetch from 'cross-fetch';
import {
  getServiceUrl,
} from './settings';

export function getTodos() {
  return fetch(getTodoListUrl()).then(function(response) {
    if (response.status !== 200) {
      return [];
    }

    return response.json();
  }).catch(function(error) {
    console.log(error);
    return [];
  });
}

export function addTodo(todo) {
  return fetch(getTodoListUrl(), {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: getHeaders(),
  }).then(function(response) {
    if (response.status !== 201) {
      throw new Error('unable to add todo');
    }

    return response.json();
  }).catch((error) => console.log(error));
}

export function updateTodo(todo) {
  return fetch(getTodoUrl(todo.id), {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: getHeaders(),
  }).then(function(response) {
    if (response.status !== 204) {
      throw new Error('failed to update the todo');
    }
  });
}

export function removeTodo() {
}

function getTodoListUrl() {
  return `${getServiceUrl()}/todos`;
}

function getTodoUrl(id) {
  return `${getServiceUrl()}/todos/${id}`;
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}
