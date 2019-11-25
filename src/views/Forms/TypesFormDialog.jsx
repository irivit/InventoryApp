import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Edit from "@material-ui/icons/Edit";

// core components
import Button from "components/CustomButtons/Button.jsx";



import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import TypesForm from "./TypesForm";

class TypesFormDialog extends React.Component {
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
          <DialogTitle id="form-dialog-title">Edit this inventory type</DialogTitle>
          <DialogContent>
            <TypesForm close={this.handleClose} type={this.props.type} afterSubmit={this.props.afterSubmit} />
          </DialogContent>
        </Dialog>
      </div >
    );
  }
}

export default withStyles(regularFormsStyle)(TypesFormDialog);