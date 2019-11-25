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
import ItemEditForm from "./ItemEditForm";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class UserFormDialog extends React.Component {
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
    const { fullScreen } = this.props;
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
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit this inventory</DialogTitle>
          <DialogContent>
            <ItemEditForm close={this.handleClose} item={this.props.item} afterSubmit={this.props.afterSubmit} />
          </DialogContent>
        </Dialog>
      </div >
    );
  }
}

export default withStyles(regularFormsStyle)(UserFormDialog);