import React, {useState} from 'react';

const SearchBar = ({onSearch}) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div id='searchBar'>
      <input type="text" placeholder="Rechercher un sport ou un lieu" value={search} onChange={handleInputChange} />
    </div>
  );
}

export default SearchBar;