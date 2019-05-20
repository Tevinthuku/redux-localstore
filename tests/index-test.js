import expect from "expect";
import { createStore, combineReducers } from "redux";

import { pickStateItems, loadState, saveState } from "src/index";

describe("pickStateItems tests", () => {
  it("returns whole state if no items are present", () => {
    const state = {
      a: 1,
      b: 2,
      c: 3
    };

    expect(pickStateItems(state, [])).toEqual(state);
  });
  it("returns only the selected items in the state", () => {
    const state = {
      a: 1,
      b: 2,
      c: 3
    };

    expect(pickStateItems(state, ["a"])).toEqual({ a: 1 });
  });
  it("should return whole object if items field is not an array and default to returning whole state", () => {
    const state = {
      a: 1,
      b: 2
    };

    let spy = expect.spyOn(console, "error");
    expect(pickStateItems(state, { a: 1 })).toEqual(state);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      "the items field should receive an array but got object"
    );
  });
});

/**
 * testing redux
 */

const storeTestName = "__REDUX__TEST__STORE__";

const storageMock = () => {
  let storage = {};

  return {
    setItem: (key, value) => {
      storage[key] = value;
    },
    getItem: key => {
      return key in storage ? storage[key] : null;
    },
    reset: () => {
      storage = {};
    },
    retrieveAll: () => {
      return storage;
    }
  };
};

/**
 *
 * @param {array} state - state array to hold the todos
 * @param {object} action - holds the action meta data/ info
 */
function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

describe("Testing the redux store with the 2 methods", () => {
  let store;
  let storageMocker;
  beforeEach(() => {
    storageMocker = storageMock();
    storageMocker.reset();
    store = createStore(todos, loadState(storageMocker, storeTestName));
    saveState({ store, storage: storageMocker, storename: storeTestName });
  });
  it("should return empty list by default as state", () => {
    expect(store.getState()).toEqual([]);
  });
  it("both storemodule and redux should have 1 item each on adding a todo", () => {
    store.dispatch({
      type: "ADD_TODO",
      text: "Read the docs"
    });

    expect(store.getState()).toEqual(["Read the docs"]);
    expect(storageMocker.retrieveAll()).toEqual({
      __REDUX__TEST__STORE__: '["Read the docs"]'
    });
  });
  it("returns todo present in storage as initial State in redux on initial Load", () => {
    let newMockStorage = storageMock();
    newMockStorage.setItem(storeTestName, '["Read the docs"]');
    store = createStore(todos, loadState(newMockStorage, storeTestName));
    saveState({ store, storage: newMockStorage, storename: storeTestName });
    expect(store.getState()).toEqual(["Read the docs"]);
  });
  it("should return empty list if bad state is recorded into the store", () => {
    let newMockStorage = storageMock();
    // state item should be serializable. but instead here, Im passing an array
    newMockStorage.setItem(storeTestName, ["New state"]);
    store = createStore(todos, loadState(newMockStorage, storeTestName));
    saveState({ store, storage: newMockStorage, storename: storeTestName });
    expect(store.getState()).toEqual([]);
  });
  it("should not store todos in redux if the specified list of items dont specify it", () => {
    const reducers = combineReducers({
      todos
    });
    let newMockStorage = storageMock();
    store = createStore(reducers, loadState(newMockStorage, storeTestName));
    store.dispatch({
      type: "ADD_TODO",
      text: "Read the docs"
    });
    saveState({
      store,
      storage: newMockStorage,
      storename: storeTestName,
      items: ["non-todos-object"]
    });
    expect(newMockStorage.retrieveAll()).toEqual({});
  });
});
