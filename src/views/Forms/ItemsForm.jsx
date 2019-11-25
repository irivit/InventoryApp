import React from "react";
import { Redirect } from "react-router-dom";


// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import ScannerDiv from "components/Scanner/ScannerDiv.js";
import FormErrors from './FormErrors';

// Import API
import API from "../../utils/API";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";


class ItemsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            type_id: 0,
            model_id: 0,
            serial_number: "",
            user_id: 0,
            users: [],
            models: [],
            inventoryTypes: [],
            formErrors: { serial: '' },
            serialValid: false,
            formValid: false
        
        };
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange = event => {
        const name = event.target.getAttribute("id");
        const value = event.target.value;
        this.setState({[name]: value}, 
          () => { this.validateField(name, value) });
    };
    handleChangeUser = event => {
        this.setState({ user_id: event.target.value });
    };
    handleChangeType = event => {
        this.setState({ type_id: event.target.value });
    };
    handleChangeModel = event => {
        this.setState({ model_id: event.target.value });
    };


    validateField(value) {
        let fieldValidationErrors = this.state.formErrors;
        let serialValid = this.state.serialValid;
    
        if(serialValid = value.length >= 0 )
            fieldValidationErrors.name = serialValid ? '' : ' Invalid serial field';
        
        this.setState({
          formErrors: fieldValidationErrors,
          serialValid: serialValid,
        }, this.validateForm);
      }
    
      validateForm() {
        this.setState({ formValid: this.state.serialValid});
      }

    sumbitHandler = event => {
        event.preventDefault();
        if (!this.props.item) {
         
            API.postItem({
                type_id: this.state.type_id,
                model_id: this.state.model_id,
                serial_number: this.state.serial_number,
                user_id: this.state.user_id,
            })
                .then(res => {
                    this.props.afterSubmit()
               
                    if (res.data.id) {
                        this.setState({ redirect: true });
                    }
                    this.setState({
                        type_id: 0,
                        model_id: 0,
                        serial_number: "",
                        user_id: 0,
                      })
                })
                .catch(err =>
                    console.log(err)
                );
        } else {
            API.updateItem({
                "item_id": parseInt(this.state.item_id),
                "type_id": parseInt(this.state.type_id),
                "model_id": parseInt(this.state.model_id),
                "user_id": parseInt(this.state.user_id),
                "serial_number": this.state.serial_number,
                "active_fl": this.state.active_fl,
                "edited_id": 0
            })
                .then(res => {
                    this.props.afterSubmit()
                   
                    if (res.data.id) {
                        this.setState({
                            redirect: true,
                        });

                    }
                })
                .catch(err =>
                    
                    console.log(err)
                );
        }
        if (this.props.close) {
            this.props.close();
        }
    };


    componentDidMount() {
        API.getAllModels().then(response => {
            const rows1 = response.data.map(dataValue1 => {
                let dataRow1 = [];
                for (let key in dataValue1) {
                    dataRow1.push(dataValue1[key]);
                }
                return dataRow1;
            });
            this.setState({ models: rows1 });
         

            API.getAllTypes().then(response => {
                const rows2 = response.data.map(dataValue2 => {
                    let dataRow2 = [];
                    for (let key in dataValue2) {
                        dataRow2.push(dataValue2[key]);
                    }
                    return dataRow2;
                });
                this.setState({ inventoryTypes: rows2 });
            

                API.getAllUsers().then(response => {
                    const rows3 = response.data.map(dataValue3 => {
                        let dataRow3 = [];
                        for (let key in dataValue3) {
                            dataRow3.push(dataValue3[key]);
                        }
                        return dataRow3;
                    });
                    this.setState({ users: rows3 });
                 
                });
            });
        });
        if (this.props.item) {
   
            API.getItem(this.props.item.Item_id).then(response => {
                this.setState(response.data[0])
             

            })
        }


    };

    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />;
        }

        // Creating menus for select USERS component
        let userMenu = (
            this.state.users.map((user, index) => {
                return <MenuItem
                    value={user[0]}
                    key={index}
                >{user[1]}
                </MenuItem>
            })
        );

        // Creating menus for select TYPES component
        let typeMenu = (
            this.state.inventoryTypes.map((type, index) => {
                return <MenuItem
                    value={type[0]}
                    key={index}
                >{type[1]}
                </MenuItem>
            })
        );

        // Creating menus for select MODELS component
        let modelMenu = (
            this.state.models.map((model, index) => {
                return <MenuItem
                    value={model[0]}
                    key={index}
                >{model[1]}
                </MenuItem>
            })
        );

        return (
            <React.Fragment>
            <form onSubmit={(event) => { this.sumbitHandler(event) }}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <FormControl fullWidth >
                            <InputLabel htmlFor="type_id">Invetory type</InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                value={this.state.type_id}
                                onChange={this.handleChangeType}

                                inputProps={{
                                    name: 'type_id',
                                    id: "type_id",
                                }}
                            >
                                {typeMenu}
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>

                        <FormControl fullWidth >
                            <InputLabel htmlFor="model_id">Model</InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                value={this.state.model_id}
                                onChange={this.handleChangeModel}

                                inputProps={{
                                    name: 'model_id',
                                    id: "model_id",
                                }}
                            >
                                {modelMenu}
                            </Select>
                        </FormControl>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Serial Number"
                                    name="serial_number"
                                    id="serial_number"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        placeholder: "required",
                                        value: this.state.serial_number
                                    }}
                                    
                                />
                            </GridItem>
                            {/* <GridItem xs={12} sm={12} md={6} justify="center"> */}
                            {/* <Button color="youtube" onClick={(event) => { this.sumbitHandler(event) }}>
                                                    Scan serial number
                                                </Button> */}
                           
                                {/* <ScannerDiv getSerial={this.getSerialFromScanner} /> */}
                                {/* </GridItem> */}
                            

                        </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>

                        <FormControl fullWidth >
                            <InputLabel htmlFor="user_id">User</InputLabel>
                            <Select
                                MenuProps={{
                                    className: classes.selectMenu
                                }}
                                value={this.state.user_id}
                                onChange={this.handleChangeUser}

                                inputProps={{
                                    name: 'user_id',
                                    id: "user_id",
                                }}
                            >
                                {userMenu}
                            </Select>
                        </FormControl>
                    </GridItem>
                </GridContainer>
                <Button color="youtube" type="submit" disabled={!this.state.formValid}>
                    Submit
                </Button>
            </form>
                <div className='panel panel-default'>
                <FormErrors formErrors={this.state.formErrors} />
              </div>
            </React.Fragment>

        );
    }
}
export default withStyles(regularFormsStyle)(ItemsForm);