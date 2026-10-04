import React, { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import useTripStore from "../stores/useTripStore";
import { SUCCESS_MESSAGES } from "../constants";

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(true);

  const trips = useTripStore((state) => state.trips);
  const updateTrip = useTripStore((state) => state.updateTrip);
  const fetchTrips = useTripStore((state) => state.fetchTrips);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  useEffect(() => {
    const trip = trips.find((t) => t.id === id);
    if (trip || trips.length > 0) {
      setLoading(false);
    }
  }, [trips, id]);

  const handleUpdate = async (values) => {
    const updatedData = {
      destination: values.destination,
      description: values.description || "",
      image: values.image || "",
    };

    try {
      await updateTrip(id, updatedData);
      message.success(SUCCESS_MESSAGES.TRIP_UPDATE_SUCCESS_MSG);
      navigate(`/card/${id}`);
    } catch {
      message.error("Failed to update trip.");
    }
  };

  const trip = trips.find((t) => t.id === id);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!trip) {
    return <p>Trip not found</p>;
  }

  return (
    <Card title="Edit Trip" style={{ maxWidth: 500, margin: "auto" }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleUpdate}
        initialValues={{
          destination: trip.destination,
          description: trip.description,
          image: trip.image,
        }}
      >
        <Form.Item
          name="destination"
          label="Destination"
          rules={[{ required: true, message: "Please enter a destination." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} style={{ resize: "none" }} />
        </Form.Item>
        <Form.Item name="image" label="Image URL">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Update Trip
        </Button>
      </Form>
    </Card>
  );
};

export default EditTrip;
