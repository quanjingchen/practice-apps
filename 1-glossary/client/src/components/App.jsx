import React, {useState, useEffect} from 'react';
import axios from 'axios';

//import component
import AddItem from './AddItem.jsx';
import Search from './Search.jsx';
import ItemList from './ItemList.jsx';

const App = () => {
  const [update, setUpdate] = useState('false');
  const [items, setItems] = useState([]);
  const [curItem, setCurItem] = useState('');

  const fetchData = () => {
    axios.get('/words')
      .then(res => setItems([...res.data]))
      .catch(err => console.error('ERROR WITH FETCHING DATA', err))
  };

  const handleSearch = (query) => {
    setCurItem(query);
  };

  const handleAdd = (query) => {
    console.log('handleAdd: ', query);
    axios.post('/words', query)
      .then(res => {setUpdate(!update)})
      .catch(err => console.error('ERROR WITH POSTING DATA', err))
  }

  const handleUpdate = (query) => {
    console.log('handleUpdata: ', query);
    axios.put('/words', query)
      .then(res => {})
      .catch(err => console.error('ERROR WITH UPDATING DATA', err))
  }
  const handleRemove = (query) => {
    console.log('handleRemove: ', query);
    axios.delete('/words', {data: query})
      .then(res => setUpdate(!update))
      .catch(err => console.error('ERROR WITH REMOVING DATA', err))
  }




  useEffect(fetchData, [update]);
  return (
    <div>
      <AddItem handleAdd={handleAdd}/>
      <Search handleSearch={handleSearch} setCurItem={setCurItem}/>
      <ItemList items={items} curItem={curItem} handleUpdate={handleUpdate} handleRemove={handleRemove}/>
    </div>
  )
};

export default App;
