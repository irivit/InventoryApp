import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";


// @material-ui/icons
import Store from "@material-ui/icons/Store";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import image from "assets/img/image1.png";

//API
import API from "../../utils/API"

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";

const Style = {
  fontSize: '400%',
  textAlign: 'center',
  color: "white",
  fontFamily: 'sans-serif'
};

const StyleDiv = {
  backgroundColor: '#ffffff'
};

class Dashboard extends React.Component {
  state = {
    value: 0,
    items: [],
    users: [],
    models: [],
    activeItems: 0,
    activeUsers: 0,
    totalInventory: 0,
    totalUser: 0,
    totalModels: 0
  };


  activeInventory = (items) => {
    let cantAvctive = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i][15] === 'Y') {
        cantAvctive++;
      }
    }
    return cantAvctive;
  }



  componentDidMount() {
    API.getAllItems().then(response => {
      let rows = response.data.map(dataValue => {
        let dataRow = [];
        for (let key in dataValue) {
          dataRow.push(dataValue[key]);
        }
        return dataRow;
      });
      // let rows =response.data;
      this.setState({ items: rows });

      this.setState({ totalInventory: this.state.items.length });
      let arrayItems = [...this.state.items]

      let active = this.activeInventory(arrayItems);
      this.setState({ activeItems: active });

    })

    API.getAllUsers().then(response => {
      const rows3 = response.data.map(dataValue3 => {
        let dataRow3 = [];
        for (let key in dataValue3) {
          dataRow3.push(dataValue3[key]);
        }
        return dataRow3;
      });
      this.setState({ users: rows3 });
      this.setState({ totalUser: rows3.length });
    });

    API.getAllModels().then(response => {
      const rows1 = response.data.map(dataValue1 => {
        let dataRow1 = [];
        for (let key in dataValue1) {
          dataRow1.push(dataValue1[key]);
        }
        return dataRow1;
      });
      this.setState({ models: rows1 });
      this.setState({ totalModels: rows1.length });
    });

  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>

        <img
          src={image}
          alt="EOG Logo"
          width="100%"
          height="15%"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            // marginTop: "1rem",
            marginBottom: "3rem",
            container: "fluid"
            // display: "block"
          }}
        />
        <GridContainer justify="center" style={StyleDiv}>
          <GridItem xs={12} sm={12} md={12} lg={12}>

          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}><b>Total Inventory Active</b></p>
                <h3 className={classes.cardTitle}> {this.state.activeItems}/ {this.state.totalInventory}</h3>
              </CardHeader>
              <CardFooter stats>

              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}><b>Total Users</b></p>
                <h3 className={classes.cardTitle}>
                  {this.state.totalUser}
                </h3>
              </CardHeader>
              <CardFooter stats>

              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}><b>Total Models</b></p>
                <h3 className={classes.cardTitle}>{this.state.totalModels}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>

                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div >

    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
