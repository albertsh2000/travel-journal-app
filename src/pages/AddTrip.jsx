import React from "react";
import { Form, Input, Button, Card, DatePicker, message } from "antd";
import { useTrips } from "../context/TripContext";
import { TRIP_ADD_SUCCESS_MSG } from "../constants";

const AddTrip = () => {
  const { addTrip } = useTrips();
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const tripData = {
      destination: values.destination,
      description: values.description || "",
      image: values.image || "",
    };

    addTrip(tripData);
    message.success(TRIP_ADD_SUCCESS_MSG);
    form.resetFields();
  };

  return (
    <Card title="Add a New Trip" style={{ maxWidth: 500, margin: "auto" }}>
      <Form layout="vertical" form={form} onFinish={handleAdd}>
        <Form.Item
          name="destination"
          label="Destination"
          rules={[{ required: true }]}
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
          Add Trip
        </Button>
      </Form>
    </Card>
  );
};

export default AddTrip;
