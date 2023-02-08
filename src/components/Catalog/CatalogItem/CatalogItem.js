import { Link } from "react-router-dom";

const CatalogItem = ({ game }) => {
  return (
    <div className="allGames">
      <div className="allGames-info">
        <img src={game.imageUrl} />
        <h6>{game.title}</h6>
        <h2>{game.category}</h2>
        <Link to={`/catalog/${game._id}`} className="details-button">
          Details
        </Link>
        <Link
          style={{ marginLeft: "200px" }}
          to={`/games/${game._id}/edit`}
          className="details-button"
        >
          Edit{" "}
        </Link>
      </div>
    </div>
  );
};

export default CatalogItem;
