import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useState, useEffect } from "react";

type SidebarProps = {
  open: boolean;
  sidebarRef: React.RefObject<HTMLDivElement>;
};

function Sidebar({ open, sidebarRef }: SidebarProps) {
  const windowWidth = window.innerWidth;
  const [openedWidth, setOpenedWidth] = useState("20");
  const [closedWidth, setClosedWidth] = useState("8.25");

  useEffect(() => {
    if (windowWidth > 1400) {
      setOpenedWidth("20");
      setClosedWidth("8.25");
    }
    if (windowWidth < 1400) {
      setOpenedWidth("18");
      setClosedWidth("6.25");
    }
  }, [windowWidth]);

  return (
    <div
      className={`sidebar ${open === false ? "sidebar-closed" : ""}`}
      style={
        open ? { width: `${openedWidth}em` } : { width: `${closedWidth}em` }
      }
      ref={sidebarRef}
    >
      <div className="sidebar-brand d-flex justify-content-center align-items-center">
        <div className="brand-logo d-flex justify-content-center align-items-center">
          <img src="./assets/icons/brand-logo.svg" alt="brand-logo" />
          <h1 className="text">LOOPIN</h1>
        </div>
      </div>
      <div className="sidebar-navlinks">
        <div className="navlinks">
          <NavLink
            to="/"
            className={`navlink d-flex justify-content-${
              open ? "start" : "center"
            } align-items-center`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_35537_42239)">
                <path d="M11 2.05V13H21.95C21.449 18.053 17.185 22 12 22C6.477 22 2 17.523 2 12C2 6.815 5.947 2.551 11 2.05V2.05ZM13 2.05C15.295 2.2812 17.4396 3.29842 19.0706 4.92944C20.7016 6.56045 21.7188 8.70501 21.95 11H13V2.05Z" />
              </g>
            </svg>
            <span className="text">Overview</span>
          </NavLink>
          <NavLink
            to="/categories"
            className={`navlink d-flex justify-content-${
              open ? "start" : "center"
            } align-items-center`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_35537_42287)">
                <path d="M3 3H11V11H3V3ZM3 13H11V21H3V13ZM13 3H21V11H13V3ZM13 13H21V21H13V13Z" />
              </g>
            </svg>
            <span className="text">Categories</span>
          </NavLink>
          <NavLink
            to="/products"
            className={`navlink d-flex justify-content-${
              open ? "start" : "center"
            } align-items-center`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_35537_42324)">
                <path d="M12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1ZM17 11H15V12C15.0003 12.2549 15.0979 12.5 15.2728 12.6854C15.4478 12.8707 15.687 12.9822 15.9414 12.9972C16.1958 13.0121 16.4464 12.9293 16.6418 12.7657C16.8373 12.6021 16.9629 12.3701 16.993 12.117L17 12V11ZM9 11H7V12C7.00028 12.2549 7.09788 12.5 7.27285 12.6854C7.44782 12.8707 7.68695 12.9822 7.94139 12.9972C8.19584 13.0121 8.44638 12.9293 8.64183 12.7657C8.83729 12.6021 8.9629 12.3701 8.993 12.117L9 12V11ZM12 3C11.2348 2.99996 10.4985 3.29233 9.94174 3.81728C9.38499 4.34224 9.04989 5.06011 9.005 5.824L9 6V8H15V6C15 5.23479 14.7077 4.49849 14.1827 3.94174C13.6578 3.38499 12.9399 3.04989 12.176 3.005L12 3Z" />
              </g>
            </svg>

            <span className="text">Products</span>
          </NavLink>
          <NavLink
            to="/suppliers"
            className={`navlink d-flex justify-content-${
              open ? "start" : "center"
            } align-items-center`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_35537_42355)">
                <path d="M9.33 11.5H11.5C12.6935 11.5 13.8381 11.9741 14.682 12.818C15.5259 13.6619 16 14.8065 16 16H8.999L9 17H17V16C16.9968 14.936 16.6894 13.895 16.114 13H19C19.9453 12.9997 20.8712 13.2674 21.6705 13.772C22.4698 14.2767 23.1097 14.9975 23.516 15.851C21.151 18.972 17.322 21 13 21C10.239 21 7.9 20.41 6 19.375V10.071C7.21661 10.2453 8.36547 10.7383 9.33 11.5ZM5 19C5 19.2652 4.89464 19.5196 4.70711 19.7071C4.51957 19.8946 4.26522 20 4 20H2C1.73478 20 1.48043 19.8946 1.29289 19.7071C1.10536 19.5196 1 19.2652 1 19V10C1 9.73478 1.10536 9.48043 1.29289 9.29289C1.48043 9.10536 1.73478 9 2 9H4C4.26522 9 4.51957 9.10536 4.70711 9.29289C4.89464 9.48043 5 9.73478 5 10V19ZM18 5C18.7956 5 19.5587 5.31607 20.1213 5.87868C20.6839 6.44129 21 7.20435 21 8C21 8.79565 20.6839 9.55871 20.1213 10.1213C19.5587 10.6839 18.7956 11 18 11C17.2044 11 16.4413 10.6839 15.8787 10.1213C15.3161 9.55871 15 8.79565 15 8C15 7.20435 15.3161 6.44129 15.8787 5.87868C16.4413 5.31607 17.2044 5 18 5ZM11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5C14 5.79565 13.6839 6.55871 13.1213 7.12132C12.5587 7.68393 11.7956 8 11 8C10.2044 8 9.44129 7.68393 8.87868 7.12132C8.31607 6.55871 8 5.79565 8 5C8 4.20435 8.31607 3.44129 8.87868 2.87868C9.44129 2.31607 10.2044 2 11 2Z" />
              </g>
            </svg>
            <span className="text">Suppliers</span>
          </NavLink>
          <NavLink
            to="/shippers"
            className={`navlink d-flex justify-content-${
              open ? "start" : "center"
            } align-items-center`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_35537_42356)">
                <path d="M17 8H20L23 12.056V18H20.965C20.8461 18.8343 20.4302 19.5977 19.7937 20.1499C19.1571 20.7022 18.3427 21.0063 17.5 21.0063C16.6573 21.0063 15.8429 20.7022 15.2063 20.1499C14.5698 19.5977 14.1539 18.8343 14.035 18H8.965C8.84612 18.8343 8.43021 19.5977 7.79368 20.1499C7.15714 20.7022 6.34272 21.0063 5.5 21.0063C4.65728 21.0063 3.84286 20.7022 3.20632 20.1499C2.56979 19.5977 2.15388 18.8343 2.035 18H1V6C1 5.73478 1.10536 5.48043 1.29289 5.29289C1.48043 5.10536 1.73478 5 2 5H16C16.2652 5 16.5196 5.10536 16.7071 5.29289C16.8946 5.48043 17 5.73478 17 6V8ZM17 10V13H21V12.715L18.992 10H17Z" />
              </g>
            </svg>

            <span className="text">Shippers</span>
          </NavLink>
          <NavLink
            to="/order-list"
            className={`navlink d-flex justify-content-${
              open ? "start" : "center"
            } align-items-center`}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_35537_42417)">
                <path d="M20 22H6.5C5.57174 22 4.6815 21.6313 4.02513 20.9749C3.36875 20.3185 3 19.4283 3 18.5V5C3 4.20435 3.31607 3.44129 3.87868 2.87868C4.44129 2.31607 5.20435 2 6 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM19 20V17H6.5C6.10218 17 5.72064 17.158 5.43934 17.4393C5.15804 17.7206 5 18.1022 5 18.5C5 18.8978 5.15804 19.2794 5.43934 19.5607C5.72064 19.842 6.10218 20 6.5 20H19Z" />
              </g>
            </svg>
            <span className="text">Order List</span>
          </NavLink>
        </div>
      </div>
      <div className="sidebar-tools"></div>
    </div>
  );
}

export default Sidebar;
