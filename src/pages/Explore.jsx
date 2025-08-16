import React from "react";
import { List } from "antd";
import TripCard from "../components/TripCard";
import { useTrips } from "../context/TripContext";

const Explore = () => {
  const { combinedTrips } = useTrips();

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={combinedTrips}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <TripCard trip={item} />
        </List.Item>
      )}
    />
  );
};

export default Explore;
