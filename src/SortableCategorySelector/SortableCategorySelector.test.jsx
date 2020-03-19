import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SortableCategorySelector from './SortableCategorySelector';

configure({ adapter: new Adapter() });

describe('<SortableCategorySelector />', () => {
  it('should allow set an array of objects representing all elements', () => {
    const groupElements = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
    ];
    const wrapper = mount(
      <SortableCategorySelector elements={groupElements} />,
    );
    expect(wrapper.props().elements).to.equal(groupElements);
    expect(wrapper.text().includes(groupElements[1].name)).to.equal(true);
  });

  it('should allow select an element by clicking it', () => {
    const groupElements = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
    ];
    const testState = {
      selectedElement: null,
    };
    const onSelectElement = (element) => {
      testState.selectedElement = element;
    };

    const wrapper = mount(
      <SortableCategorySelector
        elements={groupElements}
        onItemSelect={onSelectElement}
      />,
    );

    wrapper.find('li div').first().simulate('click');

    expect(testState.selectedElement).to.equal(groupElements[0]);
  });

  it('should allow reorder elements', () => {});

  it('should allow shrink', () => {});
});
