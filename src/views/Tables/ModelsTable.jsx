import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";


// core components
import ModelsFormDialog from "../Forms/ModelsFormDialog";

//API
import API from "../../utils/API";

class UserTypesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: [],
            types: [],
            result: [],
            newInstance: {
                modelId: '',
                modelName: '',
                modelType: ''
            },
            newArray: [],
        }
    };

    createArray = (models, types) => {
        const result = []
        for (let i = 0; i <= models.length - 1; i++) {
            let typeid_model = models[i][2];
            for (let j = 0; j <= types.length - 1; j++) {
                if (types[j][0] === typeid_model) {
                    const newInstance = {
                        modelId: models[i][0],
                        modelName: models[i][1],
                        modelType: types[j][1]
                    }
                    result.push(newInstance);
                }
            }
        }
        return result;
    }

    refreshTable = () => {

        API.getAllModels().then(response => {
            const rows = response.data.map(dataValue => {
                let dataRow = [];
                for (let key in dataValue) {
                    dataRow.push(dataValue[key]);
                }
                return dataRow;
            });
            this.setState({ models: rows });

            API.getAllTypes().then(response => {
                const rows = response.data.map(dataValue => {
                    let dataRow = [];
                    for (let key in dataValue) {
                        dataRow.push(dataValue[key]);
                    }
                    return dataRow;
                });
                this.setState({ types: rows });
                let newArray = this.createArray(this.state.models, this.state.types);
                this.setState({ newArray: newArray })
                console.log('newrray', newArray)

                this.formatingArray(this.state.newArray);
            });
        });
    }

    formatingArray = (array) => {
        const rows = array.map(dataValue => {
            let dataRow = [];
            for (let key in dataValue) {
                dataRow.push(dataValue[key]);
            }
            return dataRow;
        });
        this.setState({ newArray: rows });
    }

    componentDidMount() {
        API.getAllModels().then(response => {
            const rows = response.data.map(dataValue => {
                let dataRow = [];
                for (let key in dataValue) {
                    dataRow.push(dataValue[key]);
                }
                return dataRow;
            });
            this.setState({ models: rows });

            API.getAllTypes().then(response => {
                const rows = response.data.map(dataValue => {
                    let dataRow = [];
                    for (let key in dataValue) {
                        dataRow.push(dataValue[key]);
                    }
                    return dataRow;
                });
                this.setState({ types: rows });
                let newArray = this.createArray(this.state.models, this.state.types);
                this.setState({ newArray: newArray })
                console.log('newrray', newArray)

                this.formatingArray(this.state.newArray);
            });
        });
    }

    render() {
        if(this.props.refreshTable){
            this.refreshTable()
        }
        return (
            <ReactTable
                data={this.state.newArray.map((prop, key) => {
                    return {
                        id1: key,
                        Model_id: prop[0],
                        ModelName: prop[1],
                        ModelType: prop[2],
                        actions: (
                            <div className="actions-center">
                                { /* use this to edit the data row */}
                                {/* <ModelsFormDialog model_id={prop[0]} /> */}
                            </div>
                        )
                        // afterSubmit={this.refreshTable}
                    };
                })
                }
                filterable
                columns={[
                    {
                        Header: "Model name",
                        accessor: "ModelName"
                    },
                    {
                        Header: "Model type",
                        accessor: "ModelType"
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
                            <ModelsFormDialog model={row.original} afterSubmit={this.refreshTable} />

                        ),
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
