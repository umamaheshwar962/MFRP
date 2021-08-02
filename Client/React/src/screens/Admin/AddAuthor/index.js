import React from "react";
import Layout from "../../../components/Layout";
import AddAuthor from "./AddAuthor";

const Admin = () => {
  return (
    <Layout link="http://localhost:3000" methd="Logout">
      <div>
        <div className="text-center">
          <h1>ADD AUTHOR</h1>
        </div>
        <AddAuthor />
      </div>
    </Layout>
  );
};

export default Admin;
