import React from "react";
import Sidebar from "./Sidebar.jsx";
import "../../styles/admin/dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Chart as ChartJS } from 'chart.js/auto'
import { Doughnut, Line } from "react-chartjs-2";

const Dashboard = () => {
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [12, 34 - 12],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{2000}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>50</p>
              {/* <p>{products && products.length}</p> */}
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>10</p>
              {/* <p>{orders && orders.length}</p> */}
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>3</p>
              {/* <p>{users && users.length}</p> */}
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
