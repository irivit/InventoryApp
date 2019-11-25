import React from "react";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import List from "@material-ui/icons/ListAlt";
import ItemsIcon from "@material-ui/icons/DevicesOther";

//Table
import ItemsTable from "views/Tables/ItemsTable.jsx";

//Form
import ItemsForm from "views/Forms/ItemsForm.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";


import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class InventoryPage extends React.Component {
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
                                <h4>Inventory</h4>
                            </CardHeader>
                            <CardBody>
                            <ItemsTable refreshTable={this.state.refreshTable}/>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={11}>
                        <Card>
                            <CardHeader color="warning" icon> 
                                <CardIcon color="warning">
                                    <ItemsIcon />
                                </CardIcon>
                                <h4>Add a new inventory</h4>
                            </CardHeader>
                            <CardBody>
                                <ItemsForm afterSubmit={this.afterSubmit}/>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </GridContainer>
        );
    }
}

export default withStyles(regularFormsStyle)(InventoryPage);