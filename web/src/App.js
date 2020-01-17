'use strict';
import React, {useState, useEffect} from 'react';
import AddTodo from './AddTodo';
import SortingPicker from './SortingPicker';
import TodoList from './TodoList';
import {
  getTodos,
} from './todoProvider';

export default function App() {
  const todos = useTodos();

  return (<React.Fragment>
    <AddTodo />
    <SortingPicker />
    <TodoList
      todos={todos}
      onTodoRemove={onTodoRemove}
      onTodoUpdate={onTodoUpdate} />
  </React.Fragment>);

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

  function onTodoRemove(id) {
    console.log('todo removed', id);
  }

  function onTodoUpdate(id, data) {
    console.log('todo updated', id, data);
  }
}
