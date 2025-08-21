import { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TripProvider } from "./context/TripContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TripProvider>
      <App />
    </TripProvider>
  </AuthProvider>
);
