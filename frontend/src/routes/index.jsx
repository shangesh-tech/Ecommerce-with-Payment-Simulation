import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Signup from "../pages/Signup";
import SearchResult from "../pages/SearchResult";
import ResultDetails from "../pages/ResultDetails";
import ShoppingCart from "../pages/ShoppingCart";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailure from "../pages/PaymentFailure";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "result/:searchTerms",
        element: <SearchResult />,
      },
      {
        path: "resultdetails/:productId",
        element: <ResultDetails />,
      },
      {
        path:"/cart" ,
        element:<ShoppingCart />,
      },
      {
        path:"/payment-success",
        element:<PaymentSuccess/>
      },
      {
        path:"/payment-failure",
        element:<PaymentFailure/>
      }
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);
