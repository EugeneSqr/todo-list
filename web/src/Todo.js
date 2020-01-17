'use strict';
import React, {useState} from 'react';
import classNames from 'classnames';
import {
  updateTodo,
} from './todoProvider';

const inputGroupText = 'input-group-text';
const priorityIcons = {
  'Low': 'icon-upload',
  'Medium': 'icon-ok-circle',
  'High': 'icon-download',
};

export default function Todo({todo, onTodoRemove, onTodoUpdate}) {
  const [done, setDone] = useState(todo.marked_done);
  const [name, setName] = useState(todo.name || '');
  const [priority, setPriority] = useState(todo.priority);

  return (<div className={getProgressClass()}>
    <div className='input-group-prepend'>
      <div className={inputGroupText}>
        <input
          type='checkbox'
          checked={done}
          onChange={doneChanged}/>
      </div>
      <span className={inputGroupText}>{todo.id}</span>
    </div>
    <input
      className='form-control'
      disabled={getDisabled()}
      onBlur={handleBlur}
      value={name}
      onChange={(e) => setName(e.target.value)} />
    <div className='input-group-append'>
      {
        Object.keys(priorityIcons).map(function(label, i) {
          return (<button
            key={i}
            data-priority={label}
            className={getPriorityClass(label)}
            disabled={getDisabled()}
            value={priority}
            onClick={changePriority}>
            <i className={priorityIcons[label]}></i>
          </button>);
        })
      }
      <span className={inputGroupText}>{getFormattedDate()}</span>
      <button className='btn btn-secondary btn-sm' onClick={handleRemove}>
        <i className='icon-remove'></i>
      </button>
    </div>
  </div>);

  function doneChanged(e) {
    setDone(e.target.checked);
    handleUpdate(Object.assign({}, todo, {marked_done: e.target.checked}));
  }

  function changePriority(e) {
    const newPriority = e.currentTarget.getAttribute('data-priority');
    if (priority !== newPriority) {
      setPriority(newPriority);
      handleUpdate(Object.assign({}, todo, {priority: newPriority}));
    }
  }

  function getPriorityClass(buttonPriority) {
    return classNames('btn btn-sm', {
      'btn-outline-primary': priority === buttonPriority,
      'btn-outline-secondary': priority !== buttonPriority,
    });
  }

  function getProgressClass() {
    return classNames('input-group mb-2', {
      'done': done,
      'inprogress': !done,
    });
  }

  function getDisabled() {
    return done ? 'disabled' : '';
  }

  function getFormattedDate() {
    return new Date(todo.date_created).toLocaleDateString();
  }

  function handleBlur() {
    if (name !== (todo.name || '')) {
      handleUpdate(Object.assign({}, todo, {name}));
    }
  }

  function handleUpdate(newTodo) {
    updateTodo(newTodo)
      .then(() => onTodoUpdate(newTodo.id, newTodo))
      .catch(() => rollbackUpdate());
  }

  function rollbackUpdate() {
    setName(todo.name || '');
    setDone(todo.done);
    setPriority(todo.priority);
  }

  function handleRemove() {
    onTodoRemove(todo.id);
  }
}
