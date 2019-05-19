# localstorage-redux

[![Build Status](https://travis-ci.org/Tevinthuku/redux-localstore.svg?branch=develop)](https://travis-ci.org/Tevinthuku/redux-localstore)
[![Coverage Status](https://coveralls.io/repos/github/Tevinthuku/redux-localstore/badge.svg?branch=develop)](https://coveralls.io/github/Tevinthuku/redux-localstore?branch=develop)


## What does this library do ?

It allows a user to save/sync redux state as a whole or fragments of it to localstorage / any other generic storage a user deems fit.


Installation
------------

```bash
yarn add localstorage-redux
```


Usage
------------
Check out the `demo/src/index.js` folder to see a bare bone implementation of the library

```js
import { createStore } from "redux";
import { loadState, saveState } from "localstorage-redux/lib";

const storeTestName = "__REDUX__TEST__STORE__";

/***
 * a basic store solution if you 
 * implement your own store make sure to expose
* the getItem and setItem functions
*/

const storageMock = () => {
  let storage = {};

  return {
    setItem: (key, value) => {
      storage[key] = value;
    },
    getItem: key => {
      return key in storage ? storage[key] : null;
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
const storageModule = storageMock();
const store = createStore(todos, loadState(storageModule, storeTestName));
saveState(store, storageModule, storeTestName);

```


## How it works

#### `loadState(storageModule: object | undefined, storeName: string | "__REDUX__STORE__")`

loadState takes:

        1. storageModule or if undefined defaults to localStorage.


        2. storeName is either a predifined string or it defaults to "__REDUX__STORE__"


#### `saveState(store, storageModule: object | undefined, storeName: string | "__REDUX__STORE__", timer: milliseconds(eg: 3000) | 2000)`

saveState takes:


        1. store - redux store


        2. storageModule - same as the module in loadState


        3. storeName - same as in loadState


        4. timer - number of milliseconds to delay for subsequent save calls after state changes in redux state. Throttles the save to storage functionality because of the expensive call to `JSON.stringify` 
