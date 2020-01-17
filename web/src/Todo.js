'use strict';
import React, {useState} from 'react';
import classNames from 'classnames';
import {useInput} from './customHooks';

const inputGroupText = 'input-group-text';
const priorityIcons = {
  'Low': 'icon-upload',
  'Medium': 'icon-ok-circle',
  'High': 'icon-download',
};

export default function Todo({todo, onTodoRemove, onTodoUpdate}) {
  const done = useDone(todo.marked_done);
  const name = useInput(todo.name);
  const priority = usePriority(todo.priority);

  return (<div className={getProgressClass()}>
    <div className='input-group-prepend'>
      <div className={inputGroupText}>
        <input type='checkbox' {...done} />
      </div>
      <span className={inputGroupText}>{todo.id}</span>
    </div>
    <input
      className='form-control'
      disabled={getDisabled()}
      onBlur={handleBlur}
      {...name} />
    <div className='input-group-append'>
      {
        Object.keys(priorityIcons).map(function(label, i) {
          return (<button
            key={i}
            data-priority={label}
            className={getPriorityClass(label)}
            disabled={getDisabled()}
            {...priority}>
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

  function useDone(initialDone) {
    const [done, setDone] = useState(initialDone);
    function onChange(e) {
      setDone(e.target.checked);
      onTodoUpdate(
        todo.id,
        Object.assign({}, todo, {marked_done: e.target.checked}));
    }

    return {
      checked: done,
      onChange,
    };
  }

  function usePriority(initialPriority) {
    const [priority, setPriority] = useState(initialPriority);
    function onClick(e) {
      const newPriority = e.currentTarget.getAttribute('data-priority');
      if (priority !== newPriority) {
        setPriority(newPriority);
        onTodoUpdate(
          todo.id,
          Object.assign({}, todo, {priority: newPriority}));
      }
    }

    return {
      value: priority,
      onClick,
    };
  }

  function getPriorityClass(buttonPriority) {
    return classNames('btn btn-sm', {
      'btn-outline-primary': priority.value === buttonPriority,
      'btn-outline-secondary': priority.value !== buttonPriority,
    });
  }

  function getProgressClass() {
    return classNames('input-group mb-2', {
      'done': done.checked,
      'inprogress': !done.checked,
    });
  }

  function getDisabled() {
    return done.checked ? 'disabled' : '';
  }

  function getFormattedDate() {
    return new Date(todo.date_created).toLocaleDateString();
  }

  function handleBlur() {
    if (name.value !== (todo.name || '')) {
      onTodoUpdate(
        todo.id,
        Object.assign({}, todo, {name: name.value}));
    }
  }

  function handleRemove() {
    onTodoRemove(todo.id);
  }
}
