import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useTripStore from "../stores/useTripStore"; 

const TripCardDetails = () => {
  const { id } = useParams();

  const fetchTrips = useTripStore((state) => state.fetchTrips);
  const getCombinedTrips = useTripStore((state) => state.getCombinedTrips);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const combinedTrips = getCombinedTrips();
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
