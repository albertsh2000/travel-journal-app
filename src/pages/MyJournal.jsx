import React, { useEffect, useCallback } from "react";
import { List, Button, Modal } from "antd";
import TripCard from "../components/TripCard";
import useTripStore from "../stores/useTripStore";
import { useTranslation } from "react-i18next";

const MyJournal = () => {
  const { t } = useTranslation();

  const trips = useTripStore((state) => state.trips);
  const deleteTrip = useTripStore((state) => state.deleteTrip);
  const fetchTrips = useTripStore((state) => state.fetchTrips);

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
  );
};

export default MyJournal;
