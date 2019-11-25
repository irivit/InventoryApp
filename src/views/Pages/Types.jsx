import React from "react";

// @material-ui/core components

import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import ListIcon from "@material-ui/icons/List";
import List from "@material-ui/icons/ListAlt";

//Tables
import TypeTable from "views/Tables/InventoryTypes.jsx";
import TypesForm from "views/Forms/TypesForm.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { Redirect } from "react-router-dom";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class TypesPage extends React.Component {
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
                                <h4>Inventory types</h4>
                            </CardHeader>
                            <CardBody>
                            <TypeTable refreshTable={this.state.refreshTable}/>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={11}>
                        <Card>
                            <CardHeader color="warning" icon> 
                                <CardIcon color="warning">
                                    <ListIcon />
                                </CardIcon>
                                <h4>Add a new inventory type</h4>
                            </CardHeader>
                            <CardBody>
                                <TypesForm afterSubmit={this.afterSubmit}/>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </GridContainer>
        );
    }
}

export default withStyles(regularFormsStyle)(TypesPage);