import React, { useEffect } from "react";
import { List, Button, Modal } from "antd";
import TripCard from "../components/TripCard";
import { DELETE_TRIP_CONFIRM_TITLE } from "../constants";
import useTripStore from "../stores/useTripStore"; 

const MyJournal = () => {
  const trips = useTripStore((state) => state.trips);
  const deleteTrip = useTripStore((state) => state.deleteTrip);
  const fetchTrips = useTripStore((state) => state.fetchTrips);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDelete = (id) => {
    Modal.confirm({
      title: DELETE_TRIP_CONFIRM_TITLE,
      onOk: () => deleteTrip(id),
    });
  };

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={trips}
      renderItem={(trip) => (
        <List.Item key={trip.id}>
          <TripCard
            trip={trip}
            extra={
              <Button danger onClick={() => handleDelete(trip.id)}>
                Delete
              </Button>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default MyJournal;
