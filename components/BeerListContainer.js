import React, { Component } from 'react';
import { InputArea } from './InputArea';
import { BeerList } from './BeerList';

const BEER_LIST = [
  'Presidente',
  'Bohemia',
  'Bhrama',
  'Quisqueya'
];

export class BeerListContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {beers: []};
  }

  Add (beer) {
    var beerList = this.state.beers;

    typeof beer === 'array' ? beerList.concat(beer) : beerList.push(beer);

    this.setState(
      {beers : beerList}
    );
  }

  render () {
    var beers = this.state.beers;

    return (
      <div>
        <InputArea handleSubmit={this.Add} />
        <BeerList beerList={beers} />
      </div>
    );
  }
};
