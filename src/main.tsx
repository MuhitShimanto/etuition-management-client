import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/Routes";
import { AuthProvider } from "./providers/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
