import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../api";

const Analytics = () => {
  const [totalShops, setTotalShops] = useState(null);
  const [soldShops, setSoldShops] = useState(null);
  const [installmentShops, setInstallmentShops] = useState(null);

  const getAnalytics = async () => {
    try {
      let res = await api.get(`/admin/shop/statistics`);
      setTotalShops(res.data.data.totalShops);
      setSoldShops(res.data.data.soldShops);
      setInstallmentShops(res.data.data.installmentShops);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <div className="container-fluid shadow college_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4 style={{ color: "grey" }}>Statistics</h4>
      </div>
      <hr />
      <div className="stats">
        <div className="shadow statsChild">
          <h4>Total Shops</h4>
          <h3>{totalShops?.length}</h3>
        </div>
        <div className="shadow statsChild">
          <h4>Total Shops Sold</h4>
          <h3>{soldShops?.length}</h3>
        </div>
        <div className="shadow statsChild">
          <h4>Shops On Installment</h4>
          <h3>{installmentShops?.length}</h3>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
