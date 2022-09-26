import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Row, Col, Form, Container, Button, Alert, Tabs, Tab, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from "@stripe/stripe-js";

const ApplicationForm = () => {
    const { collegeId } = useParams();
    const [college, setCollege] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [loading, setLoading] = useState(null);

    const validSchema = Yup.object().shape({
        firstName: Yup.string().required("required"),
        lastName: Yup.string().required("required"),
        email: Yup.string().email().required("required"),
        phone: Yup.string().required("Required"),
        gender: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        dob: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        postalCode: Yup.string().required("Required"),
        courseOfStudy: Yup.string().required("Required"),
        cninc: Yup.string().required("Required")

    });

    const getCollege = async (values) => {
        try {
            let res = await api.get(`/college/${collegeId}`);
            setCollege(res.data.data)
        }
        catch (err) {
            console.log(err)
        }
    };

    const onSubmitAdmission = async (values) => {
        debugger;
        try {
            setLoading(true);
            let user = JSON.parse(localStorage.getItem("user"))._id;
            const session = await api.post(`/admission/checkout-session/${collegeId}/${user}`, values);
            console.log("session", session);
            const stripePromise = loadStripe(
                "pk_test_51LjOurH1uE3Pyj5r2rWw7W5rNMExIlJP15fbAMOB02EdkqqXyTqTkD6wx1WP73BCCbfIcPgqud0Cj9VfL1fy917N00owLZAUUJ"
            );

            const stripe = await stripePromise;
            await stripe.redirectToCheckout({
                sessionId: session.data.session.id
            })
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            console.log(err)
        }
    };

    const handleFormikFileChange = (e, formik, type) => {
        setDocuments(e.target.files[0]);
    }
    useEffect(() => {
        getCollege();
    }, [collegeId])
    return (
        <div className='container-fluid shadow college_container' >
            <h4 style={{ padding: "0.5rem", color: "grey" }}>Application Form: {college?.name}</h4>
            <hr />
            <div>
                <Formik
                    onSubmit={(values, { resetForm }) => onSubmitAdmission(values, resetForm)}
                    validationSchema={validSchema}
                    enableReinitialize
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        gender: '',
                        address: '',
                        state: '',
                        dob: '',
                        city: '',
                        postalCode: '',
                        courseOfStudy: '',
                        cninc: '',
                        secondarySchool1: '',
                        secondarySchool2: '',
                        secodarySchollAdress1: '',
                        secodarySchollAdress2: '',
                        secodarySchollSession1: '',
                        secodarySchollSession2: ''
                    }}
                >
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit} id="user-register" className='applicationForm'>
                            <h5 className='mb-2' style={{ backgroundColor: "#edeaea", padding: "0.5rem" }}>Personal Information</h5>
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
                                        type="phone"
                                        name="phone"
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
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="address"
                                        placeholder="Enter Your Last Name"
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

                            <Form.Row>
                                <Form.Group controlId="state" as={Col} hasValidation>
                                    <Form.Label className="form__label">State/Province</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="state"
                                        placeholder="Enter Your Last Name"
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.state && !formik.errors.state}
                                        isInvalid={formik.touched.state && formik.errors.state}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group controlId="city" as={Col} hasValidation>
                                    <Form.Label className="form__label">City</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="city"
                                        placeholder="Enter Your Last Name"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.city && !formik.errors.city}
                                        isInvalid={formik.touched.city && formik.errors.city}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group controlId="postalCode" as={Col} hasValidation>
                                    <Form.Label className="form__label">Postal/Zip code</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="postalCode"
                                        placeholder="postalCode"
                                        value={formik.values.postalCode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.postalCode && !formik.errors.postalCode}
                                        isInvalid={formik.touched.postalCode && formik.errors.postalCode}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.postalCode}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="dob" as={Col} hasValidation>
                                    <Form.Label className="form__label">Date of Birth</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="date"
                                        name="dob"
                                        placeholder="dob"
                                        value={formik.values.dob}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.dob && !formik.errors.dob}
                                        isInvalid={formik.touched.dob && formik.errors.dob}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.dob}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <h5 className='mb-2 mt-2' style={{ backgroundColor: "#edeaea", padding: "0.5rem" }}>Education Background:</h5>
                            <div>
                                <Form.Row>
                                    <Form.Group controlId="secondarySchool1" as={Col} hasValidation>
                                        <Form.Label className="form__label">Name of secondary School/College/University</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="secondarySchool1"
                                            placeholder="secondarySchool1"
                                            value={formik.values.secondarySchool1}
                                            onChange={formik.handleChange}
                                        />
                                        <Form.Control
                                            className="p-3 rounded-0 mt-3"
                                            type="text"
                                            name="secondarySchool2"
                                            placeholder="secondarySchool2"
                                            value={formik.values.secondarySchool2}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="secodarySchollAdress1" as={Col} hasValidation>
                                        <Form.Label className="form__label">Address</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="secodarySchollAdress1"
                                            placeholder="Address"
                                            value={formik.values.secodarySchollAdress1}
                                            onChange={formik.handleChange}

                                        />
                                        <Form.Control
                                            className="p-3 rounded-0 mt-3"
                                            type="text"
                                            name="secodarySchollAdress2"
                                            placeholder="Address"
                                            value={formik.values.secodarySchollAdress2}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="secodarySchollSession1" as={Col} hasValidation>
                                        <Form.Label className="form__label">secodarySchollSession1</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="secodarySchollSession1"
                                            placeholder="secodarySchollSession1"
                                            value={formik.values.secodarySchollSession1}
                                            onChange={formik.handleChange}

                                        />
                                        <Form.Control
                                            className="p-3 rounded-0 mt-3"
                                            type="text"
                                            name="secodarySchollSession2"
                                            placeholder="secodarySchollSession2"
                                            value={formik.values.secodarySchollSession2}
                                            onChange={formik.handleChange}
                                        />
                                    </Form.Group>
                                </Form.Row>
                            </div>
                            <h5 className='mb-2 mt-2' style={{ backgroundColor: "#edeaea", padding: "0.5rem" }}>Course of Study Applied for:</h5>
                            <Form.Row>
                                <Form.Group controlId="courseOfStudy" as={Col} hasValidation>
                                    <Form.Label className="form__label">Select Course</Form.Label>
                                    <Form.Control
                                        className="rounded-0"
                                        as="select"
                                        name="courseOfStudy"
                                        placeholder="Enter courseOfStudy"
                                        value={formik.values.courseOfStudy}
                                        onChange={(e) => formik.handleChange(e)}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.courseOfStudy && !formik.errors.courseOfStudy}
                                        isInvalid={formik.touched.courseOfStudy && formik.errors.courseOfStudy}
                                        custom
                                    >

                                        <option value="" disabled>CHOOSE</option>
                                        {
                                            college?.degreeAndPrograms?.map((program, i) => {

                                                return program?.titles?.map((subject) => {
                                                    return <option value={subject?.name}>{subject?.name}</option>
                                                })

                                            })
                                        }

                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.courseOfStudy}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="cninc" as={Col} hasValidation>
                                    <Form.Label className="form__label">Cnic/B-Form</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="cninc"
                                        placeholder="Enter Your Last Name"
                                        value={formik.values.cninc}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.cninc && !formik.errors.cninc}
                                        isInvalid={formik.touched.cninc && formik.errors.cninc}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.cninc}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group controlId="courseOfStudy" as={Col} hasValidation>
                                    <Form.Label className="form__label">Attach PDF of Scan documents of (matric/inter)</Form.Label>
                                    <Form.Control
                                        className="rounded-0"
                                        type="file"
                                        name="prospectus"
                                        // value={selectPic}
                                        onChange={e => handleFormikFileChange(e, formik, "documents")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.courseOfStudy}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            {
                                loading ?
                                    <Button className="button  button btn-block rounded-0" type="submit" form="user-register" style={{ width: "10rem", }}>
                                        Submit  <Spinner animation="border" size="sm" />
                                    </Button>

                                    :
                                    <Button className="button  button btn-block rounded-0" type="submit" form="user-register" style={{ width: "10rem", }}>
                                        Submit
                                    </Button>
                            }

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ApplicationForm;