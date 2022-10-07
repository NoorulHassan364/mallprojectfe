import { faEye, faPaperPlane, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Col, Form, Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import api from '../../../api';

const PastPaper = () => {
    const [pastPapers, setpastPapers] = useState([]);
    const [pastPaperModel, setpastPaperModel] = useState(false);
    // const [applicantModal, setApplicantModal] = useState(false);
    const [selectedItem, setselectedItem] = useState(null);
    const [selecteDoc, setSelectedDoc] = useState(null);


    const validSchema = Yup.object().shape({
        subject: Yup.string().required("required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
        session: Yup.string().required("required"),
        classSemester: Yup.string().required("required"),
    });

    const columns = [
        {
            name: "Subject",
            selector: (row) => row.subject,
            sortable: true,
            grow: 2,
        },
        {
            name: "session",
            selector: (row) => row.session,
            sortable: true,
            grow: 2,
        },
        {
            name: "Class/Semester",
            selector: (row) => row.classSemester,
            sortable: true,
            grow: 2,
        },
        {
            name: "Document",
            selector: (row) => row.document,

            cell: (row, index, column, id) => {
                return <>
                    {row?.document ?
                        <a href={row?.document}>Download</a>
                        : null
                    }
                </>;
            },
            sortable: true,
            grow: 2,
        },
        {
            name: "Actions",
            // selector: (row) => row.deadline,
            cell: (row, index, column, id) => {
                return <>
                    <FontAwesomeIcon icon={faPencil} style={{ color: "blue", marginRight: "0.5rem", cursor: "pointer" }} onClick={() => handleEditPastPaper(row)} />

                    <FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} onClick={() => deletePastPaper(row)} />
                </>;
            },
            sortable: true,
            grow: 2,
        },
    ];

    const handleEditPastPaper = (item) => {
        setselectedItem(item);
        setpastPaperModel(true);
    }

    const getPastPapers = async (user) => {
        try {
            let res = await api.get(`/pastPaper/college/${user?._id}`);
            setpastPapers(res.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const deletePastPaper = async (item) => {
        try {
            await api.delete(`/pastPaper/${item._id}`);
            let user = JSON.parse(localStorage.getItem("user"));
            getPastPapers(user);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handlepastPaperModelClose = () => {
        setpastPaperModel(false);
        setselectedItem(null);
    }

    const onPastPaperSubmit = async (values, resetForm) => {
        debugger;
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            values.user = user._id;
            if (selecteDoc) {
                const formData = new FormData();
                for (const key in values) {
                    if (Array.isArray(values[key])) {
                        formData.append(key, JSON.stringify(values[key]));
                    } else {
                        if (values[key] !== null)
                            formData.append(key, values[key])
                    }
                }
                formData.append('document', selecteDoc);

                if (selectedItem) {
                    await api.patch(`/pastPaper/${selectedItem?._id}`, formData);
                    setselectedItem(null);
                    setSelectedDoc(null);
                } else {
                    await api.post(`/pastPaper`, formData);
                    setSelectedDoc(null);
                }
            } else {
                if (selectedItem) {
                    await api.patch(`/pastPaper/${selectedItem?._id}`, values);
                    setselectedItem(null);
                } else {
                    await api.post(`/pastPaper`, values);
                }
            }

            getPastPapers(user);
            setpastPaperModel(false);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleFormikFileChange = (e, formik, type) => {
        let file = e.target.files[0];
        setSelectedDoc(file);
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        getPastPapers(user);
    }, [])
    return (
        <div className='container-fluid shadow college_container' >
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <h4 style={{ color: "grey", marginTop: "0.4rem" }}>Past Papers</h4>
                <Button style={{ marginTop: "0.4rem" }} onClick={() => setpastPaperModel(true)}>Add Past Paper</Button>
            </div>
            <hr />
            <div>
                <DataTable
                    data={pastPapers}
                    columns={columns}
                    highlightOnHover
                    responsive
                    pagination
                    paginationPerPage={20}
                    paginationRowsPerPageOptions={[20, 25, 50, 100]}
                />
            </div>

            <Modal
                show={pastPaperModel}
                onHide={handlepastPaperModelClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Past Paper
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={(values, { resetForm }) => {
                            onPastPaperSubmit(values, resetForm)
                        }}
                        validationSchema={validSchema}
                        enableReinitialize
                        initialValues={{
                            subject: selectedItem?.subject,
                            session: selectedItem?.session,
                            classSemester: selectedItem?.classSemester,
                            document: selectedItem?.document,
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit} id="scholorshiperro">
                                <Form.Row>
                                    <Form.Group controlId="subject" as={Col} hasValidation>
                                        <Form.Label className="form__label">subject</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="subject"
                                            placeholder="Please Enter Your subject"
                                            value={formik.values.subject}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.subject && !formik.errors.subject}
                                            isInvalid={formik.touched.subject && formik.errors.subject}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.subject}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="session" as={Col} hasValidation>
                                        <Form.Label className="form__label">session</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="session"
                                            placeholder="Please Enter Your session"
                                            value={formik.values.session}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.session && !formik.errors.session}
                                            isInvalid={formik.touched.session && formik.errors.session}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.session}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group controlId="classSemester" as={Col} hasValidation>
                                        <Form.Label className="form__label">classSemester</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="classSemester"
                                            placeholder="Please Enter Your classSemester"
                                            value={formik.values.classSemester}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.classSemester && !formik.errors.classSemester}
                                            isInvalid={formik.touched.classSemester && formik.errors.classSemester}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.classSemester}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="document" as={Col} hasValidation>
                                        <Form.Label className="form__label">document</Form.Label>
                                        <Form.Control
                                            className="rounded-0"
                                            type="file"
                                            name="document"
                                            // value={selectPic}
                                            onChange={e => handleFormikFileChange(e, formik, "document")}
                                        />

                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlepastPaperModelClose}>
                        Close
                    </Button>
                    <Button className="button" type="submit" form="scholorshiperro">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PastPaper;
