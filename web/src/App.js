'use strict';
import React, {useState, useEffect} from 'react';
import AddTodo from './AddTodo';
import SortingPicker from './SortingPicker';
import TodoList from './TodoList';
import {
  getTodos,
} from './todoProvider';

export default React.memo(function App() {
  const todos = useTodos();

  function useTodos() {
    const [todos, setTodos] = useState();
    useEffect(function() {
      if (todos) {
        return;
      }

      getTodos().then((todoList) => setTodos(todoList));
    });

    return todos;
  }

  return (<React.Fragment>
    <AddTodo />
    <SortingPicker />
    <TodoList todos={todos} />
  </React.Fragment>);
});
