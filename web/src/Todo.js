'use strict';
import React, {useState} from 'react';
import classNames from 'classnames';

const inputGroupText = 'input-group-text';
const lowPriority = 'Low';
const mediumPriority = 'Medium';
const highPriority = 'High';

export default function Todo({todo, onTodoRemove, onTodoUpdate}) {
  const done = useDone(todo.marked_done);
  const name = useName(todo.name || '');
  const priority = usePriority(todo.priority);

  return (<div className={getProgressClass()}>
    <div className='input-group-prepend'>
      <div className={inputGroupText}>
        <input type='checkbox' {...done} />
      </div>
      <span className={inputGroupText}>{todo.id}</span>
    </div>
    <input className='form-control' disabled={getDisabled()} {...name} />
    <div className='input-group-append'>
      <button
        data-priority={highPriority}
        className={getPriorityClass(highPriority)}
        disabled={getDisabled()}
        {...priority}>
        <i className='icon-upload'></i>
      </button>
      <button
        data-priority={mediumPriority}
        className={getPriorityClass(mediumPriority)}
        disabled={getDisabled()}
        {...priority}>
        <i className='icon-ok-circle'></i>
      </button>
      <button
        data-priority={lowPriority}
        className={getPriorityClass(lowPriority)}
        disabled={getDisabled()} {...priority}>
        <i className='icon-download'></i>
      </button>
      <span className={inputGroupText}>{getFormattedDate()}</span>
      <button className='btn btn-secondary btn-sm' onClick={handleRemove}>
        <i className='icon-remove'></i>
      </button>
    </div>
  </div>);

  function useName(initialName) {
    const [name, setName] = useState(initialName);
    function onChange(e) {
      setName(e.target.value);
    }

    return {
      value: name,
      onChange,
      onBlur: function() {
        if (name !== initialName) {
          onTodoUpdate(
            todo.id,
            Object.assign({}, todo, {name: name}));
        }
      },
    };
  }

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

  function handleRemove() {
    onTodoRemove(todo.id);
  }
}
