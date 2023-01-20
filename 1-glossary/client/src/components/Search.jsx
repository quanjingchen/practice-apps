import React, { useState }  from 'react';

const Search = ({handleSearch, setCurItem}) => {
  const [query, setQuery] = useState('');
  const [displaySearch, setDisplaySearch] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='name' value={query} placeholder='enter word' onChange={e => setQuery(e.target.value)}/>
      <button type='submit' onClick={() => {setDisplaySearch(!displaySearch); setCurItem('')}}>{displaySearch ? 'Search' : 'Back'}</button>
    </form>
  )
}

export default Search;