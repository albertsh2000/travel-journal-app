import React from "react";
import { Typography, Carousel, Card, Row, Col } from "antd";
import HeroBanner from "../components/HeroBanner";

const { Title, Paragraph } = Typography;

const images = [
  "https://plus.unsplash.com/premium_photo-1697730018241-065a9f7568c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1558370781-d6196949e317?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const features = [
  {
    title: "Explore New Destinations",
    description:
      "Find hidden gems and travel stories from explorers around the world.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Share Your Journey",
    description:
      "Document your adventures and inspire others with your unique travel experiences.",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Plan Your Trips",
    description:
      "Use our tools to organize and plan your next exciting travel. your next exciting travel.",
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=400&auto=format&fit=crop",
  },

  {
    title: "Connect with Fellow Travelers",
    description:
      "Join a community of like-minded explorers and share tips, stories, and advice.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Access Expert Travel Guides",
    description:
      "Get insider information from travel experts to make your journey smooth and memorable.",
    img: "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Travel Smart with Tools",
    description:
      "Use smart tools like budget planners, itinerary builders, and packing checklists.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=400&auto=format&fit=crop",
  },
];

const Home = () => (
  <div
    style={{
      textAlign: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <HeroBanner />
    <div style={{ flex: 1, padding: "24px" }}>
      <div
        style={{ borderRadius: "16px", overflow: "hidden", marginBottom: 40 }}
      >
        <Carousel
          autoplay
          autoplaySpeed={2000}
          dots
          arrows
          arrowSize={24}
          dotWidth="24"
        >
          {images.map((src, i) => (
            <div key={i} style={{ position: "relative" }}>
              {/* Image */}
              <img
                src={src}
                alt={`Slide ${i}`}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.1)",
                  zIndex: 1,
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <Title level={2} style={{ marginBottom: 24 }}>
        Why Travel with Us?
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {features.map(({ title, description, img }, i) => (
          <Col xs={24} sm={12} md={8} key={i}>
            <Card
              hoverable
              cover={
                <img
                  alt={title}
                  src={img}
                  style={{ height: 300, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta title={title} description={description} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </div>
);

export default Home;
