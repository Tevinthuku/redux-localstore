export default (
  state = {
    type: "dark",
    primary: "#1edaef",
    secondary: "#ee7b02"
  },
  action
) => {
  switch (action.type) {
    case "TOGGLE_TYPE":
      return { ...state, type: state.type === "dark" ? "light" : "dark" };
    case "CHANGE_PRIMARY":
      return { ...state, primary: action.payload };
    case "CHANGE_SECONDARY":
      return { ...state, secondary: action.payload };
    default:
      return state;
  }
};
