import throttle from "lodash.throttle";

const DEFAULT_STORE_NAME = "__REDUX__STORE__";
/**
 *
 * @param {object} storage - provide your own storage solution as long as it has the getItem function
 * @param {string} storename - you can provide your own custom storename the default is __REDUX__STORE__
 */
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

/**
 *
 * @param {object} store - redux store :)
 * @param {*} storage - default store is the browsers localStorage
 *                      but you can provide your own
 *                      if it provides the setItem prop
 * @param {string} storename - then name of the storege key..
 *                        Same as the one provided in loadState
 * @param {array} items - provide specific items you want to save to localStorage
 * @param {*} timer - throttling time to make sure the call to
 *                      subscribe is not overly called upon because of the expensive JSON.stringify function.
 */

export const saveState = ({
  store,
  storage = undefined,
  storename = DEFAULT_STORE_NAME,
  items = [],
  timer = 2000
}) => {
  store.subscribe(
    throttle(() => {
      try {
        const storeModule = storage || window.localStorage;
        const serializedState = JSON.stringify(
          pickStateItems(store.getState(), items)
        );
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
