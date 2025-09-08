import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TripCard = ({ trip, extra }) => {
  const { t } = useTranslation();

  return (
    <Card title={trip.destination} extra={extra}>
      <p>{trip.description}</p>
      {trip.image && (
        <img
          src={trip.image}
          {...(trip.destination ? { alt: `Photo of ${trip.destination}` } : {})}
          style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
        />
      )}
      <Link to={`/card/${trip.id}`}>{t("seeDetails")}</Link>
    </Card>
  );
};

export default React.memo(TripCard);
