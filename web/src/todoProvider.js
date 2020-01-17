'use strict';
import fetch from 'cross-fetch';
import {
  getServiceUrl,
} from './settings';

export function getTodos() {
  return fetch(getTodoListUrl()).then(function(response) {
    if (response.status != 200) {
      return [];
    }

    return response.json();
  }).catch(function(error) {
    console.log(error);
    return [];
  });
}

export function addTodo() {
}

export function updateTodo() {
}

export function removeTodo() {
}

function getTodoListUrl() {
  return `${getServiceUrl()}/todos`;
}
