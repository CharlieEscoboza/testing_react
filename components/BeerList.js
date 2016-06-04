import React, { Component } from 'react';

export class BeerList extends Component {
  constructor (props) {
    super(props);
  }

  render () {

    if (!this.props.beerList || !this.props.beerList.length) {
      return null;
    }

    var beers = this.props.beerList.map((beer, index)=> {
      return (<li key={index}>{beer}</li>);
    });

    return (
      <ul>
        {beers}
      </ul>
    );
  }
}
