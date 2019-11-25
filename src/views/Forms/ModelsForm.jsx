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

class ModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      model_name: "",
      type_id: '',
      showTypes: true,
      types: [],
      formErrors: { name: '' },
      nameValid: false,
      formValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSimple = this.handleSimple.bind(this);

  }
  handleChange(event) {
    const name = event.target.getAttribute("id");
    const value = event.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  

  };

  handleSimple(event) {
    this.setState({ type_id: event.target.value });
 
  };
  validateField(value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;

  

    if (nameValid = value.length >= 0)
      fieldValidationErrors.name = nameValid ? '' : ' Invalid type field';

    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid });
  }


  componentDidMount() {
    API.getAllTypes().then(response => {
      const rows = response.data.map(dataValue => {
        let dataRow = [];
        for (let key in dataValue) {
          dataRow.push(dataValue[key]);
        }
        return dataRow;
      });
      this.setState({ types: rows });
      if (this.state.types.length === 0) {
        this.setState({ showTypes: false });
      }
    });
    if (this.props.model) {
      API.getModel(this.props.model.Model_id).then(res => {
        this.setState(res.data[0])

      })

    }
  }


  sumbitHandler = event => {
    event.preventDefault();
    if (!this.props.model) {
  
      API.postModel({
        model_name: this.state.model_name,
        type_id: this.state.type_id
      })
        .then(res => {
   
          if (res.data.id) {
            this.setState({ redirect: true });
          }
          this.setState({
            model_name: "",
            type_id: '',
          })
 
          this.props.afterSubmit();
        })
        .catch(err => {
          console.log(err);
  
        }
        );
    } else {
      API.updateModel({
        "model_id": this.props.model.Model_id,
        "model_name": this.state.model_name,
        "type_id": this.state.type_id,
        "edited_id": 0
      }).then(res => {
       
        this.props.afterSubmit();
      }).catch(err =>
        console.log(err)
      )
    }
    if (this.props.close) {
      this.props.close()
    }
  };
  render() {
    let vtypes = null;

    if (this.state.showTypes) {
      vtypes = (
        this.state.types.map((type, index) => {
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
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Model Name"
                name="model_name"
                id="model_name"
                formControlProps={{
                  fullWidth: true
                }}
                onChange={this.handleChange}
                inputProps={{
                  placeholder: "required",
                  value: this.state.model_name
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <FormControl fullWidth >

                <InputLabel htmlFor="type_id"> Type</InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={this.state.type_id}
                  onChange={this.handleSimple}

                  inputProps={{
                    name: 'type_id',
                    id: "type_id",
                  }}
                >
                  {vtypes}
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
}

export default withStyles(regularFormsStyle)(ModelForm);