import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const TripCard = ({ trip, extra }) => {
  return (
    <Card title={trip.destination} extra={extra}>
      <p>{trip.description}</p>
      {trip.image && (
        <img
          src={trip.image}
          alt={`Photo of ${trip.destination}`}
          style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
        />
      )}
      <Link to={`/card/${trip.id}`}>See details</Link>
    </Card>
  );
};

export default React.memo(TripCard);
