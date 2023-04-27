import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="root-layout">
      <div className="sidebar"></div>
      <Outlet />
    </div>
  );
}

export default RootLayout;
