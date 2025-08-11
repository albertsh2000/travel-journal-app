import { Card } from "antd";

const TripCard = ({ trip, extra }) => {
  return (
    <Card title={trip.destination} extra={extra}>
      <p> {trip.date}</p>
      <p>{trip.description}</p>
      {trip.image && (
        <img
          src={trip.image}
          alt="Trip"
          style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
        />
      )}
    </Card>
  );
};

export default TripCard;
