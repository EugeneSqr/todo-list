'use strict';
import React from 'react';
import Todo from './Todo';

export default function TodoList({todos, onTodoRemove, onTodoUpdate}) {
  if (!todos || !todos.length) {
    return null;
  }

  return todos.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      onTodoRemove={onTodoRemove}
      onTodoUpdate={onTodoUpdate} />
  ));
}
