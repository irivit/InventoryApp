import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";


// core components
import API from "../../utils/API";



class AuditLogsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: []
        };
    }

    componentWillMount() {
        const item_id = { item_id: this.props.value }
        API.getItemsAuditLogs(item_id).then(response => {
            let rows = response.data.map(dataValue => {
                let dataRow = [];
                for (let key in dataValue) {
                    dataRow.push(dataValue[key]);
                }
                return dataRow;
            });
            this.setState({ logs: rows });
       
  
        }).catch(err => {
            console.log(err)
          });
    }

    render() {
        return (
            <ReactTable
                data={this.state.logs.map((prop, key) => {
                    return {
                        id: key,
                        Item_id: prop[0],
                        TStamp: prop[2],
                        EditorName: prop[17],
                        AssignedTo: prop[4],
                        CreatorName: prop[15],
                        actions: (
                            <div className="actions-center">
                                { /* use this to edit the data row */}
                                {/* <ModelsFormDialog model_id={prop[0]} /> */}
                            </div>
                        )

                    };
                })
                }
                filterable
                columns={[
                    {
                        Header: "Assigned To",
                        accessor: "AssignedTo",
                    },
                    {
                        Header: "Editor",
                        accessor: "EditorName",
                    },
                    {
                        Header: "Date edited",
                        accessor: "TStamp",
                    },
                    {
                        Header: "Created by",
                        accessor: "CreatorName",
                        
                    },
                    {
                        Header: "",
                        accessor: "actions",
                        width: 5,
                        minWidth: 5,
                        maxWidth: 5,
                        
                    },
          
                ]}
                defaultPageSize={5}
            
                className="-striped -highlight"
            />
        );
    }
}
export default AuditLogsTable;