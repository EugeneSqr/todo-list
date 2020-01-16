'use strict';
import React from 'react';

export default function Todo() {
  return (<div className="input-group mb-2">
    <div className="input-group-prepend">
      <div className="input-group-text">
        <input type="checkbox" />
      </div>
    </div>
    <input type="text" className="form-control" />
    <div className="input-group-append">
      <span className="input-group-text">11.11.2020</span>
      <button className="btn btn-outline-secondary btn-sm" type="button">
        <i className="icon-download"></i>
      </button>
      <button className="btn btn-outline-primary btn-sm" type="button">
        <i className="icon-ok-circle"></i>
      </button>
      <button className="btn btn-outline-secondary btn-sm" type="button">
        <i className="icon-upload"></i>
      </button>
      <button className="btn btn-outline-secondary btn-sm" type="button">
        <i className="icon-remove"></i>
      </button>
    </div>
  </div>);
}
