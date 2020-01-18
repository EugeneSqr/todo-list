'use strict';
import React, {useState, useEffect} from 'react';
import AddTodo from './AddTodo';
import SortingPicker from './SortingPicker';
import TodoList from './TodoList';
import sort from './todoListSorter';
import {
  getTodos,
} from './todoProvider';
import {
  addToList,
  removeFromList,
  updateSingleInList,
} from './todoListUtils';

export default function App() {
  const [sorting, setSorting] = useState('id');
  const [todos, setTodos] = useState();
  useEffect(function() {
    if (todos) {
      return;
    }

    getTodos().then((todoList) => setTodos(todoList));
  });

  return (<React.Fragment>
    <AddTodo onTodoAdd={onTodoAdd} />
    <SortingPicker
      currentSorting={sorting}
      onSortingChange={onSortingChange} />
    <TodoList
      todos={sort(todos, [sorting])}
      onTodoRemove={onTodoRemove}
      onTodoUpdate={onTodoUpdate} />
  </React.Fragment>);

  function onTodoAdd(todo) {
    setTodos(addToList(todos, todo));
  }

  function onTodoRemove(todo) {
    setTodos(removeFromList(todos, todo));
  }

  function onTodoUpdate(todo) {
    setTodos(updateSingleInList(todos, todo));
  }

  function onSortingChange(newSorting) {
    setSorting(newSorting);
  }
}
