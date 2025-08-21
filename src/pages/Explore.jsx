import React, { useEffect } from "react";
import { List } from "antd";
import TripCard from "../components/TripCard";
import useTripStore from "../stores/useTripStore";

const Explore = () => {
  const getCombinedTrips = useTripStore((state) => state.getCombinedTrips);
  const fetchTrips = useTripStore((state) => state.fetchTrips);
  const hasFetched = useTripStore((state) => state.hasFetched);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  if (!hasFetched) {
    return null;
  }

  const combinedTrips = getCombinedTrips();

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
