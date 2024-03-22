import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import CartMedicine from "../components/CartMedicine";
import DetailMedicine from "../components/DetailMedicine";
import Shop from "../components/Shop";
import Checkout from '../components/Checkout'
import Home from "../page/Home";

const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/detail/:id",
    component: DetailMedicine,
  },
  {
    path: "/cart",
    component: CartMedicine,
  },
  {
    path: "/Checkout",
    component: Checkout,
  },
  {
    path: "/shop",
    component: Shop,
  },
];

export default publicRoutes;
