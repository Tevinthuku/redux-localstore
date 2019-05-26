import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ColorPicker from "material-ui-color-picker";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

// icons

import Remove from "@material-ui/icons/Remove";
import AddOne from "@material-ui/icons/PlusOne";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    marginTop: 85
  }
});

function App(props) {
  const classes = useStyles();
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Material-UI
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.root}>
        <Typography>
          Toggle the theme, increase or decrement the counter, then reload the
          page to see your changes are still as they were before the reload
        </Typography>
        <Typography variant="h2" gutterBottom>
          {props.value}
        </Typography>
        <Button color="primary" onClick={props.increment}>
          Increment <AddOne />
        </Button>
        <Button color="secondary" onClick={props.decrement}>
          Decrement <Remove />
        </Button>
        <div
          style={{
            height: 100
          }}
        />
        <br />
        <Button onClick={props.toggleTheme}>Toggle Theme</Button>
        <Typography>Primary Color</Typography>
        <ColorPicker
          name="color"
          defaultValue="#000"
          value={props.theme.primary}
          onChange={props.changePrimary}
        />
        <Typography>Secondary Color</Typography>
        <ColorPicker
          name="color"
          defaultValue="#000"
          variant="outlined"
          value={props.theme.secondary}
          onChange={props.changeSecondary}
        />
      </Paper>
    </>
  );
}

const mapStateToProps = state => {
  return {
    value: state.counter,
    theme: state.theme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    reset: () => dispatch({ type: "RESET" }),
    toggleTheme: () => dispatch({ type: "TOGGLE_TYPE" }),
    changePrimary: payload => dispatch({ type: "CHANGE_PRIMARY", payload }),
    changeSecondary: payload => dispatch({ type: "CHANGE_SECONDARY", payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
