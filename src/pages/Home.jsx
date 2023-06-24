import { useState } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import SearchForm from '../components/SearchForm'

const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);

  

  const onSearch = async({q, searchOption})=> {

    try {
      setApiDataError(null);

      let result

      if (searchOption == 'shows') {
        result = await searchForShows(q);
      } else {
        result = await searchForPeople(q);
      }
      setApiData(result);

    } catch (error) {
      setApiDataError(error);
    }

  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Ocuured:{apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData[0].show
        ? apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        : apiData.map(data => (
            <div key={data.person.id}>{data.person.name}</div>
          ));
    }
    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch}/>
      {/* <form onSubmit={onSearch}>
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
      </form> */}
      <div>{renderApiData()}</div>
    </div>
  );
};
export default Home;
