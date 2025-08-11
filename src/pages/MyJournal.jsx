import TripCard from "../components/TripCard";
import { DELETE_TRIP_CONFIRM_TITLE } from "../constants";
import { useTrips } from "../context/TripContext";
import { List, Button, Card, Modal } from "antd";

const MyJournal = () => {
  const { trips, deleteTrip } = useTrips();

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
