import {
  faArrowRight,
  faCartShopping,
  faTag,
  faTShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimer } from "@fortawesome/sharp-solid-svg-icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../api";
import { loadStripe } from "@stripe/stripe-js";
import { Spinner } from "react-bootstrap";

const Shops = () => {
  const [shops, setShops] = useState(null);
  const [form, setFrom] = useState(null);
  const [loading, setLoading] = useState(false);

  const getShops = async () => {
    try {
      let res = await api.get(`/admin/shops`);
      setShops(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getForm = async () => {
    try {
      let res = await api.get(`/admin/interestForm`);
      setFrom(res.data.data.form);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleBuyShop = async (shop) => {
    debugger;
    try {
      setLoading(true);
      let user = JSON.parse(localStorage.getItem("user"))._id;
      const session = await api.post(
        `/shop/checkout-session/${shop?._id}/${user}`,
        shop
      );
      console.log("session", session);
      const stripePromise = loadStripe(
        "pk_test_51LjOurH1uE3Pyj5r2rWw7W5rNMExIlJP15fbAMOB02EdkqqXyTqTkD6wx1WP73BCCbfIcPgqud0Cj9VfL1fy917N00owLZAUUJ"
      );

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getShops();
    getForm();
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
        <h4 style={{ color: "grey" }}>Available Shops/Outlets</h4>
        <a href={form}>Download Interest Form</a>
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
                          {loading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              style={{ color: "green", fontSize: "1.6rem" }}
                              onClick={() => handleBuyShop(el)}
                            />
                          )}
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

export default Shops;
