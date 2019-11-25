import React, { Component } from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";

// core components
import TypesFormDialog from "../Forms/TypesFormDialog";

import API from "../../utils/API";

class UserTypesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

            invetoryTypes: []
        };
    }
    refreshTable = () => {
        API.getAllTypes().then(response => {
            console.log(response.data);
            const rows = response.data.map(dataValue => {
                let dataRow = [];
                for (let key in dataValue) {
                    dataRow.push(dataValue[key]);
                }
                return dataRow;
            });
            this.setState({ invetoryTypes: rows });
        });
    } 

    componentDidMount() {
        API.getAllTypes().then(response => {
            console.log(response.data);
            const rows = response.data.map(dataValue => {
                let dataRow = [];
                for (let key in dataValue) {
                    dataRow.push(dataValue[key]);
                }
                return dataRow;
            });
            this.setState({ invetoryTypes: rows });
        });
    }

    render() {
        if(this.props.refreshTable){
            this.refreshTable()
        }
        return (
            <ReactTable
                data={this.state.invetoryTypes.map((prop, key) => {
                    return {
                        id1: key,
                        Type_id: prop[0],
                        Type_name: prop[1],
                        actions: (
                            <div className="actions-right">

                            </div>
                        )
                    };
                })
                }
                filterable
                columns={[
                    {
                        Header: "User Type",
                        accessor: "Type_name",
                    },
                    {
                        Header: "Update",
                        accessor: "actions",
                        sortable: false,
                        filterable: false,
                        style: {
                            textAlign: "center"
                        },
                        width: 70,
                        maxWidth: 70,
                        minWidth: 70,
                        Cell: row => (
                            <TypesFormDialog type={row.original} afterSubmit={this.refreshTable} />
                        )
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
