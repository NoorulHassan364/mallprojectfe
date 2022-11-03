import React from "react";
import {
  faArrowRight,
  faCartShopping,
  faCheck,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimer } from "@fortawesome/sharp-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api";

const UserPurchasedShops = () => {
  const [shops, setShops] = useState(null);

  const getShops = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      let res = await api.get(`/shop/${user?._id}`);
      setShops(res.data.data?.purchases);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getShops();
  }, []);
  return (
    <div className="container-fluid college_container shadow">
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ color: "grey" }}>Purchased Shops/Outlets</h4>
      </div>
      <hr />

      <div className="shopCards">
        {shops?.map((el) => {
          return (
            <div style={{ position: "relative", display: "flex" }}>
              <div className="college_card card" style={{ width: "19rem" }}>
                <img
                  className="card-img-top"
                  src={el?.image}
                  style={{ width: "100%", height: "15rem" }}
                  alt="immg"
                />
                <div className="card-body">
                  <span>{el?.category}</span>
                  <div
                    className="card-title h5"
                    style={{ fontSize: "1.6rem", marginTop: "0.5rem" }}
                  >
                    {el?.name}
                  </div>
                  <p className="card-text">
                    <div className="innerTextCollegeMain">
                      <div className="innerTextCollege">
                        <span className="innerTextCollegeTitle">
                          <FontAwesomeIcon
                            icon={faTimer}
                            style={{ color: "blue" }}
                          />
                        </span>
                        <span>1AM – 10PM</span>
                      </div>
                      <div className="innerTextCollege">
                        <span className="innerTextCollegeTitle">
                          <FontAwesomeIcon
                            icon={faTag}
                            style={{ color: "brown" }}
                          />
                        </span>
                        <span>{el?.price}</span>
                      </div>
                      <div className="innerTextCollege">
                        <span className="innerTextCollegeTitle">
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            style={{ color: "darkorange" }}
                          />
                        </span>
                        <span>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "green", fontSize: "1.6rem" }}
                          />
                        </span>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPurchasedShops;
