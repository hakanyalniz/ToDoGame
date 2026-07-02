import "./App.css";
// import Home from "./pages/Home/Home";
import { RouterProvider } from "react-router";
import { router } from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
