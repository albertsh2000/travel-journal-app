import { useParams } from "react-router-dom";
import { useTrips } from "../context/TripContext";

const TripCardDetails = () => {
  const { id } = useParams();
  const { combinedTrips } = useTrips();

  const selectedCard = combinedTrips.find((el) => el.id === id);

  if (!selectedCard) {
    return <p>Trip not found</p>;
  }

  const { destination, description, image } = selectedCard;

  return (
    <div>
      <h1>{destination}</h1>
      <p>
        <strong>Description:</strong> {description}
      </p>

      {image && (
        <img
          src={image}
          alt="trip"
          style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
        />
      )}
    </div>
  );
};

export default TripCardDetails;
