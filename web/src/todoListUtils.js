'use strict';

export function addToList(todos, todo) {
  return [...todos, todo];
}

export function removeFromList(todos, todo) {
  const index = getTodoIndex(todos, todo);
  return index === -1 ?
    todos :
    [...todos.slice(0, index), ...todos.slice(index + 1)];
}

export function updateSingleInList(todos, todo) {
  const index = getTodoIndex(todos, todo);
  return index === -1 ?
    todos :
    [...todos.slice(0, index), todo, ...todos.slice(index + 1)];
}

function getTodoIndex(todos, todo) {
  for (let i = 0; i < todos.length; ++i) {
    if (todos[i].id == todo.id) {
      return i;
    }
  }

  return -1;
}
