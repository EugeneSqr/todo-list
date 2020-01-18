'use strict';
import _ from 'lodash';

const sorters = {
  'id': {
    func: (o) => o.id,
    order: 'asc',
  },
  'name': {
    func: (o) => (o.name || '').toLowerCase(),
    order: 'asc',
  },
  'priority': {
    func: (o) => o.priority,
    order: 'asc',
  },
  'date_created': {
    func: (o) => new Date(o.date_created),
    order: 'desc',
  },
  'marked_done': {
    func: (o) => o.marked_done,
    order: 'asc',
  },
};

export default function sort(todos, sorting) {
  const sorter = sorters[sorting];
  return _.orderBy(todos, [sorter.func], [sorter.order]);
}
