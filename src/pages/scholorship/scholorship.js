import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Col, Form, Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import api from '../../api';

const Scholorship = () => {
    const [scholorships, setScholorships] = useState([]);
    const [scholorshipsCopy, setScholorshipsCopy] = useState([]);
    const [scholorshipModal, setscholorshipModal] = useState(false);
    const [selectedItem, setselectedItem] = useState(null);


    const validSchema = Yup.object().shape({
        name: Yup.string().email().required("required"),
        email: Yup.string().required("required"),
        phone: Yup.string().required("required"),
        adress: Yup.string().required("required"),
        // file: Yup.string(),
        currentUni: Yup.string(),
    });

    const columns = [
        {
            name: "Scholorship",
            selector: (row) => row.name,
            sortable: true,
            grow: 2,
        },
        {
            name: "Collge/Uni",
            selector: (row) => row.instituteName,
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
            name: "Apply",
            // selector: (row) => row.deadline,
            cell: (row, index, column, id) => {
                let user = JSON.parse(localStorage.getItem("user"));
                return row?.applications?.filter((el) => el?.userId == user?._id).length > 0 ?
                    <Button disabled>Applied</Button>
                    :
                    <Button onClick={() => onscholorshiperSubmit(row?._id)}>Apply</Button>
                    ;
            },
            sortable: true,
            grow: 2,
        },
    ];


    const getScholorships = async () => {
        try {
            let res = await api.get("/scholorship");
            setScholorships(res.data.data)
            setScholorshipsCopy(res.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleScholorshipModalClose = () => {
        setscholorshipModal(false);
    }

    const handleFormikFileChange = (e, formik) => {
        const file = e.target.files[0];
        formik.handleChange(e);
        console.log("file", file)
        // setInitialValues({ ...initialValues, photo: file });
        // setSelectPic(true)
    }

    const onscholorshiperSubmit = async (id) => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            let res = await api.post(`/scholorship/apply/${id}/${user?._id}`);
            getScholorships();
        }
        catch (err) {
            console.log(err)
        }
    }

    const onSubmitSearchCollege = (values, resetForm) => {
        if (values?.district == "" && values?.college == "") {
            setScholorships(scholorshipsCopy)
        } else if (values?.district == "" && values?.college !== "") {
            setScholorships(scholorshipsCopy?.filter(el => el.instituteName.toLowerCase().includes(values?.college?.toLowerCase())))
        }
        else if (values?.district !== "" && values?.college == "") {
            setScholorships(scholorshipsCopy?.filter(el => el.location.toLowerCase().includes(values.district.toLowerCase())))
        }
        else {
            setScholorships(scholorshipsCopy?.filter(el => el.location.toLowerCase().includes(values.district.toLowerCase()) && el.instituteName.toLowerCase().includes(values?.college?.toLowerCase())))
        }
    }

    useEffect(() => {
        // let user = JSON.parse(localStorage.getItem("user"));
        getScholorships();
    }, [])
    return (
        <div className='container-fluid shadow college_container' >
            <div style={{ display: "flex", alignItems: "center" }}>
                <h4 style={{ color: "grey" }}>Scholorships</h4>

            </div>
            <hr />
            <div>
                <DataTable
                    data={scholorships}
                    columns={columns}
                    highlightOnHover
                    responsive
                    pagination
                // paginationPerPage={20}
                // paginationRowsPerPageOptions={[20, 25, 50, 100]}
                />
            </div>

            <Modal
                show={scholorshipModal}
                onHide={handleScholorshipModalClose}
                centered
                size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Scholorship Application
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={(values, { resetForm }) => {
                            onscholorshiperSubmit(values, resetForm)
                        }}
                        // validationSchema={validSchema}
                        enableReinitialize
                    // initialValues={{
                    //     name: '',
                    //     email: '',
                    //     phone: '',
                    //     adress: '',
                    //     // file: '',
                    //     currentUni: ''
                    // }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit} id="scholorshiperro">
                                {/* <Form.Row>
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

                                    <Form.Group controlId="email" as={Col} hasValidation>
                                        <Form.Label className="form__label">Email</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="email"
                                            placeholder="Please Enter Your Email"
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
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group controlId="phone" as={Col} hasValidation>
                                        <Form.Label className="form__label">phone</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
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

                                    <Form.Group controlId="adress" as={Col} hasValidation>
                                        <Form.Label className="form__label">adress</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="adress"
                                            placeholder="Please Enter Your adress"
                                            value={formik.values.adress}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.adress && !formik.errors.adress}
                                            isInvalid={formik.touched.adress && formik.errors.adress}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.adress}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row> */}

                                <Form.Row>
                                    {/* <Form.Group controlId="currentUni" as={Col} hasValidation>
                                        <Form.Label className="form__label">currentUni</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="currentUni"
                                            placeholder="Please Enter Your currentUni"
                                            value={formik.values.currentUni}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.currentUni && !formik.errors.currentUni}
                                            isInvalid={formik.touched.currentUni && formik.errors.currentUni}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.currentUni}
                                        </Form.Control.Feedback>
                                    </Form.Group> */}

                                    <Form.Group controlId="file" as={Col} hasValidation>
                                        <Form.Label className="form__label">CV</Form.Label>
                                        <Form.Control
                                            className="rounded-0"
                                            type="file"
                                            name="file"
                                            // value={formik.values.photo}
                                            onChange={e => handleFormikFileChange(e, formik)}
                                        />
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
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Scholorship;