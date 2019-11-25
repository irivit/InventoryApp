import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// Get the routes for the application
import dashboardRoutes from "routes/dashboard.jsx";

// The two views for the app
import Pages from "layouts/Pages.jsx";
import Dashboard from "layouts/Dashboard.jsx";

// Application styling
import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";

//Testing routes
// import LoginPage from "./views/Pages/LoginPage";
// import TypesForm from "./views/Forms/TypesForm";
// import ModelForm from "./views/Forms/ModelForm";
// import UserTypeForm from "./views/Forms/UserTypeForm";
// import Dashboardc from "./views/Dashboard/Dashboard";
// import UserForm from "./views/Forms/UserForm";
// import Form from "./views/Forms/ExtendedForms";
// import Items from "./views/Forms/ItemsForm";



const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      user_id: 0,
      username: '',
    };
    this.setAuth = this.setAuth.bind(this);
  }

  setAuth = username => {
    console.log('setting auth');
    this.setState({
      isAuthenticated: true,
      username: username
    });
  };
  render() {
    return (
      <Router history={hist}>
        <Switch>

          <Route exact path="/" render={(props) => <Pages {...props} setAuth={this.setAuth} isAuth={this.state.isAuthenticated} />} />
          <Route
            path="/dashboard"
            component={
              this.state.isAuthenticated
                ? Dashboard
                : () => (
                  <Pages
                    setAuth={this.setAuth}
                    isAuth={this.state.isAuthenticated}
                  />
                )
            }
          />
          {dashboardRoutes.map((prop, key) => {
            if (prop.views) {
              return prop.views.map((prop, key) => {
                return (
                  <Route
                    exact
                    path={prop.path}
                    component={
                      this.state.isAuthenticated
                        ? Dashboard
                        : () => (
                          <Pages
                            setAuth={this.setAuth}
                            isAuth={this.state.isAuthenticated}
                          />
                        )
                    }
                    key={key}
                  />
                );
              });
            }
            return (
              <Route
                exact
                path={prop.path}
                component={
                  this.state.isAuthenticated
                    ? Dashboard
                    : () => (
                      <Pages
                        setAuth={this.setAuth}
                        isAuth={this.state.isAuthenticated}
                      />
                    )
                }
                key={key}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}

export default App;
