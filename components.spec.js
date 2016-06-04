import React from 'react';
import { spy } from 'sinon';
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

describe('BeerForm Component', () => {

  it('should contains a handleSubmit which must be the add method of the BeerListContainer instance', () => {
    let wrapper = shallow(<BeerListContainer />);
    let form = wrapper.find(BeerForm);
    let addMethod = wrapper.instance().Add;
    expect(form.prop('handleSubmit')).to.eql(addMethod);
  });

  it('should contains input and button elements', () => {
    let wrapper = shallow(<BeerListContainer />);
    let form = wrapper.find(BeerForm);

    expect(form.containsAllMatchingElements([
      <input />,
      <button dangerouslySetInnerHTML={{__html: "Add Beer"}} />
    ]));
  });

  it('should updates beerForm component state when input change', () => {
    let form = shallow(<BeerForm />);
    let input = form.find('input');
    input.simulate('change', { target: { value: 'BeerTest'}});
    expect(form.state('beerName')).to.equal('BeerTest');
  });

  it('should calls the prop handleSubmit callback with the current component state', () => {
    let addItemSpy = spy();
    let form = shallow(<BeerForm handleSubmit={addItemSpy}/>);
    let button = form.find('button');
    form.setState({beerName: 'BeerTest'});
    button.simulate('click');
    expect(addItemSpy.calledOnce).to.equal(true);
    expect(addItemSpy.calledWith('BeerTest')).to.equal(true);
  });
});
