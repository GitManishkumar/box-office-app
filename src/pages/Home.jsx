import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';

const Home = () => {

  const [filter, setFilter] = useState(null)

  const { data:apiData, error:apiDataError } = useQuery({
      queryKey: ['search', filter],
      queryFn: () => filter.searchOption==='shows' ? searchForShows(filter.q) : searchForPeople(filter.q),
      enabled: !!filter,
      refetchOnWindowFocus:false
  })



  const onSearch = async ({ q, searchOption }) => {

    setFilter({q, searchOption})

  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error Ocuured:{apiDataError.message}</div>;
    }

    if(apiData?.length===0){
      return <div>No result found</div>
    }

    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }
    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />
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
