import React, { useState } from 'react';
import arrayMove from 'array-move';

import OrderableCategorySelector from './SortableCategorySelector';

function App() {
  const [elements, setElements] = useState([
    {
      id: 1,
      name: 'Goalkeeper',
      quantity: 1102,
      category: 'primary',
    },
    {
      id: 2,
      name: 'Right Fullback',
      quantity: 15,
      category: 'secondary',
    },
    {
      id: 3,
      name: 'Left Fullback',
      quantity: 85,
      category: 'success',
    },
    {
      id: 4,
      name: 'Center Back (or Sweeper)',
      quantity: 85,
      category: 'danger',
    },
    {
      id: 5,
      name: 'Defending/Holding Midfielder',
      quantity: 85,
      category: 'info',
    },
    {
      id: 6,
      name: 'Right Midfielder/Winger',
      quantity: 85,
      category: 'light',
    },
    {
      id: 7,
      name: 'Central/Box-to-Box Midfielder',
      quantity: 85,
      category: 'dark',
    },
  ]);

  const [message, setMessage] = useState('nothing (yet)');
  const [selectedElement, setSelectedElement] = useState(null);

  function onSort(oldIndex, newIndex) {
    setElements(arrayMove(elements, oldIndex, newIndex));
  }

  return (
    <div>
      <OrderableCategorySelector
        onSort={onSort}
        elements={elements}
        label="Soccer Players"
        onItemSelect={(element) => {
          setSelectedElement(element);
          setMessage(`Category ${element.name} selected`);
        }}
        onItemDeleteClick={(element) => {
          setMessage(`Category ${element.name} 'deleted'`);
        }}
        onItemEditClick={(element) => {
          setMessage(`Category ${element.name} 'edited'`);
        }}
        selectedElement={selectedElement}
      />
      <div className="ml-4 mt-4">
        <span>
          <b>What&apos;s happening:</b> {message}
        </span>
      </div>
    </div>
  );
}

export default App;
