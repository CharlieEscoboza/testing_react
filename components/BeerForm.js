import React, { Component } from 'react';

export class BeerForm extends Component {
  constructor (props) {
    super(props);
    this.state = {beerName: ''};
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange (e) {
    this.setState({
      beerName: e.target.value
    });
  }

  _handleSubmit () {
    var beerName = this.state.beerName;
    this.props.handleSubmit(beerName);
  }

  render () {
    return (
      <div>
        <input name="beer" value={this.state.beerName} onChange={this._handleChange} />
        <button onClick={this._handleSubmit} dangerouslySetInnerHTML={{__html: "Add Beer"}} />
      </div>
    );
  }
}

BeerForm.PropTypes = {
  handleSubmit: React.PropTypes.func.isRequired
};
