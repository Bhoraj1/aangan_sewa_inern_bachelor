import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { adminRoutes } from "./AdminRoutes";
import Login from "../components/Login";
import Guard from "./Guard";

const NotFound = () => <div>Not Found</div>;
export const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <Guard>
        <AdminLayout />
      </Guard>
    ),
    children: adminRoutes,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
