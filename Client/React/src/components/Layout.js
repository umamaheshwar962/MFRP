import React from "react";
import Header from "./shared/header";
import AdminHeader from "./shared/AdminHeader";
import Footer from "./shared/footer";
import cookies from "js-cookie";

import "bootswatch/dist/lux/bootstrap.css";

const Hea = (props) => {
  if (cookies.get("adminToken") === "admin") {
    return <AdminHeader link={props.link} methd={props.methd} />;
  } else {
    return <Header link={props.link} methd={props.methd} />;
  }
};

const Layout = (props) => {
  return (
    <div>
      <Hea {...props} />
      <main className="container" style={{ minHeight: "86.6vh" }}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
