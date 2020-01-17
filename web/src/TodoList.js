'use strict';
import React from 'react';
import Todo from './Todo';

export default React.memo(function TodoList({todos}) {
  if (!todos || !todos.length) {
    return null;
  }

  return todos.map((todo) => (
    <Todo key={todo.id} todo={todo} />
  ));
});
