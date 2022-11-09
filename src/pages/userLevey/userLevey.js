import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import api from "../../api";
import { loadStripe } from "@stripe/stripe-js";

const UserLevey = () => {
  const [leveys, setLeveys] = useState(null);
  const [loading, setLoading] = useState(false);

  const getUserLevey = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    try {
      let res = await api.get(`/levey/${user?._id}`);
      setLeveys(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayLevey = async (levey) => {
    debugger;
    try {
      setLoading(true);
      let user = JSON.parse(localStorage.getItem("user"))._id;
      const session = await api.post(
        `/levey/checkout-session/${levey?._id}/${user}`,
        levey
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
    getUserLevey();
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
        <h4 style={{ color: "grey" }}>Levey / Bills</h4>
      </div>
      <hr />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Levey/Bill Name</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Attachment</th>
            <th>Status</th>
            <th>Pay Now</th>
          </tr>
        </thead>
        <tbody>
          {leveys?.map((el, index) => {
            return (
              <tr>
                <td>{el?.leveyBillName}</td>
                <td>{el?.amount}</td>
                <td>{el?.dueDate}</td>
                <td>
                  <a href={el?.attachment}>Download</a>
                </td>
                <td>
                  {el?.IsPayed ? (
                    <span style={{ color: "green" }}>Payed</span>
                  ) : (
                    <span style={{ color: "red" }}>UnPayed</span>
                  )}
                </td>
                <td>
                  {el?.IsPayed ? (
                    <Button disabled>Pay Now</Button>
                  ) : (
                    <Button onClick={() => handlePayLevey(el)}>
                      <span>Pay Now</span>
                      {loading ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          style={{ marginLeft: "1rem" }}
                        />
                      ) : null}
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserLevey;
