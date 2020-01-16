'use strict';
import React from 'react';

export default function AddTodo() {
  return (
    <div className="input-group mb-3 todo-adder">
      <input type="text" className="form-control"
        placeholder="What are you going to do?" />
      <div className="input-group-append">
        <button className="btn btn-primary" type="button">Write it down</button>
      </div>
    </div>);
}
