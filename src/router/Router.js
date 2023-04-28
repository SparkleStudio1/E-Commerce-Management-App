import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// Layouts
import RootLayout from "../layout/root-layout/RootLayout";
// Pages
import NotFound from "../pages/not-found/NotFound";
import Overview from "../pages/overview/Overview";
import OrderList from "../pages/order-list/OrderList";
import Categories from "../pages/categories/Categories";
import Products from "../pages/products/Products";
import Shippers from "../pages/shippers/Shippers";
import Suppliers from "../pages/suppliers/Suppliers";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Overview />} />
        <Route path="categories" element={<Categories />} />
        <Route path="order-list" element={<OrderList />} />
        <Route path="products" element={<Products />} />
        <Route path="shippers" element={<Shippers />} />
        <Route path="suppliers" element={<Suppliers />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
