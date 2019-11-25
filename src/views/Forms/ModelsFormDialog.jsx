import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Edit from "@material-ui/icons/Edit";

// core components
import Button from "components/CustomButtons/Button.jsx";

//Form
import ModelsForm from "./ModelsForm";


import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class ModelsFormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          justIcon
          round
          simple
          onClick={this.handleClickOpen}
          color="danger"
          customClass="edit">
          <Edit />
        </Button>{" "}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit this model</DialogTitle>
          <DialogContent>
            <ModelsForm close={this.handleClose} model={this.props.model} afterSubmit={this.props.afterSubmit} />
          </DialogContent>
        </Dialog>  
      </div >
    );
  }
}

export default withStyles(regularFormsStyle)(ModelsFormDialog);

