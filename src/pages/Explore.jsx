import React from "react";
import { List } from "antd";
import TripCard from "../components/TripCard";

const dummyPosts = [
  {
    destination: "Paris",
    location: "France",
    date: "2024-08-01",
    description: "Eiffel Tower & croissants.",
  },
  {
    destination: "Sydney",
    location: "Australia",
    date: "2024-06-20",
    description: "Opera House and beaches.",
  },
  {
    destination: "Kyoto",
    location: "Japan",
    date: "2024-09-15",
    description: "Temples, tea ceremonies, and autumn leaves.",
  },
  {
    destination: "New York City",
    location: "USA",
    date: "2024-10-05",
    description: "Broadway shows, Central Park, and skyscrapers.",
  },
];

const Explore = () => (
  <List
    grid={{ gutter: 16, column: 2 }}
    dataSource={dummyPosts}
    renderItem={(item) => (
      <List.Item>
        <TripCard trip={item} />
      </List.Item>
    )}
  />
);

export default Explore;
