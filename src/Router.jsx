import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App/App";
import Layout from "./Layout/Layout";
import Collections from "./Collections/Collections";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import OurStory from "./OurStory/OurStory";
import AllProducts from "./AllProducts/AllProducts";
import Mens from "./Mens/Mens";
import Womens from "./Womens/Womens";
import Jewelry from "./Jewelry/Jewelry";

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
              path: "mens",
              element: <Mens />
            },
            {
              path: "womens",
              element: <Womens />
            },
            {
              path: "jewelry",
              element: <Jewelry />
            },
            {
              path: "about-us",
              element: <AboutUs />
            },
            {
              path: "contact-us",
              element: <ContactUs />
            },
            {
              path: "our-story",
              element: <OurStory />
            },
            {
              path: "all-products",
              element: <AllProducts />
            }
          ]
        },
      ]);
    return <RouterProvider router={router} />
}

export default Router;