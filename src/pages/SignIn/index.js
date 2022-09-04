import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Container, Button, Alert, Tabs, Tab, Modal, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

const Index = () => {
    const { isLogin, loginSuccess } = useContext(AuthContext);
    const [showPasword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const validSchema = Yup.object().shape({
        email: Yup.string().email().required("required"),
        password: Yup.string().required("required"),
    });

    const resetPasswordvalidSchema = Yup.object().shape({
        email: Yup.string().email().required("required"),
    });

    const onSubmit = async (values) => {
        try {
            let res = await api.post("/auth/login", {
                ...values
            });
            loginSuccess(res.data.token, res.data.user)
            if (res.data.user.userType == "student") {
                navigate("/userDashboard/colleges")
            } else {
                navigate("/institute/profile")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    // const handleShowPassword = () => {
    //     showPasword ? setShowPassword(false) : setShowPassword(true)
    // }

    // const handleResetPasswordEmail = async (values, clearForm) => {
    //     setIsLoading(true);
    //     console.log("values", values);
    //     try {
    //         const res = await api.post("/users/user/resetPassword", {
    //             ...values
    //         });
    //         console.log(res);
    //         setResetPasswordDangerAlert(false)
    //         setResetPasswordSuccessAlert(true)
    //         clearForm({ values: "" })
    //         setIsLoading(false);
    //         setTabKey('resetpasswordMessage')
    //         // handleResetPasswordModalClose();
    //     }
    //     catch (err) {
    //         console.log(err)
    //         setResetPasswordSuccessAlert(false)
    //         setResetPasswordDangerAlert(true)
    //         setIsLoading(false);
    //     }
    // }
    return (
        <section className="section-signin">
            <Container >
                <Row style={{ padding: '3rem' }}>
                    <Col md={6} sm={12} className='signin_col1'>
                        <h6 className='text-center sigin_heading1'>Welcome Back</h6>
                        <br />
                        <p className='sigin_heading2'>Let’s face it, college is a big deal. From <br /> applications to stepping on campus, Cappex <br /> has your back every step of the way.</p>
                    </Col>

                    <Col md={6} sm={12}>
                        <p className='signup_heading2'>Login to App!</p>
                        <Formik
                            onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                            validationSchema={validSchema}
                            enableReinitialize
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                        >
                            {(formik) => (
                                <Form onSubmit={formik.handleSubmit} id="user-register">
                                    {/* <Form.Row> */}
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
                                            isInvalid={formik.touched.email && formik.errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="password" as={Col} hasValidation>
                                        <Form.Label className="form__label">Password</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="password"
                                            name="password"
                                            placeholder="Enter Your Password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.password && !formik.errors.password}
                                            isInvalid={formik.touched.password && formik.errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Check
                                        type="checkbox"
                                        id="customControlAutosizing"
                                        label="Remember me"
                                        style={{ marginTop: '1rem', marginBottom: '1rem' }}
                                        custom
                                    />
                                    {/* </Form.Row> */}

                                    <Button
                                        style={{ margin: 'auto', width: '16rem', }}
                                        className="button  button btn-block rounded-0" type="submit" form="user-register">
                                        Sign In
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default Index;
