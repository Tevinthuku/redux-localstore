import throttle from "lodash.throttle";

const DEFAULT_STORE_NAME = "__REDUX__STORE__";

export const loadState = (
  storage = undefined,
  storename = DEFAULT_STORE_NAME
) => {
  try {
    const storeModule = storage || window.localStorage;
    const serializedState = storeModule.getItem(storename);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (
  store,
  storage = undefined,
  storename = DEFAULT_STORE_NAME,
  timer = 2000
) => {
  store.subscribe(
    throttle(() => {
      try {
        const storeModule = storage || window.localStorage;
        const serializedState = JSON.stringify(store.getState());
        storeModule.setItem(storename, serializedState);
      } catch (err) {}
    }, timer)
  );
};

export const pickStateItems = (state, items) => {
  if (!items.length && Array.isArray(items)) return state;
  if (!Array.isArray(items)) {
    console.error(
      "the items field should receive an array but got " + typeof items
    );
    return state;
  }
  return items.reduce((acc, curr, idx) => {
    return { ...acc, [curr]: state[curr] };
  }, {});
};
