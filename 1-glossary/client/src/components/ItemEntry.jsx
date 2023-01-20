import React, { useState } from 'react';


const ItemEntry = ({ item,  handleUpdate, handleRemove}) => {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [content, setContent] = useState(item.definition);

  const handleBlur = () => {
    handleUpdate({...item, definition: content});
  };

  const handleDeleting = () => {
    handleRemove(item);
  };

  return (

    <tr>
      <td>
        <h4>{item.name}</h4>
        <button onClick={() => setEditing(!editing)}>{editing ? 'back' : 'edit'}</button>
        <button onClick={handleDeleting}>delete</button>

        {editing ?  <textarea type='text' name='definition' value={content} onChange={ e => setContent(e.target.value) } onBlur={handleBlur}/>: <p>{content}</p>}
      </td>
    </tr>
  )
}

export default ItemEntry;