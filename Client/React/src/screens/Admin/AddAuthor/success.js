import React from "react";
import Layout from "../../../components/Layout";
import { Link } from "react-router-dom";

const Success = (props) => {
  return (
    <Layout>
      <div
        style={{ minHeight: "86vh", display: "flex", justifyContent: "center" }}
      >
        <div style={{ alignSelf: "center" }}>
          <div>
            <div className="p-3 text-center text-success">
              <p>Author Added Successfully</p>
            </div>
            <div className="p-3 text-center text-success">
              <Link
                to="/adminAddAuthor"
                className="btn btn-outline-success btn-sm"
              >
                ADD MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
