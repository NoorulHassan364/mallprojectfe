import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import api from "../../api";
import { loadStripe } from "@stripe/stripe-js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { shortFullDate } from "../../utils/dateFormat";

const ShopPayments = () => {
  const [ShopPayments, setShopPayments] = useState(null);
  const [loading, setLoading] = useState(false);
  let date = new Date();
  console.log(date.getFullYear(), "date");
  const getUserLevey = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    try {
      let res = await api.get(`/shopPayments/${user?._id}`);
      setShopPayments(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePShopPayment = async (paymnet) => {
    debugger;
    try {
      setLoading(true);
      let user = JSON.parse(localStorage.getItem("user"))._id;
      const session = await api.post(
        `/shopPayments/checkout-session/${paymnet?._id}/${user}`,
        paymnet
      );
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

  const hanldeInvoice = (data) => {
    const doc = new jsPDF();

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    // autoTable(doc, { html: "#leveyTable" });

    // Or use javascript directly:
    doc.text(`Invoice#: ${data?.invoiceNo}`, 14, 10);
    doc.text("Amuwo Mall", 180, 10, null, null, "right");

    autoTable(doc, {
      head: [["Payment Name", "Amount", "Due Date", "Payed Date", "Status"]],
      body: [
        [
          data?.paymentName,
          data?.amount,
          data?.dueDate,
          shortFullDate(data?.payedDate),
          data?.IsPayed ? "Payed" : "Unpayed",
        ],
      ],
    });

    doc.save("invoice.pdf");
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
        <h4 style={{ color: "grey" }}>Shop Payments</h4>
      </div>
      <hr />

      <div style={{ height: "28rem", overflowY: "scroll" }}>
        <Table striped bordered hover id="leveyTable">
          <thead>
            <tr>
              <th>Payment Name</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Pay Now</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {ShopPayments?.map((el, index) => {
              if (index == 1) {
                console.log(
                  " el?.dueDate",
                  el?.dueDate.split("-")[2] == date.getFullYear() ? false : true
                );
              }
              return (
                <tr>
                  <td>{el?.paymentName}</td>
                  <td>{el?.amount}</td>
                  <td>{el?.dueDate}</td>
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
                      <Button
                        disabled={
                          el?.dueDate.split("-")[2] == date.getFullYear() &&
                          el?.dueDate.split("-")[1] == date.getMonth() + 1
                            ? false
                            : true
                        }
                        onClick={() => handlePShopPayment(el)}
                      >
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
                  <td>
                    <Button
                      onClick={() => hanldeInvoice(el)}
                      disabled={el?.IsPayed ? false : true}
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ShopPayments;
