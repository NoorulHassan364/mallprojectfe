import { Button, Col, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Formik } from 'formik';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import api from '../../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

const InstitutePrograms = () => {
    const [tags, setTags] = useState([]);
    const [programModal, setProgramModal] = useState(false);
    const [collegePrograms, setCollegePrograms] = useState(null);
    const [editProgram, setEditProgram] = useState(null);

    const handleChangeTags = (tag) => {
        setTags(tag);
    }

    const validSchema = Yup.object().shape({
        program: Yup.string().required("required")
    });

    const handleProgramModalClose = () => {
        setProgramModal(false);
        setTags([]);
        setEditProgram(null);
    }

    const onProgramSubmit = async (values) => {
        try {
            let user = JSON.parse(localStorage.getItem("user"))._id;
            let t = tags?.map(el => {
                return { name: el }
            })
            let programs = {
                subject: values?.program,
                titles: t
            }
            if (editProgram) {
                await api.patch(`/college/updateProgram/${user}/${editProgram?._id}`, programs);
            } else {
                await api.patch(`/college/addProgram/${user}`, programs);
            }
            getCollegePrograms();
            handleProgramModalClose();
        }
        catch (err) {
            console.log(err)
        }
    }
    const getCollegePrograms = async () => {
        try {
            let user = JSON.parse(localStorage.getItem("user"))._id;
            let res = await api.get(`/college/getPrograms/${user}`);
            setCollegePrograms(res.data.data);
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteProgram = async (pgm) => {
        try {
            let user = JSON.parse(localStorage.getItem("user"))._id;
            // let newprograms = collegePrograms?.degreeAndPrograms?.filter(el => el._id !== pgm._id)
            await api.patch(`/college/deleteProgram/${user}`, pgm);
            getCollegePrograms();
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleEditProgram = (pgm) => {
        setEditProgram(pgm);
        setTags(pgm?.titles.map(el => el.name))
        setProgramModal(true)
    }
    useEffect(() => {
        getCollegePrograms()
    }, [])

    return (
        <div className='container-fluid shadow college_container' >
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem" }}>
                <h5 style={{ color: "grey" }}>Programs/Subjects</h5>
                <Button onClick={() => setProgramModal(true)}>Add Program</Button>
            </div>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Programs</th>
                        <th>Subjects</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        collegePrograms?.degreeAndPrograms?.map((program, i) => {
                            return <tr>
                                <td>{program?.subject}</td>
                                <td>
                                    {program?.titles?.map((subject) => {
                                        return subject?.name + ",  "
                                    })}
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faPencil} style={{ color: "blue", marginRight: "0.5rem", cursor: "pointer" }} onClick={() => handleEditProgram(program)} />
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "red", cursor: "pointer" }} onClick={() => deleteProgram(program)} />
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>

            <Modal
                show={programModal}
                onHide={handleProgramModalClose}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editProgram ? "Edit Program" : "Add Program"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        onSubmit={(values, { resetForm }) => {
                            onProgramSubmit(values, resetForm)
                        }}
                        validationSchema={validSchema}
                        enableReinitialize
                        initialValues={{
                            program: editProgram?.subject,
                            // subjects: '',
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit} id="scholorshiperro">
                                <Form.Row>
                                    <Form.Group controlId="program" as={Col} hasValidation>
                                        <Form.Label className="form__label">Program</Form.Label>
                                        <Form.Control
                                            className="p-3 rounded-0"
                                            type="text"
                                            name="program"
                                            placeholder="Please Enter program"
                                            value={formik.values.program}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isValid={formik.touched.program && !formik.errors.program}
                                            isInvalid={formik.touched.program && formik.errors.program}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.program}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="subjects" as={Col} hasValidation>
                                        <Form.Label className="form__label">Subjects</Form.Label>
                                        <TagsInput value={tags} onChange={handleChangeTags} />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleProgramModalClose}>
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

export default InstitutePrograms;