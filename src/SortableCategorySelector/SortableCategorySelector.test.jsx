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
    const elements = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
    ];
    // Act
    const wrapper = mount(
      <SortableCategorySelector elements={elements} />,
    );
    // Assert
    expect(wrapper.props().elements).toEqual(elements);
    expect(wrapper.text().includes(elements[0].name)).toEqual(true);
    expect(wrapper.text().includes(elements[1].name)).toEqual(true);
  });

  it('should allow set an label', () => {
    // Arrange
    const label = 'aLabel';
    const elements = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
    ];
    // Act
    const wrapper = mount(
      <SortableCategorySelector elements={elements} label={label} />,
    );
    // Assert
    expect(wrapper.props().label).toEqual(label);
    expect(wrapper.text().includes(label)).toEqual(true);
  });

  it('should allow select an element', () => {
    // Arrange
    const testState = {
      selectedElement: null,
      elements: [
        { id: 1, name: 'Element 1' },
        { id: 2, name: 'Element 2' },
      ],
    };
    const elementToSelect = testState.elements[0];
    const onSelectElement = (element) => {
      testState.selectedElement = element;
    };
    const wrapper = mount(
      <SortableCategorySelector
        elements={testState.elements}
        onItemSelect={onSelectElement}
        selectedElement={testState.selectedElement}
      />,
    );
    // Act
    wrapper.prop('onItemSelect')(elementToSelect);
    wrapper.setProps({ selectedElement: testState.selectedElement });
    wrapper.update();
    // Assert
    expect(testState.selectedElement).toEqual(elementToSelect);
    expect(wrapper.props().selectedElement).toEqual(elementToSelect);
  });

  it('should allow delete an element', () => {
    // Arrange
    const elements = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
      { id: 3, name: 'Element 3' },
      { id: 4, name: 'Element 4' },
    ];
    const elementToDelete = elements[1];
    let elementDeleted = null;
    const deleteElement = (element) => {
      elementDeleted = element;
    };
    const wrapper = mount(
      <SortableCategorySelector elements={elements} onItemDeleteClick={deleteElement} />,
    );
    // Act
    wrapper.prop('onItemDeleteClick')(elementToDelete);
    // Assert
    expect(elementDeleted).toBe(elementToDelete);
  });

  it('should allow edit an element', () => {
    // Arrange
    const elements = [
      { id: 1, name: 'Element 1' },
      { id: 2, name: 'Element 2' },
      { id: 3, name: 'Element 3' },
      { id: 4, name: 'Element 4' },
    ];
    const elementToEdit = elements[2];
    let elementEdited = null;
    const editElement = (element) => {
      elementEdited = element;
    };
    const wrapper = mount(
      <SortableCategorySelector elements={elements} onItemEditClick={editElement} />,
    );
    // Act
    wrapper.prop('onItemEditClick')(elementToEdit);
    // Assert
    expect(elementEdited).toBe(elementToEdit);
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
      <SortableCategorySelector elements={elements} onItemSort={onSort} />,
    );
    // Act
    wrapper.prop('onItemSort')(elementToMoveIndex, elementToMoveEndingPosition);
    // Assert
    expect(elements[elementToMoveEndingPosition].id).toEqual(elementToMove.id);
  });

  it('should ...', () => {});
});
