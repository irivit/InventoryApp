import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


// core components
import Button from "components/CustomButtons/Button.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Edit from "@material-ui/icons/Edit";


import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import UserTypeForm from "./UserTypeForm";

class UserTypeFormDialog extends React.Component {
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
          <DialogTitle id="form-dialog-title">Edit this User</DialogTitle>
          <DialogContent>
            <UserTypeForm close={this.handleClose} user_type={this.props.user_type} afterSubmit={this.props.afterSubmit}/>
          </DialogContent>
        </Dialog>
      </div >
    );
  }
}

export default withStyles(regularFormsStyle)(UserTypeFormDialog);