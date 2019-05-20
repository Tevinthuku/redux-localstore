# localstorage-redux

[![Build Status](https://travis-ci.org/Tevinthuku/redux-localstore.svg?branch=develop)](https://travis-ci.org/Tevinthuku/redux-localstore)
[![Coverage Status](https://coveralls.io/repos/github/Tevinthuku/redux-localstore/badge.svg?branch=develop)](https://coveralls.io/github/Tevinthuku/redux-localstore?branch=develop)

[![forthebadge](https://forthebadge.com/images/badges/built-by-hipsters.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)



## What does this library do ?

It allows a user to save/sync redux state as a whole or fragments of it to localstorage / any other generic storage a user deems fit.


Installation
------------

```bash
yarn add localstorage-redux
or
npm install localstorage-redux
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

#### `loadState(storageModule: object | undefined, storename: string | "__REDUX__STORE__")`

loadState takes:

        1. storageModule or if undefined defaults to localStorage.


        2. storename is either a predifined string or it defaults to "__REDUX__STORE__"


#### `saveState({store, storage: object | undefined, storename: string | "__REDUX__STORE__", timer: milliseconds(eg: 3000) | 2000})`

saveState takes:


        1. store - redux store


        2. storage - same as the storeModule in loadState


        3. storename - same as in loadState


        4. timer - number of milliseconds to delay for subsequent save calls after state changes in redux state. Throttles the save to storage functionality because of the expensive call to `JSON.stringify` 

## Saving partial redux state

It makes sense not to save the whole state in redux but to save only pieces that are relevant and need to be persisted even beyond refresh.

```js
import { createStore, combineReducers } from "redux";


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

```

in the above example the todos are not stored in localStorage since todos is not specified in the items array.
If items is not given any value then the whole redux store is saved to localStorage

## Scenarios where this may be useful

1. Saving the current user details to localStorage
2. Persisting the app theme colors set by a user eg: (dark mode or light mode or even persisting the primary / secondary colors of the app if they are to be changed dynamically based on the user preference)

With time I'll create demos on the 2 scenarios above.

