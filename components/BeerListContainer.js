import React, { Component } from 'react';
import { BeerForm } from './BeerForm';
import { BeerList } from './BeerList';

// This was add for testing proposes
// const BEER_LIST = [
//   'Presidente',
//   'Bohemia',
//   'Bhrama',
//   'Quisqueya'
// ];

export class BeerListContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {beers: []};
    this.Add = this.Add.bind(this);
  }

  Add (beer) {
    var beerList = this.state.beers;

    beerList.push(beer);

    this.setState({
      beers : beerList
    });
  }

  render () {
    var beers = this.state.beers;

    return (
      <div>
        <BeerForm handleSubmit={this.Add} />
        <BeerList beerList={beers} />
      </div>
    );
  }
};
