import { useStarredShows } from "../lib/useStarredShows";

const Starred = () => {
  const [starredShow] = useStarredShows()

  return <div>Starred page, starred {starredShow.length}</div>;
};
export default Starred;
