import { useQuery } from '@tanstack/react-query';
import { getShowsByIds } from '../api/tvmaze';
import { useStarredShows } from '../lib/useStarredShows';
import ShowGrid from '../components/shows/ShowGrid';
import { TextCenter } from '../components/common/TextCenter';

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

  if (starredShows?.length === 0) {
    return <TextCenter>No shows were starred</TextCenter>;
  }

  if (starredShows?.length > 0) {
    return <ShowGrid shows={starredShows} />;
  }

  if (starredShowsError) {
    return <TextCenter>Error Occured:{starredShowsError.message}</TextCenter>;
  }

  return <TextCenter>Shows are loading</TextCenter>;
};
export default Starred;
