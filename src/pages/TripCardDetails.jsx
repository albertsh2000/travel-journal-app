import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTripStore from "../stores/useTripStore";
import Loader from "../components/Loader";
import { ERROR_MESSAGES } from "../constants";

const TripCardDetails = () => {
  const { id } = useParams();
  const getTripById = useTripStore((state) => state.getTripById);

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrip = async () => {
      try {
        const data = await getTripById(id);
        setTrip(data);
      } catch (err) {
        setError(ERROR_MESSAGES.FETCH_TRIPS);
      } finally {
        setLoading(false);
      }
    };

    getTrip();
  }, [getTripById, id]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const { destination, description, image } = trip;

  return (
    <div style={{ padding: "24px" }}>
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
