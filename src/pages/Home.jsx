import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

import { Carousel } from "antd";

const images = [
  "https://plus.unsplash.com/premium_photo-1697730018241-065a9f7568c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1558370781-d6196949e317?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const Home = () => (
  <div style={{ padding: 24, textAlign: "center" }}>
    <Title>Welcome to the Travel Journal</Title>
    <Paragraph>
      Discover amazing places others have been to, and share your own journeys
      test 7
    </Paragraph>
    <div style={{ borderRadius: "16px", overflow: "hidden" }}>
      <Carousel autoplay arrows>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  </div>
);

export default Home;
