import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
// import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";


import API from "../../utils/API";
import UserFormDialog from "../Forms/UserFormDialog";

// import { dataTable } from "variables/general.jsx";
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  refreshTable = () => {
    API.getAllUsers().then(response => {
      let rows = response.data.map(dataValue => {
        let dataRow = [];
        for (let key in dataValue) {
          dataRow.push(dataValue[key]);
        }
        return dataRow;
      }
      );
      this.setState({ users: rows });
      console.log(this.state.users);
      rows = rows.map((prop, key) => {
        return {
          id: key,
          User_id: prop[0],
          Name: prop[1],
          Username: prop[2],
          Type_name: prop[5],
          Is_admin: prop[6],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* <UserFormDialog user_id ={prop[0]}/> */}
            </div>
          )
        };
      });
      this.setState({ users: rows });
    });
  }

  componentDidMount() {
    API.getAllUsers().then(response => {
      let rows = response.data.map(dataValue => {
        let dataRow = [];
        for (let key in dataValue) {
          dataRow.push(dataValue[key]);
        }
        return dataRow;
      }
      );
      this.setState({ users: rows });
      console.log(this.state.users);
      rows = rows.map((prop, key) => {
        return {
          id: key,
          User_id: prop[0],
          Name: prop[1],
          Username: prop[2],
          Type_name: prop[5],
          Is_admin: prop[6],
          actions: (
            // we've added some custom button actions
            <div className="actions-center">
              {/* <UserFormDialog user_id ={prop[0]}/> */}
            </div>
          )
        };
      });
      this.setState({ users: rows });
    });
  }

  render() {
    if (this.props.refreshTable) {
      this.refreshTable()
    }
    return (
      <ReactTable
        data={this.state.users}
        filterable
        columns={[
          {
            Header: "Name",
            accessor: "Name",
            // Cell: this.renderEditable
          },
          {
            Header: "Username",
            accessor: "Username",
            // Cell: this.renderEditable
          },
          {
            Header: "User Type",
            accessor: "Type_name",
            // Cell: this.renderEditable
          },
          {
            Header: "Administrator",
            accessor: "Is_admin",
            Cell: ({ value }) => (value === "Y" ? "Yes" : "No"),
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
              <UserFormDialog user={row.original} afterSubmit={this.refreshTable} />
            )
          }
        ]}
        defaultPageSize={10}
        showPaginationTop
        showPaginationBottom={false}
        className="-striped -highlight"
        noDataText='No information found'
      />
    );
  }
}

export default Users;
