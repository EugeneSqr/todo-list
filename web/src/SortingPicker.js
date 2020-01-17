'use strict';
import React, {useState} from 'react';
import classNames from 'classnames';

function SortingPicker({currentSorting, onSortingChange}) {
  const sorting = useSorting(currentSorting);
  return (
    <div className="container-fluid sorting-picker">
      <span>Sort by:</span>
      {
        ['done', 'id', 'name', 'created', 'priority'].map(function(label, i) {
          return (<button key={i} {...getButtonAttrs(label)}>{label}</button>);
        })
      }
    </div>
  );

  function useSorting(initialSorting) {
    const [sorting, setSorting] = useState(initialSorting);
    function onClick(e) {
      const newSorting = e.currentTarget.getAttribute('data-sorting');
      if (sorting !== newSorting) {
        setSorting(newSorting);
        onSortingChange(newSorting);
      }
    }

    return {
      value: sorting,
      onClick,
    };
  }

  function getButtonAttrs(buttonSorting) {
    return {
      'data-sorting': buttonSorting,
      'className': getSortingClass(buttonSorting),
      ...sorting,
    };
  }

  function getSortingClass(buttonSorting) {
    return classNames('btn btn-sm', {
      'btn-secondary': sorting.value === buttonSorting,
      'btn-outline-secondary': sorting.value !== buttonSorting,
    });
  }
}

export default React.memo(SortingPicker);
