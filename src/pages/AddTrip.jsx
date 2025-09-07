import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import useTripStore from "../stores/useTripStore";
import { SUCCESS_MESSAGES } from "../constants";

const AddTrip = () => {
  const addTrip = useTripStore((state) => state.addTrip);
  const [form] = Form.useForm();

  const handleAdd = async (values) => {
    const tripData = {
      destination: values.destination,
      description: values.description || "",
      image: values.image || "",
    };

    try {
      await addTrip(tripData);
      message.success(SUCCESS_MESSAGES.TRIP_ADD_SUCCESS_MSG);
      form.resetFields();
    } catch (error) {
      message.error("Failed to add trip.");
    }
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <Card title="Add a New Trip" style={{ maxWidth: 500, margin: "auto" }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAdd}
          style={{ marginTop: "24px" }}
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
            Add Trip
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddTrip;
