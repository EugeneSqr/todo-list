'use strict';
import React from 'react';

export default function SortingPicker() {
  return (
    <div className="container-fluid sorting-picker">
      <span>Sort by:</span>
      <button className="btn btn-outline-secondary btn-sm">Done</button>
      <button className="btn btn-outline-secondary btn-sm">Id</button>
      <button className="btn btn-outline-secondary btn-sm">Text</button>
      <button className="btn btn-outline-secondary btn-sm">Created</button>
      <button className="btn btn-outline-secondary btn-sm">Priority</button>
    </div>
  );
}
