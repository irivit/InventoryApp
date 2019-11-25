import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";


// core components
import Button from "components/CustomButtons/Button.jsx";


import API from "../../utils/API";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class ImageDisplayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            image: false
        };
    }

    componentDidMount() {
        API.getImg(this.props.item.Item_id).then(() => {
            this.setState({ image: true });
        }).catch(err =>
            console.log(err)
        );
    }



    delete = () => {
        API.deleteImg(this.props.item.Item_id).then(
            this.setState({ image: false })
        ).catch(err =>{
            console.log(err)
        })
    }

    handlefileselect = event => {
        const file = event.target.files[0];
        const fd = new FormData();
        fd.append("image", file, file.name);
        API.postImg(this.props.item.Item_id, fd)
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const { classes } = this.props;

        return (
            
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Put your image here"
                        className={classes.media}
                        height="400"
                        width="400"
                        image={ this.state.image ?`https://opsdev.eogresources.com/InventoryTest-Api/Item/Photo?item_id=${this.props.item.Item_id}`: "./Placeholder.png"}
              
                    title="Put your image here"
                />
                    </CardActionArea>
                <CardActions>
                    <form>
                        <FormControl className={classes.formControl}>
                            <Input
                                type="file"
                                onChange={this.handlefileselect}
                                id="fileselect"
                            />
                        </FormControl>
                        <br />
                        <br />
                        <Button
                            color="twitter"
                            onClick={event => {
                                this.props.close();
                            }}
                        >
                            Submit
                    </Button>
                        <Button
                            color="danger"
                            onClick={event => {
                                this.delete()
                            }}
                        >
                            Delete
                    </Button>
                    </form>
                </CardActions>
            </Card>

        );
    }
}
export default withStyles(regularFormsStyle)(ImageDisplayer);