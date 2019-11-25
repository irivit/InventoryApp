import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormErrors from './FormErrors';

// Import API
import API from "../../utils/API";
import { Redirect } from "react-router-dom";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class UserEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            name: '',
            username: '',
            password: '',
            user_type_id: '',
            is_admin: '',
            userTypes: [],
            active_fl: "",
            user_id: 0,
            formErrors: {
                full_name: '',
                user_name: '',
                pass: ''
            },
            full_nameValid: false,
            user_nameValid: false,
            passValid: false,
            formValid: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSimple = this.handleSimple.bind(this);
        this.handleSimpleAdmin = this.handleSimpleAdmin.bind(this);
    }
    handleChange = event => {
        const name = event.target.getAttribute("id");
        const value = event.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    };

    handleSimple(event) {
        this.setState({ user_type_id: event.target.value });
      
    };
    handleSimpleAdmin(event) {
        this.setState({ is_admin: event.target.value });
      
    };
    handleSimpleActive = (event) => {
        this.setState({ active_fl: event.target.value });
      
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let full_nameValid = this.state.full_nameValid;
        let user_nameValid = this.state.user_nameValid;
        let passValid = this.state.passValid;

        switch (fieldName) {
            case 'name':
                full_nameValid = value.length >= 2 && value.length <= 150;
                fieldValidationErrors.full_name = full_nameValid ? '' : `Name can't be empty `;
                break;
            case 'username':
                user_nameValid = value.length >= 2 && value.length <= 150;
                fieldValidationErrors.user_name = user_nameValid ? '' : `Username can't be empty `;
                break;
            case 'password':
                passValid = value.length >= 6;
                fieldValidationErrors.pass = passValid ? '' : ' Password too short';
                break;

            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            full_nameValid: full_nameValid,
            user_nameValid: user_nameValid,
            passValid: passValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.full_nameValid && this.state.user_nameValid && this.state.passValid });
    }


    componentDidMount() {
        API.getAllUsersTypes().then(response => {
        
            const rows = response.data.map(dataValue => {
                let dataRow = [];
                for (let key in dataValue) {
                    dataRow.push(dataValue[key]);
                }
                return dataRow;
            });
            this.setState({ userTypes: rows });
            if (this.state.userTypes.length === 0) {
                this.setState({ showTypes: false });
            }
         
        });

        if (this.props.user) {
            API.getUser(this.props.user.User_id).then(response => {
                this.setState(response.data[0])
            
            })
        }
    }

    sumbitHandler = event => {
        event.preventDefault();
        API.updateUser({
            "user_id": this.props.user.User_id,
            "name": this.state.name,
            "username": this.state.username,
            "password": this.state.password,
            "user_type_id": this.state.user_type_id,
            "active_fl": this.state.active_fl,
            "is_admin": this.state.is_admin,
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
        if (this.props.close) {
            this.props.close()
        }
    };
    render() {
        let vtypes = null;
    
            vtypes = (
                this.state.userTypes.map((type, index) => {
                    return <MenuItem
                        value={type[0]}
                        key={index}

                    >{type[1]}

                    </MenuItem>
                })
            );
        
        const { classes } = this.props;
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <React.Fragment>
                <form onSubmit={(event) => { this.sumbitHandler(event) }}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Full Name"
                                name="name"
                                id="name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                onChange={this.handleChange}
                                value={this.state.name}
                                inputProps={{
                                    placeholder: "required",
                                    value: this.state.name
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Username"
                                name="username"
                                id="username"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                onChange={this.handleChange}
                                inputProps={{
                                    placeholder: "required",
                                    value: this.state.username
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="user_type_id">User types</InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    value={this.state.user_type_id}
                                    onChange={this.handleSimple}

                                    inputProps={{
                                        name: 'user_type_id',
                                        id: "user_type_id",
                                    }}
                                >
                                    {vtypes}
                                </Select>
                            </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Password"
                                name="password"
                                id="password"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                onChange={this.handleChange}
                                inputProps={{
                                    placeholder: "required",
                                    type: "password",
                                    value: this.state.password
                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    <GridContainer >
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="is_admin"> Admin</InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    value={this.state.is_admin}
                                    onChange={this.handleSimpleAdmin}

                                    inputProps={{
                                        name: 'is_admin',
                                        id: "is_admin",
                                    }}
                                >
                                    <MenuItem value="Y">
                                        Yes
                                    </MenuItem>
                                    <MenuItem value="N">
                                        No
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>


                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="active_fl"> Active</InputLabel>
                                <Select
                                    MenuProps={{
                                        className: classes.selectMenu
                                    }}
                                    value={this.state.active_fl}
                                    onChange={this.handleSimpleActive}

                                    inputProps={{
                                        name: 'active_fl',
                                        id: "active_fl",
                                    }}
                                >
                                    <MenuItem value="Y">
                                        Yes
                    </MenuItem>
                                    <MenuItem value="N">
                                        No
                    </MenuItem>
                                </Select>
                            </FormControl>
                        </GridItem>
                    </GridContainer>
                    <Button color="youtube" type="submit" type="submit" >
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

export default withStyles(regularFormsStyle)(UserEditForm);