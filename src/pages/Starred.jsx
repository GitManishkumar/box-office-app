import { useQuery } from '@tanstack/react-query';
import { getShowsByIds } from '../api/tvmaze';
import { useStarredShows } from '../lib/useStarredShows';
import ShowGrid from '../components/shows/ShowGrid';

const Starred = () => {
  const [starredShowIds] = useStarredShows();

  const { data: starredShows, error: starredShowsError } = useQuery({
    queryKey: ['starred', starredShowIds],
    queryFn: () =>
      getShowsByIds(starredShowIds).then(result =>
        result.map(show => ({ show }))
      ),
    refetchOnWindowFocus: false,
  });

  if (starredShows?.length===0) {
    return <div>No shows were starred</div>
  }

  if (starredShows?.length>0) {
    return <ShowGrid shows={starredShows} />;
  }

  if (starredShowsError) {
    return <div>Error Occured:{starredShowsError.message}</div>
  }

  return <div>Shows are loading</div>;
};
export default Starred;
