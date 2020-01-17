'use strict';
import React from 'react';
import {useInput} from './customHooks';

export default React.memo(function AddTodo({onTodoAdd}) {
  const name = useInput('');
  return (
    <div className="input-group mb-3 todo-adder">
      <input
        className="form-control"
        placeholder="What are you going to do?"
        {...name} />
      <div className="input-group-append">
        <button
          className="btn btn-primary"
          onClick={handleAdd}>Write it down</button>
      </div>
    </div>
  );

  function handleAdd(e) {
    onTodoAdd({
      name: name.value,
    });
  }
});
