import { useState } from 'react';

const SearchForm = ({onSearch}) => {
  const [searchStr, setSearchStr] = useState('');
  const [searchOption, setSearchOption] = useState('shows');

//components life cycle
//1.mounts
//2.rendered
//2.5 logic before next render 
//3.unmount

//useeffect run always once no matter

  const onSearchInputChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSubmit=(ev)=>{
    ev.preventDefault()
    const options={
      q:searchStr,
      searchOption
    }
    onSearch(options)
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={searchStr} onChange={onSearchInputChange} />

      <label>
        Shows
        <input
          type="radio"
          name="search-option"
          value="shows"
          checked={searchOption === 'shows'}
          onChange={onRadioChange}
        ></input>
      </label>

      <label>
        Actors
        <input
          type="radio"
          name="search-option"
          value="actors"
          checked={searchOption === 'actors'}
          onChange={onRadioChange}
        ></input>
      </label>

      <button type="submit">Search</button>
    </form>
  );

};
export default SearchForm;

