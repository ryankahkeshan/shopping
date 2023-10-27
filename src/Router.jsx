import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App/App";
import Layout from "./Layout/Layout";
import Collections from "./Collections/Collections";
import Tops from "./Tops/Tops";
import Pants from "./Pants/Pants";
import Shoes from "./Shoes/Shoes";

const Router = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <App />
            },
            {
              path: "collections",
              element: <Collections />
            },
            {
              path: "tops",
              element: <Tops />
            },
            {
              path: "pants",
              element: <Pants />
            },
            {
              path: "shoes",
              element: <Shoes />
            }
          ]
        },
      ]);
    return <RouterProvider router={router} />
}

export default Router;