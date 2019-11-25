import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinkedCamera from "@material-ui/icons/LinkedCamera";




// core components
import Button from "components/CustomButtons/Button.jsx";

import ImageDisplayer from './ImageDisplayer';

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class ImageDialog extends React.Component {
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
                    color="danger"
                    onClick={this.handleClickOpen}
                    customClass="remove">
                    <LinkedCamera />
                </Button>{" "}
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit this inventory</DialogTitle>
                    <DialogContent>
                        <ImageDisplayer close={this.handleClose} item={this.props.item} />
                    </DialogContent>
                </Dialog>
            </div >
        );
    }
}

export default withStyles(regularFormsStyle)(ImageDialog);