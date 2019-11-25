import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
// import Favorite from "@material-ui/icons/Favorite";
import LinkedCamera from "@material-ui/icons/LinkedCamera";

//Table
import AuditLogsTable from "views/Tables/AuditLogsTable.jsx";

//Update form dialog
import ItemsFormDialog from "../Forms/ItemsFormDialog"

// core components
import Button from "components/CustomButtons/Button.jsx";

//API
import API from "../../utils/API";
import ImageDialog from "../Forms/ImageDialog";


class ItemsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selectedFile: null,
            itemId: 135,
            // logs: [],
            // item_id: 135
        };
    }

    fileSelectedHandler = event => {
        const file = event.target.files[0]
        console.log("file");
        console.log(file);
        // this.setState({ 
        //     selectedFile: file
        // });
        this.setState({ selectedFile: event.target.files[0] }, console.log("state" + JSON.stringify(this.state.selectedFile)));
    };

    fileUploadHandler = () => {
        console.log(this.state.itemId);
        console.log('selected file in fileuploadhandler' + JSON.stringify(this.state.selectedFile));
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        API.postImg(this.state.itemId, fd).then(res => {
            console.log(res);
        }).catch(err => {
            console.log('data dentro del fileuploadhandler ' + JSON.stringify(fd));
            console.log(err)
        })

    }
    refreshTable = () => {
        API.getAllItems().then(response => {
            let rows = response.data.map(dataValue => {
                let dataRow = [];
                for (let key in dataValue) {
                    dataRow.push(dataValue[key]);
                }
                return dataRow;
            });
            this.setState({ items: rows });
            console.log(this.state.items);
        });
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
            this.setState({ items: rows });
            console.log(this.state.items);
        });
    }

    render() {
        if(this.props.refreshTable){
            this.refreshTable()
        }
        return (
            <ReactTable
                data={this.state.items.map((prop, key) => {
                    return {
                        id1: key,
                        Item_id: prop[0],
                        Type_name: prop[3],
                        Model_name: prop[4],
                        Serial_number: prop[5],
                        LocationName: prop[7],
                        LocationType: prop[8],
                        CreatorName: prop[11],
                        Active_fl: prop[15],
                        update: (
                            <div className="actions-right">
                             
                            </div>
                        ),
                        image: (
                            <div className="actions-right">
                  
                            </div>
                        ),
                    };
                })
                }

                filterable
                columns={[
                    {
                        Header: "Type",
                        accessor: "Type_name",
                        width: 100,
                        minWidth: 100,
                        maxWidth: 100
                    },
                    {
                        Header: "Model",
                        accessor: "Model_name",

                    },
                    {
                        Header: "Serial number",
                        accessor: "Serial_number",

                    },
                    {
                        Header: "Location Name",
                        accessor: "LocationName",

                    },
                    {
                        Header: "Location Type",
                        accessor: "LocationType",

                    },
                    {
                        Header: "Creator",
                        accessor: "CreatorName",

                    },
                    {
                        Header: "Active",
                        accessor: "Active_fl",
                        Cell: ({ value }) => (value === "Y" ? "Yes" : "No"),
                        style: {
                            textAlign: "center"
                        },
                        width: 80,
                        minWidth: 80,
                        maxWidth: 80

                    },
                    {
                        Header: "Update ",
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
                            <ItemsFormDialog item={row.original} afterSubmit={this.refreshTable}/>
                            
                        ),
                    },
                    {
                        Header: "Image ",
                        accessor: "image",
                        sortable: false,
                        filterable: false,
                        style: {
                            textAlign: "center"
                        },
                        width: 70,
                        minWidth: 70,
                        maxWidth: 70,
                        Cell: row => (
                            <ImageDialog item={row.original} />
                            
                        ),
                    },
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
                noDataText='No information found'

                SubComponent={row => (
                    <div style={{ padding: "20px" }}>
                        <b>Audit logs</b> 
                        <br />
                        <AuditLogsTable value={row.original.Item_id} />
                    </div>
                )}
            />
        );
    }

}
export default ItemsTable;
