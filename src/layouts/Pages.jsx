import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import LoginPage from "views/Pages/LoginPage.jsx";
import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";



class Pages extends React.Component {

  componentDidMount() {
    document.body.style.overflow = "unset";
  }
  render() {
    const { classes } = this.props;
    if (this.props.isAuth) {
      return <Redirect to="/dashboard" />;
    }
    return (
        <div
          className={classes.wrapper}
          ref="wrapper">
          <LoginPage setAuth={this.props.setAuth} />
        </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(pagesStyle)(Pages);
