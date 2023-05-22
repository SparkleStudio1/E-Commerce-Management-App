import "./portal-layout.css";
import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";

function RootLayout() {
  const [open, setOpen] = useState(true);

  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.style.marginLeft = `${sidebarRef.current?.style.width}`;
    }
  }, [sidebarRef.current?.style.width]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.style.marginTop = `${headerRef.current?.offsetHeight}px`;
    }
  }, [headerRef.current?.offsetHeight]);

  return (
    <div className="root-layout">
      {/* Header */}
      <Header
        open={open}
        handleSidebar={handleSidebar}
        headerRef={headerRef}
        sidebarRef={sidebarRef}
      />
      {/* Sidebar */}
      <main>
        <Sidebar open={open} sidebarRef={sidebarRef} />
        {/* Render Routes */}
        <div ref={mainRef}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
