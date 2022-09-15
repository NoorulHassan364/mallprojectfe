import { faEye, faPaperPlane, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Col, Form, Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import api from '../../../api';

const InstituteScholorships = () => {
    const [scholorships, setScholorships] = useState([]);
    const [scholorshipModal, setscholorshipModal] = useState(false);
    const [applicantModal, setApplicantModal] = useState(false);
    const [selectedItem, setselectedItem] = useState(null);


    const validSchema = Yup.object().shape({
        name: Yup.string().required("required"),
        price: Yup.string().required("required"),
        location: Yup.string().required("required"),
        minimumGpa: Yup.string().required("required"),
        degree: Yup.string(),
        deadline: Yup.string(),
    });

    const columns = [
        {
            name: "Scholorship",
            selector: (row) => row.name,
            sortable: true,
            grow: 2,
        },
        {
            name: "Location",
            selector: (row) => row.location,
            sortable: true,
            grow: 2,
        },
        {
            name: "Degree",
            selector: (row) => row.degree,
            sortable: true,
            grow: 2,
        },
        {
            name: "Price",
            selector: (row) => row.price,
            sortable: true,
            grow: 2,
        },
        {
            name: "Minimum GPA",
            selector: (row) => row.minimumGpa,
            sortable: true,
            grow: 2,
        },
        {
            name: "Deadline",
            selector: (row) => row.deadline,
            sortable: true,
            grow: 2,
        },
        {
            name: "Actions",
            // selector: (row) => row.deadline,
            cell: (row, index, column, id) => {
                return <>
                    <FontAwesomeIcon icon={faPencil} style={{ color: "blue", marginRight: "0.5rem", cursor: "pointer" }} onClick={() => handleEditScholoship(row)} />

                    <FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} onClick={() => deleteScholorship(row)} />
                </>;
            },
            sortable: true,
            grow: 2,
        },
        {
            name: "Applications",
            // selector: (row) => row.deadline,
            cell: (row, index, column, id) => {
                return <FontAwesomeIcon style={{ fontSize: "1rem", cursor: "pointer", color: "blue" }} icon={faEye} onClick={() => {
                    setselectedItem(row)
                    setApplicantModal(true)
                }} />;
            },
            sortable: true,
            grow: 2,
        },
    ];

    const applicantColumns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            grow: 2,
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
            sortable: true,
            grow: 2,
        },
        {
            name: "email",
            selector: (row) => row.email,
            sortable: true,
            grow: 2,
        },
        {
            name: "address",
            selector: (row) => row.address,
            sortable: true,
            grow: 2,
        },
    ];


    const handleEditScholoship = (item) => {
        setselectedItem(item);
        setscholorshipModal(true);
    }

    const getScholorships = async (user) => {
        try {
            let res = await api.get(`/scholorship/college/${user?._id}`);
            setScholorships(res.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteScholorship = async (item) => {
        try {
            await api.delete(`/scholorship/${item._id}`);
            let user = JSON.parse(localStorage.getItem("user"));
            getScholorships(user);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleScholorshipModalClose = () => {
        setscholorshipModal(false);
        setselectedItem(null);
    }

    const onscholorshiperSubmit = async (values, resetForm) => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            values.user = user._id;
            if (selectedItem) {
                await api.patch(`/scholorship/${selectedItem?._id}`, values);
            } else {
                await api.post(`/scholorship`, values);
            }
            getScholorships(user);
            setscholorshipModal(false);
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        getScholorships(user);
    }, [])
    return (
        <div className='container-fluid shadow college_container' >
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <h4 style={{ color: "grey", marginTop: "0.4rem" }}>Scholorships</h4>
                <Button style={{ marginTop: "0.4rem" }} onClick={() => setscholorshipModal(true)}>Add Scholorship</Button>
            </div>
            <hr />
            <div>
                <DataTable
                    data={scholorships}
                    columns={columns}
                    highlightOnHover
                    responsive
                    pagination
                    paginationPerPage={20}
                    paginationRowsPerPageOptions={[20, 25, 50, 100]}
                />
            </div>

            <Modal
                show={scholorshipModal}
                onHide={handleScholorshipModalClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Scholorship
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={(values, { resetForm }) => {
                            onscholorshiperSubmit(values, resetForm)
                        }}
                        validationSchema={validSchema}
                        enableReinitialize
                        initialValues={{
                            name: "",
                            price: "",
                            location: "",
                            minimumGpa: "",
                            degree: "",
                            deadline: ""
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit} id="scholorshiperro">
                                <Form.Row>
                                    <Form.Group controlId="name" as={Col} hasValidation>
                                        <Form.Label className="form__label">name</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="name"
                                            placeholder="Please Enter Your name"
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

                                    <Form.Group controlId="price" as={Col} hasValidation>
                                        <Form.Label className="form__label">price</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="price"
                                            placeholder="Please Enter Your price"
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
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group controlId="location" as={Col} hasValidation>
                                        <Form.Label className="form__label">location</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="location"
                                            placeholder="Please Enter Your location"
                                            value={formik.values.location}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.location && !formik.errors.location}
                                            isInvalid={formik.touched.location && formik.errors.location}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.location}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="minimumGpa" as={Col} hasValidation>
                                        <Form.Label className="form__label">minimumGpa</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="minimumGpa"
                                            placeholder="Please Enter Your minimumGpa"
                                            value={formik.values.minimumGpa}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.minimumGpa && !formik.errors.minimumGpa}
                                            isInvalid={formik.touched.minimumGpa && formik.errors.minimumGpa}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.minimumGpa}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group controlId="degree" as={Col} hasValidation>
                                        <Form.Label className="form__label">degree</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="degree"
                                            placeholder="Please Enter Your degree"
                                            value={formik.values.degree}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.degree && !formik.errors.degree}
                                            isInvalid={formik.touched.degree && formik.errors.degree}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.degree}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="deadline" as={Col} hasValidation>
                                        <Form.Label className="form__label">deadline</Form.Label>
                                        <Form.Control
                                            className="rounded-0"
                                            type="date"
                                            name="deadline"
                                            value={formik.values.deadline}
                                            onChange={formik.handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.deadline}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleScholorshipModalClose}>
                        Close
                    </Button>
                    <Button className="button" type="submit" form="scholorshiperro">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={applicantModal}
                onHide={() => setApplicantModal(false)}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Applicants
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DataTable
                        data={selectedItem?.applications}
                        columns={applicantColumns}
                        highlightOnHover
                        responsive
                        pagination
                        paginationPerPage={20}
                        paginationRowsPerPageOptions={[20, 25, 50, 100]}
                    />
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default InstituteScholorships;
