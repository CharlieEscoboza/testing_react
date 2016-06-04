import React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { BeerListContainer } from './components/BeerListContainer';
import { BeerForm } from './components/BeerForm';
import { BeerList } from './components/BeerList';


describe('BeerListContainer Component', () => {

  it('should render InputArea and BeerList', () => {
    let wrapper = shallow(<BeerListContainer />);
    expect(wrapper.containsAllMatchingElements([
      <BeerForm />,
      <BeerList />
    ])).to.equal(true);
  });

  it('should not render an empty list', () => {
    let wrapper = shallow(<BeerListContainer />);
    expect(wrapper.state('beers')).to.not.equal([]);
  });

  it('should updates the state with a single element', () => {
    let wrapper = shallow(<BeerListContainer />);
    wrapper.instance().Add('Samuel Adams');
    expect(wrapper.state('beers')).to.not.equal(['Samuel Adams']);
  });

  it('should render an list of elements', () => {
    let wrapper = mount(<BeerListContainer />);
    wrapper.instance().Add('Samuel Adams');
    wrapper.instance().Add('Coors Light');
    expect(wrapper.find('li').length).to.equal(2);
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

describe('BeerList Component', () => {

  it('should not render if no items', () => {
    let items = [];
    let list = shallow(<BeerList beerList={items} />);
    expect(list.node).to.be.null;
  });

  it('should not render if undefined is pass as items', () => {
    let items = undefined;
    let list = shallow(<BeerList beerList={items} />);
    expect(list.node).to.be.null;
  });

  it('should render if items', () => {
    let items = ['BeerTest'];
    let list = shallow(<BeerList beerList={items} />);
    expect(list.node).to.not.be.null;
    expect(list.node.props.children.length).to.equal(1);
  });
});
