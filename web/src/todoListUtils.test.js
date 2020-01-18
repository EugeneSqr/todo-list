'use strict';
import {
  addToList,
  removeFromList,
  updateSingleInList,
} from './todoListUtils';

describe('todoListUtils', function() {
  it(`addToList adds the specifed item to the list`, function() {
    const itemToAdd = buildTodo(10);
    const todoList = [
      buildTodo(1), buildTodo(2), buildTodo(3)
    ];

    const actual = addToList(todoList, itemToAdd);
    expect(todoList).not.toBe(actual);
    expect(actual.length).toBe(todoList.length + 1);
    expect(actual[actual.length - 1].id).toBe(10);
  });

  it(`removeFromList creates new array without the todo specified`, function() {
    const todoToRemove = buildTodo(2);
    const todoList = [
      buildTodo(1), todoToRemove, buildTodo(3)
    ];
    const actual = removeFromList(todoList, todoToRemove);
    expect(todoList).not.toBe(actual);
    expect(actual.length).toBe(todoList.length - 1);
    expect(actual[0].id).toBe(1);
    expect(actual[1].id).toBe(3);
  });

  it(`removeFromList leaves the list unchanged
  when the specified todo is not found`, function() {
    const todoToRemove = buildTodo(4);
    const todoList = [
      buildTodo(1), buildTodo(2)
    ];
    const actual = removeFromList(todoList, todoToRemove);
    expect(todoList).toBe(actual);
  });

  it(`updateSingleInList updates the specified item in the list`, function() {
    const todoList = [
      buildTodo(1, 'item1'),
      buildTodo(2, 'item2'),
      buildTodo(3, 'item3'),
    ];
    const actual = updateSingleInList(todoList, buildTodo(2, 'item2-2'));
    expect(todoList).not.toBe(actual);
    expect(actual.length).toBe(todoList.length);
    expect(actual[1].name).toEqual('item2-2');
  });

  it(`updateSingleInList leaves the list unchanged
  when the specified item is not found`, function() {
    const todoList = [
      buildTodo(1),
      buildTodo(2),
    ];

    const actual = updateSingleInList(todoList, buildTodo(4));
    expect(todoList).toBe(actual);
  });

  function buildTodo(id, name) {
    return {id, name};
  }
});
