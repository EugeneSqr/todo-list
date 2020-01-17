'use strict';
import React from 'react';
import classNames from 'classnames';

export default React.memo(function Todo({todo}) {
  const inputGroupText = 'input-group-text';
  return (<div className={getProgressClass()}>
    <div className='input-group-prepend'>
      <div className={inputGroupText}>
        <input
          type='checkbox'
          checked={todo.marked_done}
          onChange={function() {}}/>
      </div>
      <span className={inputGroupText}>{todo.id}</span>
    </div>
    <input
      className='form-control'
      value={getName()}
      disabled={getDisabled()}
      onChange={function() {}}
    />
    <div className='input-group-append'>
      <button className={getPriorityClass('High')} disabled={getDisabled()}>
        <i className='icon-upload'></i>
      </button>
      <button className={getPriorityClass('Medium')} disabled={getDisabled()}>
        <i className='icon-ok-circle'></i>
      </button>
      <button className={getPriorityClass('Low')} disabled={getDisabled()}>
        <i className='icon-download'></i>
      </button>
      <span className={inputGroupText}>{getFormattedDate()}</span>
      <button className='btn btn-secondary btn-sm'>
        <i className='icon-remove'></i>
      </button>
    </div>
  </div>);

  function getPriorityClass(priority) {
    return classNames('btn btn-sm', {
      'btn-outline-primary': todo.priority === priority,
      'btn-outline-secondary': todo.priority !== priority,
    });
  }

  function getProgressClass() {
    return classNames('input-group mb-2', {
      'done': todo.marked_done,
      'inprogress': !todo.marked_done,
    });
  }

  function getDisabled() {
    return todo.marked_done ? 'disabled' : '';
  }

  function getFormattedDate() {
    return new Date(todo.date_created).toLocaleDateString();
  }

  function getName() {
    return todo.name || '';
  }
});
