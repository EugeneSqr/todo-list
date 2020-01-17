'use strict';
import React, {useState, useEffect, useCallback} from 'react';
import AddTodo from './AddTodo';
import SortingPicker from './SortingPicker';
import TodoList from './TodoList';
import {
  getTodos,
} from './todoProvider';

export default function App() {
  const todos = useTodos();

  return (<React.Fragment>
    <AddTodo
      onTodoAdd={useCallback(onTodoAdd, [])} />
    <SortingPicker
      currentSorting={'id'}
      onSortingChange={useCallback(onSortingChange, [])} />
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

  function onTodoAdd(todo) {
    console.log('todo added', todo);
  }

  function onTodoRemove(id) {
    console.log('todo removed', id);
  }

  function onTodoUpdate(id, todo) {
    console.log('todo updated', id, todo);
  }

  function onSortingChange(newSorting) {
    console.log('sorting changed', newSorting);
  }
}
