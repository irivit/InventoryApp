import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import FormErrors from './FormErrors';

// Import API
import API from "../../utils/API";
import { Redirect } from "react-router-dom";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      type_name: '',
      formErrors: { name: '' },
      nameValid: false,
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
  validateField(value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;

    if(nameValid = value.length >= 0)
        fieldValidationErrors.name = nameValid ? '' : ' Invalid type field';
    
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid});
  }
 
  componentDidMount() {
    if (this.props.user_type) {
      API.getUserType(this.props.user_type.User_type_id).then(res => {
        this.setState(res.data[0])
    })
  }
  
}

sumbitHandler = event => {
  event.preventDefault();
  if (!this.props.user_type) {
    API.postUserType({
      type_name: this.state.type_name,
    })
      .then(res => {
        this.props.afterSubmit();
        if (res.data.id) {
          this.setState({ redirect: true });
        }
        this.setState({ type_name: '' });
      })
      .catch(err =>
        this.setState({ errorMessage: "System fail posting the User type" + err.toString() })
      );
  } else {
    API.updateUserType({
      "user_type_id": this.props.user_type.User_type_id,
      "type_name": this.state.type_name
    }).then(res => {
      this.props.afterSubmit();
    }).catch(err =>
      console.log(err)
    );
  }
  if (this.props.close) {
    this.props.close()
  }
};
render() {
  if (this.state.redirect) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <React.Fragment>
    <form onSubmit={(event) => { this.sumbitHandler(event) }}>
      <CustomInput
        labelText="User type"
        name="type_name"
        id="type_name"
        formControlProps={{
          fullWidth: true
        }}
        onChange={this.handleChange}
        inputProps={{
          placeholder: "required",
          value: this.state.type_name
        }}
      />
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

export default withStyles(regularFormsStyle)(UserForm);