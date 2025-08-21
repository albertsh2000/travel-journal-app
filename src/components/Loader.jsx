import React from "react";
import { Spin } from "antd";

const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60vh",
    }}
  >
    <Spin size="large" />
  </div>
);

export default Loader;
