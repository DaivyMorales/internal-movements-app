import React from "react";
import { Navbar } from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default Layout;
