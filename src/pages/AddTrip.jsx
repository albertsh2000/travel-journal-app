import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import useTripStore from "../stores/useTripStore";
import { useTranslation } from "react-i18next";

const AddTrip = () => {
  const { t } = useTranslation();
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
      message.success(t("addTripForm.success"));
      form.resetFields();
    } catch (error) {
      message.error(t("addTripForm.error"));
    }
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <Card
        title={t("addTripForm.title")}
        style={{ maxWidth: 500, margin: "auto" }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAdd}
          style={{ marginTop: "24px" }}
        >
          <Form.Item
            name="destination"
            label={t("addTripForm.destination")}
            rules={[
              { required: true, message: t("addTripForm.destinationRequired") },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label={t("addTripForm.description")}>
            <Input.TextArea rows={3} style={{ resize: "none" }} />
          </Form.Item>
          <Form.Item name="image" label={t("addTripForm.imageUrl")}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t("addTripForm.button")}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddTrip;
