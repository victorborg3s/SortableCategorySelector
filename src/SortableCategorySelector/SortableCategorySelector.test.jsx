import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import arrayMove from 'array-move';
import { configure, mount } from 'enzyme';
import '@testing-library/jest-dom';

import SortableCategorySelector from './SortableCategorySelector';

configure({ adapter: new Adapter() });

describe('<SortableCategorySelector />', () => {
  it('should allow set an array of objects representing all elements', () => {
    // Arrange
    const groupElements = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
    ];
    // Act
    const wrapper = mount(
      <SortableCategorySelector elements={groupElements} />,
    );
    // Assert
    expect(wrapper.props().elements).toEqual(groupElements);
    expect(wrapper.text().includes(groupElements[0].name)).toEqual(true);
    expect(wrapper.text().includes(groupElements[1].name)).toEqual(true);
  });

  it('should allow set an label', () => {
    // Arrange
    const label = 'aLabel';
    const groupElements = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
    ];
    // Act
    const wrapper = mount(
      <SortableCategorySelector elements={groupElements} label={label} />,
    );
    // Assert
    expect(wrapper.props().label).toEqual(label);
    expect(wrapper.text().includes(label)).toEqual(true);
  });

  it('should allow select an element by clicking it', () => {
    // Arrange
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
    // Act
    wrapper
      .find('li div')
      .first()
      .simulate('click');
    // Assert
    expect(testState.selectedElement).toEqual(testState.elements[0]);
  });

  it('should allow reorder elements', () => {
    // Arrange
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
      <SortableCategorySelector elements={elements} onSort={onSort} />,
    );
    // Act
    wrapper.prop('onSort')(elementToMoveIndex, elementToMoveEndingPosition);
    // Assert
    expect(elements[elementToMoveEndingPosition].id).toEqual(elementToMove.id);
  });

  it('should ...', () => {});
});
