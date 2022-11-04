import React from "react";
import {
  faArrowRight,
  faArrowUpFromBracket,
  faCartShopping,
  faPen,
  faTag,
  faTrash,
  faTShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimer } from "@fortawesome/sharp-solid-svg-icons";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../../api";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Col, Form, Modal } from "react-bootstrap";

const AdminShops = () => {
  const [shops, setShops] = useState(null);
  const [shopModal, setShopModal] = useState(false);

  const [selectPic, setSelectPic] = useState(null);
  const [file, setFile] = useState(null);
  const [editShop, setEditShop] = useState(null);

  const validSchema = Yup.object().shape({
    name: Yup.string().required("required"),
    price: Yup.string().required("required"),
    category: Yup.string().required("required"),
  });

  const handleFormikFileChange = (e, formik) => {
    let file = e.target.files[0];
    setSelectPic(file);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const onShopAddSubmit = async (values, resetForm) => {
    try {
      if (selectPic) {
        const formData = new FormData();
        for (const key in values) {
          if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            if (values[key] !== null) formData.append(key, values[key]);
          }
        }
        formData.append("photo", selectPic);
        await api.patch(`/admin/shop/${editShop?._id}`, formData);
      } else {
        await api.patch(`/admin/shop/${editShop?._id}`, values);
      }
      resetForm();
      handleShopModalClose();
      getShops();
    } catch (error) {
      console.log(error);
    }
  };

  const getShops = async () => {
    try {
      let res = await api.get(`/admin/shops`);
      setShops(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteShop = async (id) => {
    try {
      await api.delete(`/admin/shop/${id}`);
      getShops();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShopModalClose = () => {
    setShopModal(false);
  };

  const handleEditShop = (shop) => {
    setShopModal(true);
    setEditShop(shop);
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
        <h4 style={{ color: "grey" }}>Shops/Outlets</h4>
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
                        <span className="innerTextCollegeTitle">Status</span>
                        <span>
                          {el?.IsSold
                            ? `Sold by ${el?.client?.firstName}`
                            : "Available"}
                        </span>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
              <div class="collegeFavourite" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon
                  icon={faPen}
                  style={{ color: "green" }}
                  onClick={() => handleEditShop(el)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "red" }}
                  onClick={() => handleDeleteShop(el?._id)}
                />
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
          <Formik
            onSubmit={(values, { resetForm }) => {
              onShopAddSubmit(values, resetForm);
            }}
            validationSchema={validSchema}
            enableReinitialize
            initialValues={{
              name: editShop?.name,
              price: editShop?.price,
              category: editShop?.category,
            }}
          >
            {(formik) => (
              <Form
                onSubmit={formik.handleSubmit}
                id="scholorshiperro"
                style={{ padding: "1rem" }}
              >
                <Form.Row>
                  <Form.Group controlId="name" as={Col} hasValidation>
                    <Form.Label className="form__label">Shop Name</Form.Label>
                    <Form.Control
                      className="p-3 rounded-0"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={formik.touched.name && !formik.errors.name}
                      isInvalid={formik.touched.name && formik.errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="category" as={Col} hasValidation>
                    <Form.Label className="form__label">category</Form.Label>
                    <Form.Control
                      className="rounded-0"
                      as="select"
                      name="category"
                      placeholder="Enter category"
                      value={formik.values.category}
                      onChange={(e) => formik.handleChange(e)}
                      onBlur={formik.handleBlur}
                      isValid={
                        formik.touched.category && !formik.errors.category
                      }
                      isInvalid={
                        formik.touched.category && formik.errors.category
                      }
                      custom
                    >
                      <option value="" disabled>
                        CHOOSE
                      </option>
                      <option value="food">Food</option>
                      <option value="sports">SPORTS</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.category}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group controlId="price" as={Col} hasValidation>
                    <Form.Label className="form__label">Price</Form.Label>
                    <Form.Control
                      className="p-3 rounded-0"
                      type="number"
                      name="price"
                      placeholder="Price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isValid={formik.touched.price && !formik.errors.price}
                      isInvalid={formik.touched.price && formik.errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="image" as={Col} hasValidation>
                    <Form.Label className="form__label">Image</Form.Label>
                    <Form.Control
                      className="rounded-0"
                      type="file"
                      name="image"
                      id="collegImg"
                      // value={formik.values.image}
                      onChange={(e) => handleFormikFileChange(e, formik)}
                      style={{ display: "none" }}
                    />
                    <br />
                    <div style={{ display: "flex" }}>
                      <label for="collegImg">
                        <FontAwesomeIcon
                          icon={faArrowUpFromBracket}
                          style={{ fontSize: "1.3rem", marginRight: "1rem" }}
                        />
                      </label>
                      <img
                        style={{ width: "2rem" }}
                        src={file ? file : editShop?.image}
                        alt=""
                      />
                    </div>
                  </Form.Group>
                </Form.Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShopModalClose}>
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

export default AdminShops;
