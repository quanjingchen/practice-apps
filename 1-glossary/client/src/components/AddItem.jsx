import React, {useState} from 'react';
const AddItem = ({ handleAdd }) => {
  const [newItem, setNewItem] = useState({name: '', definition: ''});
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(newItem);
    setNewItem({name: '', definition: ''});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setNewItem({...newItem, name:e.target.value})} type='text' name='name' value={newItem.name} placeholder='enter word'/>
      <input onChange={(e) => setNewItem({...newItem, definition:e.target.value})} type='text' name='definition' value={newItem.definition} placeholder='enter definition'/>
      <button>Add</button>
    </form>
  )
};

export default AddItem;