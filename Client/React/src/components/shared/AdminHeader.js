import React from "react";
// import { useContext } from "react";
import { Link } from "react-router-dom";
// import { CartContext } from "../../contexts/CartContext";
// import { CartIcon } from "../icons";
import styles from "./header.module.scss";
import cookies from "js-cookie";

const AdminHeader = (props) => {
  // const { itemCount } = useContext(CartContext);
  function handlelogout() {
    cookies.remove("adminToken");
    localStorage.removeItem("cart");
  }
  function Userd() {
    let userId = cookies.get("adminToken");
    if (userId !== "") {
      return (
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <a style={{}} href="http://localhost:3000/admin">
            {userId}
          </a>
          <button
            className="btn btn-outline-primary btn-sm"
            style={{ padding: "0", float: "right", margin: "10px" }}
          >
            <a
              style={{
                padding: "8px 0",
                width: "75px",
                height: "30px",
                alignSelf: "center",
              }}
              href="http://localhost:3000/"
              onClick={handlelogout}
            >
              LogOut
            </a>
          </button>
        </div>
      );
    } else {
      return (
        <div style={{ flex: "1" }}>
          <button
            className="btn btn-outline-primary btn-sm"
            style={{ padding: "0", float: "right", margin: "10px" }}
          >
            <a
              style={{
                padding: "8px 0",
                width: "75px",
                height: "30px",
                alignSelf: "center",
              }}
              href="http://localhost:3000/login"
            >
              LogIn
            </a>
          </button>
        </div>
      );
    }
  }
  return (
    <header className={styles.header}>
      <div style={{ flex: "1", alignSelf: "center" }}>
        <a
          style={{ textDecoration: "none", float: "left" }}
          href="http://localhost:3000/admin"
        >
          <h1>
            Book <span style={{ color: "white" }}>Store</span>
          </h1>
        </a>
      </div>
      <div style={{ flex: "1", alignSelf: "center" }}>
        <Link to="/adminAddBook">Add/Update Book</Link>
        <Link to="/adminDeleteBook">Delete Book</Link>
        <Link to="/adminAddAuthor">Add Author</Link>
        <Link to="/adminAddCategory">Add Category</Link>
      </div>
      <Userd />
    </header>
  );
};

export default AdminHeader;
