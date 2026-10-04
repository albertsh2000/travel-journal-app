import React, { useEffect, useCallback } from "react";
import { List, Button, Modal } from "antd";
import TripCard from "../components/TripCard";
import useTripStore from "../stores/useTripStore";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { List, Button, Modal, Space, Input } from "antd";
import { Link } from "react-router-dom";
import TripCard from "../components/TripCard";
import { DELETE_TRIP_CONFIRM_TITLE } from "../constants";
import useTripStore from "../stores/useTripStore";

const MyJournal = () => {
  const { t } = useTranslation();

  const trips = useTripStore((state) => state.trips);
  const deleteTrip = useTripStore((state) => state.deleteTrip);
  const fetchTrips = useTripStore((state) => state.fetchTrips);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDelete = useCallback(
    (id) => {
      Modal.confirm({
        title: t("myJournalComponent.confirmDeleteTitle"),
        okText: t("common.ok"),
        cancelText: t("common.cancel"),
        onOk: () => deleteTrip(id),
      });
    },
    [t, deleteTrip]
  );

  return (
    <List
      style={{ padding: "24px" }}
      grid={{ gutter: 16, column: 2 }}
      dataSource={trips}
      renderItem={(trip) => (
        <List.Item key={trip.id}>
          <TripCard
            trip={trip}
            extra={
              <Button danger onClick={() => handleDelete(trip.id)}>
                {t("myJournalComponent.delete")}
              </Button>
            }
          />
        </List.Item>
      )}
    />
  const filteredTrips = trips.filter((trip) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      trip.destination.toLowerCase().includes(searchLower) ||
      (trip.description && trip.description.toLowerCase().includes(searchLower))
    );
  });

  const handleDelete = (id) => {
    Modal.confirm({
      title: DELETE_TRIP_CONFIRM_TITLE,
      onOk: () => deleteTrip(id),
    });
  };

  return (
    <>
      <Input.Search
        placeholder="Search by destination or description..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16 }}
        size="large"
      />
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={filteredTrips}
        renderItem={(trip) => (
          <List.Item key={trip.id}>
            <TripCard
              trip={trip}
              extra={
                <Space>
                  <Link to={`/card/${trip.id}/edit`}>
                    <Button type="primary">Edit</Button>
                  </Link>
                  <Button danger onClick={() => handleDelete(trip.id)}>
                    Delete
                  </Button>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default MyJournal;
