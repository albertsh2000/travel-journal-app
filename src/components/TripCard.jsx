import { Card } from "antd";
import { Link } from "react-router-dom";

const TripCard = ({ trip, extra }) => {
  return (
    <Card title={trip.destination} extra={extra}>
      <p>{trip.description}</p>
      {trip.image && (
        <img
          src={trip.image}
          alt="Trip"
          style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
        />
      )}
      <Link to={`/card/${trip.id}`}>See details</Link>
    </Card>
  );
};

export default TripCard;
