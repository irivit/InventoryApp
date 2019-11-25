import React from "react";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import PersonIcon from "@material-ui/icons/PersonAdd";
import List from "@material-ui/icons/ListAlt";

//Tables
import UserTypesTable from "views/Tables/UserTypes.jsx";
import UserTypeForm from "views/Forms/UserTypeForm.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class UsersTypePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            refreshTable: false

        };
    }
    afterSubmit =() => {this.setState({refreshTable : true},()=>{
        this.setState({refreshTable: false})
    })}

    render() {
        // const { classes } = this.props;
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <GridContainer justify="center">
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={11}>
                        <Card>
                            <CardHeader color="warning" icon>
                                <CardIcon color="warning">
                                    <List />
                                </CardIcon>
                                <h4>User types</h4>
                            </CardHeader>
                            <CardBody>
                                <UserTypesTable refreshTable={this.state.refreshTable}/>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={11}>
                        <Card>
                            <CardHeader color="warning" icon>
                                <CardIcon color="warning">
                                    <PersonIcon />
                                </CardIcon>
                                <h4>Add a new user type</h4>
                            </CardHeader>
                            <CardBody>
                                <UserTypeForm afterSubmit={this.afterSubmit}/>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </GridContainer>
        );
    }
}

export default withStyles(regularFormsStyle)(UsersTypePage);