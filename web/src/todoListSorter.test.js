'use strict';

import sort from './todoListSorter';

describe('todoListSorter', function() {
  /* all sorting functions always return new array,
   * therefore we can get away with a single test array */
  const todoList = [
    buildTodo(1,   'Aaa', 2, '2020-01-18T08:11:10.788255', false),
    buildTodo(5,   'aaa', 1, '2019-01-18T08:11:10.788255', true),
    buildTodo(10,  'Baa', 0, '2018-01-18T08:11:10.788255', false),
    buildTodo(7,   'bBa', 0, '2017-01-18T08:11:10.788255', true),
    buildTodo(999, '1aa', 1, '2020-02-18T08:11:10.788255', false),
    buildTodo(1000,'_aa', 2, '2020-02-18T08:11:11.788255', true),
    buildTodo(1001,' aa', 0, '2020-03-18T08:11:10.788255', false),
    buildTodo(101, '',    2, '2020-03-17T08:11:10.788255', true),
  ];

  it('sort sorts the todos by id', function() {
    const actual = sort(todoList, 'id');
    expect(actual).not.toBe(todoList);
    expect(actual.map(_ => _.id)).toEqual([1, 5, 7, 10, 101, 999, 1000, 1001]);
  });

  it('sort sorts the todos by name', function() {
    const actual = sort(todoList, 'name');
    expect(actual).not.toBe(todoList);
    expect(actual.map(_ => _.name)).toEqual([
      '', ' aa', '1aa', '_aa', 'Aaa', 'aaa', 'Baa', 'bBa'
    ]);
  });

  it('sort sorts the todos by priority', function() {
    const actual = sort(todoList, 'priority');
    expect(actual).not.toBe(todoList);
    expect(actual.map(_ => _.priority)).toEqual([0, 0, 0, 1, 1, 2, 2, 2]);
  });

  it('sort sorts the todos by date', function() {
    const actual = sort(todoList, 'date_created');
    expect(actual).not.toBe(todoList);
    expect(actual.map(_ => _.date_created)).toEqual([
      '2020-03-18T08:11:10.788255',
      '2020-03-17T08:11:10.788255',
      '2020-02-18T08:11:11.788255',
      '2020-02-18T08:11:10.788255',
      '2020-01-18T08:11:10.788255',
      '2019-01-18T08:11:10.788255',
      '2018-01-18T08:11:10.788255',
      '2017-01-18T08:11:10.788255',
    ]);
  });

  it('sort sorts the todos by marked_done', function() {
    const actual = sort(todoList, 'marked_done');
    expect(actual).not.toBe(todoList);
    expect(actual.map(_ => _.marked_done)).toEqual([
      false, false, false, false, true, true, true, true,
    ]);
  });

  function buildTodo(id, name, priority, date_created, marked_done) {
    return {
      id,
      name,
      priority,
      date_created,
      marked_done,
    };
  }
});
