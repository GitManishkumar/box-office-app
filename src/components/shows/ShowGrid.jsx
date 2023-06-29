import ShowCard from './ShowCard';
import {useStarredShows} from '../../lib/useStarredShows'
import {FlexGrid} from '../common/FlexGrid'
import NotFoundImage from '../../lib/Not Found Image.png';



const ShowGrid = ({ shows }) => {

const [starredShow, dispatchStarred] = useStarredShows()


  const onStarMeClick = showId => {
    const isStarred = starredShow.includes(showId);

    if (isStarred) {
      dispatchStarred({ type: 'UNSTAR', showId });
    } else {
      dispatchStarred({ type: 'STAR', showId });
    }
  };

  return (
    <FlexGrid>
      {shows.map(data => (
        <ShowCard
          key={data.show.id}
          id={data.show.id}
          name={data.show.name}
          image={
            data.show.image ? data.show.image.medium : NotFoundImage
          }
          summary={data.show.summary}
          onStarMeClick={onStarMeClick}
          isStarred={starredShow.includes(data.show.id)}
        />
      ))}
    </FlexGrid>
  );
};
export default ShowGrid;
