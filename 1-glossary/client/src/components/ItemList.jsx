import React from 'react';
import ItemEntry from './ItemEntry.jsx';


const ItemList = ({ items, curItem, handleUpdate, handleRemove }) => {

  const filterItems = items.filter(item => {
    if (curItem === '') {
      return true;
    } else {
      return item.name.toLowerCase().includes(curItem.toLowerCase());
    }
  });

  return (
    <table>
      <tbody>
        {filterItems.map(item => {
          return <ItemEntry key={item._id} item={item} handleUpdate={handleUpdate} handleRemove={handleRemove} />
        })}
      </tbody>
    </table>
  )
}

export default ItemList;
