'use strict';
import React from 'react';
import AddTodo from './AddTodo';
import SortingPicker from './SortingPicker';
import TodoList from './TodoList';

export default function App() {
  return (<React.Fragment>
    <AddTodo />
    <SortingPicker />
    <TodoList />
  </React.Fragment>);
}
