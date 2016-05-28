import React, { Component } from 'react';

export class InputArea extends Component {
  constructor (props) {
    super(props);
  }

    render () {
      return <input onSubmit={this.props.handleSubmit}/>;
    }
}

InputArea.PropTypes = {
  handleSubmit: React.PropTypes.func.isRequired
};
