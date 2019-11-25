import React from "react";

// Import API
import API from "utils/API";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

// @material-ui/icons

import PermIdentity from "@material-ui/icons/PermIdentity";


import { Redirect } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInputLogin from "components/CustomInput/CustomInputLogin.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import loginLogo from "assets/img/eoglogo.png";

let sessionUser =  sessionStorage.getItem('user_name');
let sessionPassword = sessionStorage.getItem('password');

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      username: "",
      password: "",
      errorMessage: ""
    };
  }


  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  logIn = event => {
    event.preventDefault();
    API.login({
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
      
        this.props.setAuth(res.data["Name"]);

        sessionStorage.setItem('user_name', this.state.username);
        sessionStorage.setItem('password', this.state.password);
      })
      .catch(err => this.setState({ errorMessage: "Login Failed" + err.toString()}));
  };
  handleChange = event => {
    this.setState({ [event.target.getAttribute("id")]: event.target.value });
  };
  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/dashboard" />;
    }
    if (sessionUser ) {
      API.login({
        username: sessionUser,
        password: sessionPassword
      })
        this.props.setAuth(sessionUser);
      return <Redirect to="/dashboard" />;
    }


    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={event => this.logIn(event)}>
              <Card login >
                <img
                    src={loginLogo}
                    alt="EOG Logo"
                    width="25%"
                    height= "5%"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      display: "block"
                    }}
                  />
              
                <CardBody className={classes.cardBodyImg}>
                  <CustomInputLogin
                    labelText="Username..."
                    name="username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.loginHandler}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PermIdentity
                            className={classes.inputAdornmentIcon}
                          />
                        </InputAdornment>
                      ),
                      onChange: this.handleChange
                    }}
                  />
                  <CustomInputLogin
                    labelText="Password"
                    name="password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={this.loginHandler}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      onChange: this.handleChange,
                      type: "Password"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  {this.state.errorMessage === "" || (
                    <Typography color="error">
                      {this.state.errorMessage}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    color="youtube"
                    simple
                    size="lg"
                    block
                  >
                   <em><b>Let's Go</b> </em>
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);


