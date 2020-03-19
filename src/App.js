import React, { useState } from 'react';
import OrderableCategorySelector from './SortableCategorySelector';

function App() {
  const elements = [
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
  ];

  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <OrderableCategorySelector 
      elements={elements}
      label="Soccer Players"
      onItemSelect={(element) => { 
        setSelectedElement(element);
        console.log(`Category ${element.name} selected`);
      }}
      onItemDeleteClick={(element) => { console.log(`Category ${element.name} 'deleted'`); }}
      onItemEditClick={(element) => { console.log(`Category ${element.name} 'edited'`); }}
      selectedElement={selectedElement}
   />
  );
}

export default App;
