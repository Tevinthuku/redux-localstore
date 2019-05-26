import React from "react";

import { connect } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const dynamicTheme = ({ type, primary, secondary }) =>
  createMuiTheme({
    palette: {
      type,
      primary: {
        main: primary
      },
      secondary: {
        main: secondary
      }
    }
  });

const withTheme = Component => {
  class Theme extends React.Component {
    render() {
      return (
        <ThemeProvider theme={dynamicTheme(this.props.theme)}>
          <Component {...this.props} />
        </ThemeProvider>
      );
    }
  }
  const mapStateToProps = state => {
    const { theme } = state;

    return {
      theme
    };
  };
  return connect(mapStateToProps)(Theme);
};

export default withTheme;
