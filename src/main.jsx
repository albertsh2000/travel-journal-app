import { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import App from "./App.jsx";
import "./index.css";
import setupI18n from "./i18n";

const container = document.getElementById("root");
const root = createRoot(container);

setupI18n().then(() => {
  root.render(<App />);
});
