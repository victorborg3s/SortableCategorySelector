import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SortableCategorySelector from './SortableCategorySelector';

configure({ adapter: new Adapter() });

describe('<SortableCategorySelector />', () => {
  it('should allow set an array of objects representing all elements', () => {
    const groupElements = [
      { id: 1, name: 'Tickets em aberto' },
      { id: 2, name: 'Todos os Tickets' },
    ];
    const wrapper = mount(<SortableCategorySelector allElements={groupElements} />);
    expect(wrapper.props().allElements).to.equal(groupElements);
    expect(wrapper.text().includes(groupElements[1].name)).to.equal(true);
  });

  it('should allow select an element by clicking it', () => {});

  it('should allow reorder elements', () => {});

  it('should allow shrink', () => {});
});
