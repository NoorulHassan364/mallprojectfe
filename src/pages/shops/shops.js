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
import { Button, Modal, Spinner } from "react-bootstrap";

const Shops = () => {
  const [shops, setShops] = useState(null);
  const [form, setFrom] = useState(null);
  const [rentloading, setRentLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [shopModal, setShopModal] = useState(false);
  const [shop, setShop] = useState(null);

  const getShops = async () => {
    try {
      let res = await api.get(`/admin/shops`);
      setShops(res.data.data?.filter((el) => el.IsSold == false));
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

  const handleShop = (shop) => {
    setShop(shop);
    setShopModal(true);
  };

  const handleBuyShop = async (type) => {
    debugger;
    try {
      if (type === "buy") {
        setBuyLoading(true);
      } else {
        setRentLoading(true);
      }
      let user = JSON.parse(localStorage.getItem("user"))._id;
      const session = await api.post(
        `/shop/checkout-session/${shop?._id}/${user}/?type=${type}`,
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
      if (type === "buy") {
        setBuyLoading(true);
      } else {
        setRentLoading(true);
      }
    } catch (err) {
      if (type === "buy") {
        setBuyLoading(true);
      } else {
        setRentLoading(true);
      }
      console.log(err);
    }
  };

  const handleShopModalClose = () => {
    setShop(null);
    setBuyLoading(false);
    setRentLoading(false);
    setShopModal(false);
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{el?.category}</span>
                    <span>Rent: {el?.rent}</span>
                  </div>
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
                            icon={faArrowRight}
                            style={{ color: "green", fontSize: "1.6rem" }}
                            onClick={() => handleShop(el)}
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

      <Modal show={shopModal} onHide={handleShopModalClose} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Edit Shop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                width: "12rem",
                marginBottom: "1rem",
                backgroundColor: "blue",
              }}
              onClick={() => handleBuyShop("buy")}
            >
              {buyLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                `Buy Shop -> NGN ${shop?.price}`
              )}
            </Button>
            <Button
              style={{ width: "12rem", backgroundColor: "brown" }}
              onClick={() => handleBuyShop("rent")}
            >
              {rentloading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                `For Rent -> NGN ${shop?.rent}`
              )}
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShopModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Shops;
