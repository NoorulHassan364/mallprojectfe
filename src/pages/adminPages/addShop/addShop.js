import React, { useEffect, useState } from "react";
import { Button, Col, Form, Table } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../api";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const AddShop = () => {
  const [selectPic, setSelectPic] = useState(null);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

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
        await api.post(`/admin/shop`, formData);
        resetForm();
        navigate("/admin/shops");
      } else {
        window.alert("Please Select the Image");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      let res = await api.get(`/admin/category`);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container-fluid shadow college_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4 style={{ color: "grey" }}>Statistics</h4>
      </div>
      <hr />
      <div>
        <Formik
          onSubmit={(values, { resetForm }) => {
            onShopAddSubmit(values, resetForm);
          }}
          validationSchema={validSchema}
          enableReinitialize
          initialValues={{
            name: "",
            price: "",
            category: "",
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
                    isValid={formik.touched.category && !formik.errors.category}
                    isInvalid={
                      formik.touched.category && formik.errors.category
                    }
                    custom
                  >
                    <option value="" disabled>
                      CHOOSE
                    </option>
                    {categories?.map((el) => {
                      return <option value={el?.name}>{el?.name}</option>;
                    })}
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
                    placeholder="Price in USD"
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
                    <img style={{ width: "2rem" }} src={file} alt="" />
                  </div>
                </Form.Group>
              </Form.Row>

              <Button
                className="button  button btn-block rounded-0"
                type="submit"
                form="scholorshiperro"
                style={{ width: "7rem", margiTop: "1rem" }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddShop;
