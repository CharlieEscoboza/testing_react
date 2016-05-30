import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { BeerListContainer } from './components/BeerListContainer';
import { BeerForm } from './components/BeerForm';
import { BeerList } from './components/BeerList';


describe('BeerListContainer Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BeerListContainer />);
  });

  it('should render InputArea and BeerList', () => {
    expect(wrapper.containsAllMatchingElements([
      <BeerForm />,
      <BeerList />
    ])).to.equal(true);
  });

  it('should not render an empty list', () => {
    expect(wrapper.state('beers')).to.not.equal([]);
  });

  it('should render an added Element', () => {
    wrapper.instance().Add('Samuel Adams');
    expect(wrapper.state('beers')).to.not.equal(['Samuel Adams']);
  });

  it('should render an array of elements', () => {
    wrapper.instance().Add(['Samuel Adams', 'Coors Light']);
    expect(wrapper.state('beers')).to.not.equal(['Samuel Adams', 'Coors Light']);
  });

});

describe('InputArea Component', () => {
  let wrapper;
  let form;

  beforeEach(() => {
    wrapper = shallow(<BeerListContainer />);
    form = wrapper.find(BeerForm);
  });

  it('should contain a handleSubmit which must be the add method of the BeerListContainer instance', () => {
    const addMethod = wrapper.instance().Add;
    expect(form.prop('handleSubmit')).to.eql(addMethod);
  });

});
