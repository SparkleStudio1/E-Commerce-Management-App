import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// Layouts
import RootLayout from "../layout/root-layout/RootLayout";
// Pages
import Home from "../pages/home/Home";
import NotFound from "../pages/not-found/NotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
