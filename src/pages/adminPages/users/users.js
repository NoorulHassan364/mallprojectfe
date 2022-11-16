import { faArrowUpFromBracket, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Modal, Table } from "react-bootstrap";
import api from "../../../api";
import * as Yup from "yup";
import { Formik } from "formik";

const Users = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [leveyModal, setleveyModal] = useState(false);
  const [attach, setAttachment] = useState(null);
  const [file, setFile] = useState(null);
  const [leveys, setLeveys] = useState(null);

  const validSchema = Yup.object().shape({
    leveyBillName: Yup.string().required("required"),
    dueDate: Yup.string().required("required"),
    amount: Yup.number().required("required"),
  });

  const handleLeveyModalClose = () => {
    setleveyModal(false);
  };

  const getUsers = async () => {
    try {
      let res = await api.get(`/admin/users`);
      setUsers(res.data.data.filter((el) => el?.userType !== "admin"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormikFileChange = (e, formik) => {
    let file = e.target.files[0];
    setFile(URL.createObjectURL(e.target.files[0]));
    setAttachment(file);
  };

  const handleLeveySubmit = async (values, resetForm) => {
    try {
      values.user = user?._id;
      if (attach) {
        const formData = new FormData();
        for (const key in values) {
          if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            if (values[key] !== null) formData.append(key, values[key]);
          }
        }
        formData.append("attachment", attach);
        await api.post(`/levey`, formData);
      } else {
        await api.post(`/levey`, values);
      }
      getUserLevey(user);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserLevey = async (user) => {
    try {
      let res = await api.get(`/levey/${user?._id}`);
      setLeveys(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewLevey = (user) => {
    getUserLevey(user);
    setleveyModal(true);
    setUser(user);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container-fluid shadow college_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4 style={{ color: "grey" }}>All Users</h4>
      </div>
      <hr />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Levy/Bill</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((el, index) => {
            return (
              <tr>
                <td>{el?.firstName}</td>
                <td>{el?.lastName}</td>
                <td>{el?.email}</td>
                <td>{el?.phone}</td>
                <td>{el?.address}</td>
                <td>
                  {
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ color: "blue" }}
                      onClick={() => handleViewLevey(el)}
                    />
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal
        show={leveyModal}
        onHide={handleLeveyModalClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Levey / Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "23rem", overflowY: "scroll" }}>
          <Formik
            onSubmit={(values, { resetForm }) => {
              handleLeveySubmit(values, resetForm);
            }}
            validationSchema={validSchema}
            enableReinitialize
            initialValues={{
              leveyBillName: "",
              dueDate: "",
              amount: "",
            }}
          >
            {(formik) => (
              <Form
                onSubmit={formik.handleSubmit}
                id="scholorshiperro"
                style={{ padding: "1rem" }}
              >
                <Form.Row>
                  <Form.Group controlId="leveyBillName" as={Col} hasValidation>
                    <Form.Label className="form__label">
                      levey / Bill
                    </Form.Label>
                    <Form.Control
                      className="p-3 rounded-0"
                      type="text"
                      name="leveyBillName"
                      placeholder="leveyBillName"
                      value={formik.values.leveyBillName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={
                        formik.touched.leveyBillName &&
                        !formik.errors.leveyBillName
                      }
                      isInvalid={
                        formik.touched.leveyBillName &&
                        formik.errors.leveyBillName
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.leveyBillName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="dueDate" as={Col} hasValidation>
                    <Form.Label className="form__label">Due Date</Form.Label>
                    <Form.Control
                      className="p-3 rounded-0"
                      type="date"
                      name="dueDate"
                      placeholder="dueDate"
                      value={formik.values.dueDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={formik.touched.dueDate && !formik.errors.dueDate}
                      isInvalid={
                        formik.touched.dueDate && formik.errors.dueDate
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.dueDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group controlId="amount" as={Col} hasValidation>
                    <Form.Label className="form__label">Amount</Form.Label>
                    <Form.Control
                      className="p-3 rounded-0"
                      type="number"
                      name="amount"
                      placeholder="amount"
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={formik.touched.amount && !formik.errors.amount}
                      isInvalid={formik.touched.amount && formik.errors.amount}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="attachmetn" as={Col} hasValidation>
                    <Form.Label className="form__label">Attachment</Form.Label>
                    <Form.Control
                      className="rounded-0"
                      type="file"
                      name="attachmetn"
                      id="collegImg"
                      // value={formik.values.image}
                      onChange={(e) => handleFormikFileChange(e, formik)}
                      style={{ display: "none" }}
                    />
                    <br />
                    <div>
                      <label for="collegImg">
                        <FontAwesomeIcon
                          icon={faArrowUpFromBracket}
                          style={{ fontSize: "1.3rem", marginRight: "1rem" }}
                        />
                      </label>
                      <a href={file}>Download</a>
                    </div>
                  </Form.Group>
                </Form.Row>
              </Form>
            )}
          </Formik>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Levey/Bill Name</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Attachment</th>
                <th>Status</th>
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
                        <span style={{ color: "green" }}>Paid</span>
                      ) : (
                        <span style={{ color: "red" }}>UnPaid</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLeveyModalClose}>
            Close
          </Button>
          <Button className="button" type="submit" form="scholorshiperro">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
