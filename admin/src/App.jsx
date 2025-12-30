import { RouterProvider } from "react-router-dom";
import { router } from "./router/Index";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

  // npm i react-toastify

export default App;
