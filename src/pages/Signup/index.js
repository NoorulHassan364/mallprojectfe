import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Form,
  Container,
  Button,
  Alert,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import signupImg from "../../assets/images/signupImg.png";

const Index = () => {
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const validSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: Yup.string()
      .required("required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email: Yup.string().email().required("required"),
    password: Yup.string().required("required").min(6, "At Least 6 digits"),
    phone: Yup.string()
      .min(10, "At Least 11 digits")
      .max(10, "Too long")
      .required("required"),
    gender: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

  const onSubmit = async (values, resetForm) => {
    try {
      values.userType = "user";
      const res = await api.post("/auth/signup", {
        ...values,
        role: "user",
      });
      console.log("res", res);
      // history.push('/signIn');
      navigate("/signIn");
    } catch (err) {
      setAlert(true);
      console.log("err", err);
    }
    resetForm();
  };

  return (
    <>
      <section className="section-signin">
        <Container>
          <Row className="signup_form1">
            <Col md={6} sm={12}>
              <h6 className="text-center signup_heading1">
                Let's help you discover your
                <br /> next comfort zone!
              </h6>

              <img className="img-fluid" src={signupImg} alt="" />
            </Col>

            <Col md={6} sm={12}>
              <p className="signup_heading2">
                Welcome Tell us a bit about your self!
              </p>
              <Formik
                onSubmit={(values, { resetForm }) =>
                  onSubmit(values, resetForm)
                }
                validationSchema={validSchema}
                enableReinitialize
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  phone: "",
                  gender: "",
                  address: "",
                }}
              >
                {(formik) => (
                  <Form onSubmit={formik.handleSubmit} id="user-register">
                    <Form.Row>
                      <Form.Group controlId="firstName" as={Col} hasValidation>
                        <Form.Label className="form__label">
                          First Name
                        </Form.Label>
                        <Form.Control
                          className="p-3 rounded-0"
                          type="text"
                          name="firstName"
                          placeholder="Enter Your First Name"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isValid={
                            formik.touched.firstName && !formik.errors.firstName
                          }
                          isInvalid={
                            formik.touched.firstName && formik.errors.firstName
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="lastName" as={Col} hasValidation>
                        <Form.Label className="form__label">
                          lastName
                        </Form.Label>
                        <Form.Control
                          className="p-3 rounded-0"
                          type="text"
                          name="lastName"
                          placeholder="Enter Your Last Name"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isValid={
                            formik.touched.lastName && !formik.errors.lastName
                          }
                          isInvalid={
                            formik.touched.lastName && formik.errors.lastName
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group controlId="email" as={Col} hasValidation>
                        <Form.Label className="form__label">Email</Form.Label>
                        <Form.Control
                          className="p-3 rounded-0"
                          type="text"
                          name="email"
                          placeholder="Enter Your Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isValid={formik.touched.email && !formik.errors.email}
                          isInvalid={
                            formik.touched.email && formik.errors.email
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="password" as={Col} hasValidation>
                        <Form.Label className="form__label">
                          Password
                        </Form.Label>
                        <Form.Control
                          className="p-3 rounded-0"
                          type="password"
                          name="password"
                          placeholder="Enter Your Password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isValid={
                            formik.touched.password && !formik.errors.password
                          }
                          isInvalid={
                            formik.touched.password && formik.errors.password
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group controlId="phone" as={Col} hasValidation>
                        <Form.Label className="form__label">phone</Form.Label>
                        <Form.Control
                          className="p-3 rounded-0"
                          type="number"
                          name="phone"
                          min={11}
                          placeholder="Enter Your phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isValid={formik.touched.phone && !formik.errors.phone}
                          isInvalid={
                            formik.touched.phone && formik.errors.phone
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="gender" as={Col} hasValidation>
                        <Form.Label className="form__label">Gender</Form.Label>
                        <Form.Control
                          className="rounded-0"
                          as="select"
                          name="gender"
                          placeholder="Enter Gender"
                          value={formik.values.gender}
                          onChange={(e) => formik.handleChange(e)}
                          onBlur={formik.handleBlur}
                          isValid={
                            formik.touched.gender && !formik.errors.gender
                          }
                          isInvalid={
                            formik.touched.gender && formik.errors.gender
                          }
                          custom
                        >
                          <option value="" disabled>
                            CHOOSE
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.gender}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group controlId="address" as={Col} hasValidation>
                        <Form.Label className="form__label">Address</Form.Label>
                        <Form.Control
                          className="rounded-0"
                          style={{ height: "100px" }}
                          type="textarea"
                          as="textarea"
                          name="address"
                          placeholder="Enter address"
                          value={formik.values.address}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isValid={
                            formik.touched.address && !formik.errors.address
                          }
                          isInvalid={
                            formik.touched.address && formik.errors.address
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Button
                      className="button  button btn-block rounded-0"
                      type="submit"
                      form="user-register"
                    >
                      Signup
                    </Button>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Index;
