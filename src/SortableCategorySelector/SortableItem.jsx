import React from 'react';
import { SortableElement, sortableHandle } from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const DragHandle = sortableHandle(() => (
  <span className="handler cursorMove d-inline align-middle ml-2 mr-2">
    <FontAwesomeIcon icon={faEllipsisV} />
    <FontAwesomeIcon icon={faEllipsisV} />
  </span>
));

const SortableItem = SortableElement(
  ({
    value,
    onItemClick,
    onItemDeleteClick,
    onItemEditClick,
    selectedElement,
  }) => (
    <li
      className={`list-group-item p-0 noselect ${
        selectedElement && selectedElement.id === value.id
          ? 'selected'
          : 'deselected'
      }`}
    >
      <div
        tabIndex={0}
        role="menuitem"
        onKeyDown={(e) => {
          if (e.keyCode === 69 && e.ctrlKey) {
            onItemClick(value);
          }
        }}
        className="btn d-inline text-left float-left clearfix w-100 h-100"
        onClick={() => {
          onItemClick(value);
        }}
      >
        <div className="d-inline-block mt-1">
          <DragHandle />
          <span>{value.name}</span>
        </div>
        <div className="float-right">
          {onItemDeleteClick ? (
            <button
              type="button"
              className="btn btn-link btn-sm mr-1"
              onClick={(e) => {
                e.stopPropagation();
                onItemDeleteClick(value);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          ) : (
            ''
          )}
          {onItemEditClick ? (
            <button
              type="button"
              className="btn btn-link btn-sm mr-1"
              onClick={(e) => {
                e.stopPropagation();
                onItemEditClick(value);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          ) : (
            ''
          )}
          <div className="float-right mt-1">
            <span
              className={`badge align-middle float-right mt-1 badge-${value.category}`}
            >
              {value.quantity}
            </span>
          </div>
        </div>
      </div>
    </li>
  ),
);

export default SortableItem;
