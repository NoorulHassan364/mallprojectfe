import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Container, Button, Alert, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalInfo = () => {
    const [user, setUser] = useState(null);
    const validSchema = Yup.object().shape({
        firstName: Yup.string().required("required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
        lastName: Yup.string().required("required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
        email: Yup.string().email().required("required"),
        phone: Yup.string()
            .min(10, "At Least 11 digits ").max(10, "Too long").required("required"),
        gender: Yup.string().required("Required"),
        address: Yup.string().required("Required"),

    });
    const validSchemaPassword = Yup.object().shape({
        oldPassword: Yup.string().required("required").min(6, "At Least 6 digits"),
        newPassword: Yup.string().required("required").min(6, "At Least 6 digits"),
        confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Passwords must match").required("required").min(6, "At Least 6 digits"),
    });

    const onSubmit = async (values, resetForm) => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            const res = await api.patch(`/auth/updateUser/${user?._id}`, values);
            toast("Updated Successfully!")
            getUser();
        }
        catch (err) {
            console.log("err", err);
        }
        resetForm()
    }

    const onSubmitChangePassword = async (values, resetForm) => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            const res = await api.patch(`/auth/changePassword/${user?._id}`, values);
            toast("Updated Successfully!")
        }
        catch (err) {
            console.log("err", err);
        }
        resetForm()
    }

    const getUser = async () => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            const res = await api.get(`/auth/getUser/${user?._id}`);
            setUser(res.data.data);
        }
        catch (err) {
            console.log("err", err);
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <div className='container-fluid shadow college_container' >
            <div style={{ display: "flex", alignItems: "center" }}>
                <h4 style={{ color: "grey" }}>Personal Info</h4>
            </div>
            <hr />
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="profile" title="Profile" style={{ backgroundColor: "white" }}>
                    <Formik
                        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                        validationSchema={validSchema}
                        enableReinitialize
                        initialValues={{
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                            email: user?.email,
                            phone: user?.phone,
                            gender: user?.gender,
                            address: user?.address,
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit} id="user-register" className='personalInfo'>
                                <Form.Row >
                                    <Form.Group controlId="firstName" as={Col} hasValidation>
                                        <Form.Label className="form__label">First Name</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter Your First Name"
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
                                        <Form.Label className="form__label">lastName</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter Your Last Name"
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
                                        <Form.Label className="form__label">Email</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="email"
                                            disabled
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
                                            isInvalid={formik.touched.phone && formik.errors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>

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
                                            isValid={formik.touched.gender && !formik.errors.gender}
                                            isInvalid={formik.touched.gender && formik.errors.gender}
                                            custom
                                        >
                                            <option value="" disabled>CHOOSE</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.gender}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="address" as={Col} hasValidation>
                                        <Form.Label className="form__label">Address</Form.Label>
                                        <Form.Control
                                            className="rounded-0"
                                            style={{ height: '100px' }}
                                            type="textarea"
                                            as="textarea"
                                            name="address"
                                            placeholder="Enter address"
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
                                </Form.Row>
                                <Button className="button  button btn-block rounded-0" type="submit" form="user-register" style={{ width: "10rem", }}>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Tab>
                <Tab eventKey="password" title="Password" style={{ backgroundColor: "white" }}>
                    <Formik
                        onSubmit={(values, { resetForm }) => onSubmitChangePassword(values, resetForm)}
                        validationSchema={validSchemaPassword}
                        enableReinitialize
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit} id="user-password" style={{ width: "30rem" }}>
                                <Form.Group controlId="oldPassword" as={Col} hasValidation>
                                    <Form.Label className="form__label">Old Password</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="oldPassword"
                                        placeholder="Enter old password"
                                        value={formik.values.oldPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.oldPassword && !formik.errors.oldPassword}
                                        isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.oldPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="newPassword" as={Col} hasValidation>
                                    <Form.Label className="form__label">newPassword</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="newPassword"
                                        placeholder="Enter new password"
                                        value={formik.values.newPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.newPassword && !formik.errors.newPassword}
                                        isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.newPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="confirmPassword" as={Col} hasValidation>
                                    <Form.Label className="form__label">confirmPassword</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="confirmPassword"
                                        placeholder="Enter confirm password"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
                                        isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button className="button  button btn-block rounded-0" type="submit" form="user-password" style={{ width: "10rem", }}>
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Tab>
            </Tabs>
        </div>

    )
};

export default PersonalInfo;