import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Col, Form, Button, Modal } from 'react-bootstrap';
import api from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const validSchema = Yup.object().shape({
        firstName: Yup.string().required("required"),
        lastName: Yup.string().required("required"),
        email: Yup.string().email().required("required"),
        phone: Yup.string()
            .min(10, "At Least 11 digits").max(10, "Too long").required("required"),
        address: Yup.string().required("required"),
        message: Yup.string().required("required"),
    });

    const handleContactSubmit = async (values, resetForm) => {
        try {
            await api.post(`/contactUs`, values);
            toast("Thanks for the Contact Us!")
            resetForm()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{}} className='shadow contact_page'>
            <h4 style={{ marginBottom: '1rem' }}>Get in Touch!</h4>
            <Formik
                onSubmit={(values, { resetForm }) => {
                    handleContactSubmit(values, resetForm)
                }}
                validationSchema={validSchema}
                enableReinitialize
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    message: '',
                }}
            >
                {(formik) => (
                    <Form onSubmit={formik.handleSubmit} id="scholorshiperro">
                        <Form.Row>
                            <Form.Group controlId="firstName" as={Col} hasValidation>
                                <Form.Label className="form__label">First Name</Form.Label>
                                <Form.Control
                                    className="p-3 rounded-0"
                                    type="text"
                                    name="firstName"
                                    placeholder="Please Enter Your firstName"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isValid={formik.touched.firstName && !formik.errors.firstName}
                                    isInvalid={formik.touched.firstName && formik.errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="lastName" as={Col} hasValidation>
                                <Form.Label className="form__label">Last Name</Form.Label>
                                <Form.Control
                                    className="p-3 rounded-0"
                                    type="text"
                                    name="lastName"
                                    placeholder="Please Enter Your lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isValid={formik.touched.lastName && !formik.errors.lastName}
                                    isInvalid={formik.touched.lastName && formik.errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="email" as={Col} hasValidation>
                                <Form.Label className="form__label">email</Form.Label>
                                <Form.Control
                                    className="p-3 rounded-0"
                                    type="text"
                                    name="email"
                                    placeholder="Please Enter Your email"
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

                            <Form.Group controlId="phone" as={Col} hasValidation>
                                <Form.Label className="form__label">phone</Form.Label>
                                <Form.Control
                                    className="p-3 rounded-0"
                                    type="number"
                                    name="phone"
                                    placeholder="Please Enter Your phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isValid={formik.touched.phone && !formik.errors.phone}
                                    isInvalid={formik.touched.phone && formik.errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="address" as={Col} hasValidation>
                                <Form.Label className="form__label">address</Form.Label>
                                <Form.Control
                                    className="p-3 rounded-0"
                                    type="text"
                                    name="address"
                                    placeholder="Please Enter Your address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isValid={formik.touched.address && !formik.errors.address}
                                    isInvalid={formik.touched.address && formik.errors.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.address}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="message" as={Col} hasValidation>
                                <Form.Label className="form__label">message</Form.Label>
                                <Form.Control
                                    className="p-3 rounded-0"
                                    as="textarea"
                                    // type="text"
                                    name="message"
                                    placeholder="Please Enter Your message"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isValid={formik.touched.message && !formik.errors.message}
                                    isInvalid={formik.touched.message && formik.errors.message}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Button className="button" type="submit" form="scholorshiperro" style={{ width: '7rem' }}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ContactUs;