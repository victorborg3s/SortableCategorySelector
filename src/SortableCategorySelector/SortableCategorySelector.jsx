import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { sortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import SortableItem from './SortableItem';
import './SortableCategorySelector.css';

const propTypes = {
  elements: PropTypes.array.isRequired,
  label: PropTypes.string,
  onItemSelect: PropTypes.func,
  onItemDeleteClick: PropTypes.func,
  onItemEditClick: PropTypes.func,
  selectedElement: PropTypes.object,
};

const defaultProps = {
  label: '',
  onItemSelect: () => {},
  onItemDeleteClick: null,
  onItemEditClick: null,
  selectedElement: null,
};

const SortableContainer = sortableContainer(({ children }) => (
  <ul className="list-group">{children}</ul>
));

function SortableCategorySelector({
  elements,
  label,
  onItemSelect,
  onItemDeleteClick,
  onItemEditClick,
  overridePointerEvents,
  selectedElement,
}) {
  const [items, setItems] = useState([...elements]);
  const [isOpen, setIsOpen] = useState(true);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="shadow-sm rounded tool-box">
      <Collapsible
        open
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        trigger={
          <div className="cursor-pointer">
            <FontAwesomeIcon className="m-1" icon={isOpen ? faMinus : faPlus} />
            <h3 className="d-inline">{label}</h3>
          </div>
        }
      >
        <div>
          <SortableContainer
            helperClass={
              overridePointerEvents
                ? 'SortableHelperWithOverride'
                : 'SortableHelper'
            }
            onSortEnd={onSortEnd}
            useDragHandle
          >
            {items.map((value, index) => (
              <SortableItem
                key={`item-${value.id}`}
                onItemClick={onItemSelect}
                onItemDeleteClick={onItemDeleteClick}
                onItemEditClick={onItemEditClick}
                index={index}
                value={value}
                selectedElement={selectedElement}
              />
            ))}
          </SortableContainer>
        </div>
      </Collapsible>
    </div>
  );
}

SortableCategorySelector.defaultProps = defaultProps;

SortableCategorySelector.propTypes = propTypes;

export default SortableCategorySelector;
