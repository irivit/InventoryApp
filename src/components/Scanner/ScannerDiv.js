import React, { Component } from "react";
import Results from "./Results";
import Scanner from "./Scanner";
import Button from "components/CustomButtons/Button.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      serial_number: ""
    };
    this._scan = this._scan.bind(this);
    this._onDetected = this._onDetected.bind(this);
    this._onProcessed = this._onProcessed.bind(this);
  }


  _scan() {
    this.setState({ scanning: !this.state.scanning });
  }

  _onProcessed(result) {
    return;
  }

  _onDetected(result) {

    result = result.codeResult.code;
    console.log('dentro de detect'+result);

    this.props.getSerial(result);
  }
  render() {


    return (
      <div>
        <Button color="youtube" onClick={this._scan}>
          {this.state.scanning ? "Stop" : "Scan serial number"}
        </Button>

        {this.state.scanning ? <Scanner onDetected={(result) => this._onDetected(result)} /> : null}
      </div>
    );
  }
}

