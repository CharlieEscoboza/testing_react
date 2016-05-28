import React, { Component } from 'react';

export class BeerList extends Component {
  constructor (props) {
    super(props);
  }

  render () {
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
