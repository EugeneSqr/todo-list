'use strict';
import React, {useState} from 'react';
import {
  addTodo,
} from './todoProvider';

export default React.memo(function AddTodo({onTodoAdd}) {
  const [name, setName] = useState('');
  return (
    <div className="input-group mb-3 todo-adder">
      <input
        className="form-control"
        placeholder="What are you going to do?"
        value={name}
        onChange={(e) => setName(e.target.value)} />
      <div className="input-group-append">
        <button
          className="btn btn-primary"
          onClick={() => addTodo({name}).then(function(todo) {
            setName('');
            onTodoAdd(todo);
          })}>
          Write it down
        </button>
      </div>
    </div>
  );
});
