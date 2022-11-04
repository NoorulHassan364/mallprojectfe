import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusLarge } from "@fortawesome/sharp-solid-svg-icons";
import React, { useEffect } from "react";
import { Table, Button, Modal, Form, Col } from "react-bootstrap";
import api from "../../../api";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";

const Categories = () => {
  const [categoryModal, setcategoryModal] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(null);

  const validSchema = Yup.object().shape({
    name: Yup.string().required("required"),
  });

  const handlecategoryModalClose = () => {
    setcategoryModal(false);
    setCategory(null);
  };

  const handleEditCategory = (cat) => {
    setcategoryModal(true);
    setCategory(cat);
  };

  const handleAddCategory = (cat) => {
    setcategoryModal(true);
  };

  const handleAddCategorySubmit = async (values) => {
    if (category) {
      try {
        await api.patch(`/admin/category/${category?._id}`, values);
        getCategories();
        handlecategoryModalClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await api.post(`/admin/category`, values);
        getCategories();
        handlecategoryModalClose();
      } catch (error) {
        console.log(error);
      }
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

  const deleteCategory = async (id) => {
    try {
      let res = await api.delete(`/admin/category/${id}`);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container-fluid shadow college_container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h4 style={{ color: "grey" }}>Categories</h4>
        <FontAwesomeIcon
          icon={faPlusLarge}
          style={{ color: "blue", fontSize: "1.5rem" }}
          onClick={() => handleAddCategory()}
        />
      </div>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{ color: "green" }}
                    onClick={() => handleEditCategory(el)}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "red" }}
                    onClick={() => deleteCategory(el?._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal
        show={categoryModal}
        onHide={handlecategoryModalClose}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {category ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={(values, { resetForm }) => {
              handleAddCategorySubmit(values, resetForm);
            }}
            validationSchema={validSchema}
            enableReinitialize
            initialValues={{
              name: category?.name,
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
                    <Form.Label className="form__label">
                      Category Name
                    </Form.Label>
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
                </Form.Row>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlecategoryModalClose}>
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

export default Categories;
