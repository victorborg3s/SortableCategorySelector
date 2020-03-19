import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import arrayMove from 'array-move';
import { configure, mount } from 'enzyme';
import { expect } from 'chai';

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
    const testState = {
      selectedElement: null,
      elements: [
        { id: 1, name: 'Element 1' },
        { id: 2, name: 'Element 2' },
      ],
    };
    const onSelectElement = (element) => {
      testState.selectedElement = element;
    };

    const wrapper = mount(
      <SortableCategorySelector
        elements={testState.elements}
        onItemSelect={onSelectElement}
      />,
    );

    wrapper
      .find('li div')
      .first()
      .simulate('click');

    expect(testState.selectedElement).to.equal(testState.elements[0]);
  });

  it('should allow reorder elements', () => {
    let elements = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
      { id: 3, name: 'Element 3' },
      { id: 4, name: 'Element 4' },
    ];

    const elementToMoveIndex = 0;
    const elementToMoveEndingPosition = 2;
    const elementToMove = elements[elementToMoveIndex];

    const onSort = (oldIndex, newIndex) => {
      elements = arrayMove(elements, oldIndex, newIndex);
    };

    const wrapper = mount(
      <SortableCategorySelector
        elements={elements}
        onSort={onSort}
      />,
    );

    wrapper.prop('onSort')(elementToMoveIndex, elementToMoveEndingPosition);

    expect(elements[elementToMoveEndingPosition].id).to.equal(elementToMove.id);
  });

  it('should allow shrink', () => {});
});
