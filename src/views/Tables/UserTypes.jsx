import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
// import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";

import UserTypeFormDialog from "../Forms/UserTypeFormDialog.jsx"

// core components
import Button from "components/CustomButtons/Button.jsx";
import API from "../../utils/API";

// import { dataTable } from "variables/general.jsx";
class UserTypesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userTypes: []
        };
        // this.renderEditable = this.renderEditable.bind(this);
    }

    refreshTable = () => {
        API.getAllUsersTypes().then(response => {

            console.log(response.data);
            const rows = response.data.map(dataValue => {
                let dataRow = [];
                for (let key in dataValue) {
                    dataRow.push(dataValue[key]);
                }
                return dataRow;
            });
            this.setState({ userTypes: rows });
        });
    }

    componentDidMount() {
        API.getAllUsersTypes().then(response => {

            console.log(response.data);
            const rows = response.data.map(dataValue => {
                let dataRow = [];
                for (let key in dataValue) {
                    dataRow.push(dataValue[key]);
                }
                return dataRow;
            });
            this.setState({ userTypes: rows });
        });
    }

    render() {
        if(this.props.refreshTable){
            this.refreshTable()
        }
        return (
            <ReactTable
                data={
                    this.state.userTypes.map((prop, key) => {
                        return {
                            id1: key,
                            User_type_id: prop[0],
                            Type_name: prop[1],
                            update: (
                                <div className="actions-right" >

                                </div>
                            ),
                            delete: (
                                <div className="actions-right">
                                    { /* use this button to remove the data row */}
                                    <Button
                                        justIcon
                                        round
                                        simple
                                        onClick={() => {
                                            //Calling Api method to delete
                                            API.deleteUserTypes((prop[0]).toString());
                                        }}
                                        color="danger"
                                        customClass="remove">
                                        <Close />
                                    </Button>{" "}
                                </div>
                            )
                        };
                    })
                }
                filterable
                columns={
                    [
                        {
                            Header: "User Type",
                            accessor: "Type_name",
                        },
                        {
                            Header: "Update",
                            accessor: "update",
                            sortable: false,
                            filterable: false,
                            style: {
                                textAlign: "center"
                            },
                            width: 70,
                            maxWidth: 70,
                            minWidth: 70,
                            Cell: row => (
                                <UserTypeFormDialog user_type={row.original} afterSubmit={this.refreshTable} />
                            )
                        },
                        {
                            Header: "Delete",
                            accessor: "delete",
                            sortable: false,
                            filterable: false,
                            style: {
                                textAlign: "center"
                            },
                            width: 70,
                            maxWidth: 70,
                            minWidth: 70,
                        }
                    ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
            />
        );
    }
}
export default UserTypesTable;
