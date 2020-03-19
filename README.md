A [clauderic's react-sortable-hoc](https://github.com/facebook/create-react-app) based component that can be used to filter list elements.

The component `SortableCategorySelector` is in `/src/SortableCategorySelector/`.

Sample code
```javascript
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
´´´
