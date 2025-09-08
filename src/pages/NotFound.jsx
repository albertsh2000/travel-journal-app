import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t(
        "notFound.subTitle",
        "Sorry, the page you visited does not exist."
      )}
      extra={
        <Link to="/">
          <Button type="primary">{t("notFound.backHome", "Back Home")}</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
