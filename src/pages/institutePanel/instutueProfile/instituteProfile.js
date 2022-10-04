import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Table } from 'react-bootstrap';
import * as Yup from 'yup';
import api from '../../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

const InstituteProfile = () => {
    const [selectPic, setSelectPic] = useState(null);
    const [prospectus, setProspectus] = useState(null);
    const [collegeProfile, setCollegeProfile] = useState(null);

    const validSchema = Yup.object().shape({
        name: Yup.string().required("required"),
        averageCost: Yup.string().required("required"),
        avgGpa: Yup.string().required("required"),
        graduates: Yup.string().required("required"),
        underGraduates: Yup.string().required("required"),
        totalStudents: Yup.string().required("required"),
        totalTeachers: Yup.string().required("required"),
        location: Yup.string().required("required"),
        admissionFee: Yup.string().required("required"),
        // programs: Yup.string().required("required"),
        phone: Yup.string()
            .min(10, "At Least 11 digits").max(10, "Too long").required("required"),
        // image: Yup.string().required("required"),
        // prospectus: Yup.string().required("required")
    });

    const onCollegeProfileSubmit = async (values, resetForm) => {
        try {
            values.user = JSON.parse(localStorage.getItem("user"))._id;
            if (selectPic || prospectus) {
                const formData = new FormData();
                for (const key in values) {
                    if (Array.isArray(values[key])) {
                        formData.append(key, JSON.stringify(values[key]));
                    } else {
                        if (values[key] !== null)
                            formData.append(key, values[key])
                    }
                }
                if (selectPic) {
                    formData.append('photo', selectPic);
                }
                if (prospectus) {
                    formData.append('prospectus', prospectus);
                }
                if (collegeProfile) {
                    await api.patch(`/college/${collegeProfile?._id}`, formData);
                    setSelectPic(null)
                } else {
                    await api.post(`/college`, formData);
                }
            } else {
                if (collegeProfile) {
                    await api.patch(`/college/${collegeProfile?._id}`, values);
                    setSelectPic(null)
                } else {
                    await api.post(`/college`, values);
                }
            }
            getCollegeProfile();
        } catch (error) {
            console.log(error);
        }
    }

    const handleFormikFileChange = (e, formik, type) => {
        if (type == "img") {
            let file = e.target.files[0];
            setSelectPic(file);
        } else {
            let file = e.target.files[0];
            setProspectus(file);
        }

    }
    const getCollegeProfile = async () => {
        try {
            let user = JSON.parse(localStorage.getItem("user"))._id;
            let res = await api.get(`/college/getCollegeProfile/${user}`);
            setCollegeProfile(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCollegeProfile();
    }, [])
    return (
        <div className='container-fluid shadow college_container' >
            <div style={{ display: "flex", alignItems: "center" }}>
                <h4 style={{ color: "grey" }}>Collge/Uni Profile</h4>
            </div>
            <hr />
            <div>
                <Formik
                    onSubmit={(values, { resetForm }) => {
                        onCollegeProfileSubmit(values, resetForm)
                    }}
                    validationSchema={validSchema}
                    enableReinitialize
                    initialValues={{
                        name: collegeProfile?.name,
                        averageCost: collegeProfile?.averageCost,
                        avgGpa: collegeProfile?.avgGpa,
                        graduates: collegeProfile?.graduates,
                        underGraduates: collegeProfile?.graduates,
                        totalStudents: collegeProfile?.totalStudents,
                        totalTeachers: collegeProfile?.totalTeachers,
                        admissionFee: collegeProfile?.admissionFee,
                        location: collegeProfile?.location,
                        programs: collegeProfile?.programs,
                        phone: collegeProfile?.phone,
                        // image: selectPic
                        // totalStudents: ''
                    }}
                >
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit} id="scholorshiperro" style={{ padding: "1rem" }}>
                            <Form.Row>
                                <Form.Group controlId="name" as={Col} hasValidation>
                                    <Form.Label className="form__label">Name</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="name"
                                        placeholder="College/Uni Name"
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

                                <Form.Group controlId="location" as={Col} hasValidation>
                                    <Form.Label className="form__label">Location</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="location"
                                        placeholder="College/Uni Location"
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
                            </Form.Row>

                            <Form.Row>
                                <Form.Group controlId="phone" as={Col} hasValidation>
                                    <Form.Label className="form__label">Phone</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="number"
                                        name="phone"
                                        placeholder="College/Uni Phone"
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

                                <Form.Group controlId="averageCost" as={Col} hasValidation>
                                    <Form.Label className="form__label">Average Cost</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="number"
                                        name="averageCost"
                                        placeholder="College/Uni AverageCost"
                                        value={formik.values.averageCost}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.averageCost && !formik.errors.averageCost}
                                        isInvalid={formik.touched.averageCost && formik.errors.averageCost}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.averageCost}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group controlId="avgGpa" as={Col} hasValidation>
                                    <Form.Label className="form__label">Avg Gpa</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="number"
                                        name="avgGpa"
                                        placeholder="College/Uni AvgGpa"
                                        value={formik.values.avgGpa}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.avgGpa && !formik.errors.avgGpa}
                                        isInvalid={formik.touched.avgGpa && formik.errors.avgGpa}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.avgGpa}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="graduates" as={Col} hasValidation>
                                    <Form.Label className="form__label">Graduates</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="number"
                                        name="graduates"
                                        placeholder="College/Uni Graduates"
                                        value={formik.values.graduates}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.graduates && !formik.errors.graduates}
                                        isInvalid={formik.touched.graduates && formik.errors.graduates}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.graduates}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group controlId="underGraduates" as={Col} hasValidation>
                                    <Form.Label className="form__label">Under Graduates</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="number"
                                        name="underGraduates"
                                        placeholder="College/Uni Under Graduates"
                                        value={formik.values.underGraduates}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.underGraduates && !formik.errors.underGraduates}
                                        isInvalid={formik.touched.underGraduates && formik.errors.underGraduates}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.underGraduates}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="totalStudents" as={Col} hasValidation>
                                    <Form.Label className="form__label">Total Students</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="number"
                                        name="totalStudents"
                                        placeholder="College/Uni TotalStudents"
                                        value={formik.values.totalStudents}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.totalStudents && !formik.errors.totalStudents}
                                        isInvalid={formik.touched.totalStudents && formik.errors.totalStudents}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.totalStudents}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group controlId="totalTeachers" as={Col} hasValidation>
                                    <Form.Label className="form__label">Total Teachers</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="number"
                                        name="totalTeachers"
                                        placeholder="College/Uni TotalTeachers"
                                        value={formik.values.totalTeachers}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.totalTeachers && !formik.errors.totalTeachers}
                                        isInvalid={formik.touched.totalTeachers && formik.errors.totalTeachers}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.totalTeachers}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="admissionFee" as={Col} hasValidation>
                                    <Form.Label className="form__label">Admission Fee</Form.Label>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="number"
                                        name="admissionFee"
                                        placeholder="College/Uni admissionFee"
                                        value={formik.values.admissionFee}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={formik.touched.admissionFee && !formik.errors.admissionFee}
                                        isInvalid={formik.touched.admissionFee && formik.errors.admissionFee}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.admissionFee}
                                    </Form.Control.Feedback>
                                </Form.Group>


                            </Form.Row>

                            <Form.Row>
                                <Form.Group controlId="prospectus" as={Col} hasValidation>
                                    <Form.Label className="form__label">Prospectus</Form.Label>
                                    <Form.Control
                                        className="rounded-0"
                                        type="file"
                                        name="prospectus"
                                        // value={selectPic}
                                        onChange={e => handleFormikFileChange(e, formik, "prospectus")}
                                    />

                                    {
                                        collegeProfile ?
                                            <a href={collegeProfile?.prospectus}>Download</a> : null
                                    }
                                </Form.Group>
                                <Form.Group controlId="image" as={Col} hasValidation>
                                    <Form.Label className="form__label">Image</Form.Label>
                                    <Form.Control
                                        className="rounded-0"
                                        type="file"
                                        name="image"
                                        id="collegImg"
                                        // value={formik.values.image}
                                        onChange={e => handleFormikFileChange(e, formik, "img")}
                                        style={{ display: 'none' }}
                                    />
                                    <br />
                                    <div style={{ display: "flex" }}>
                                        <label for="collegImg">
                                            <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ fontSize: "1.3rem", marginRight: "1rem" }} />
                                        </label>
                                        {collegeProfile ? <img style={{ width: "2rem" }} src={collegeProfile?.image} alt="" /> : null}
                                    </div>
                                </Form.Group>
                            </Form.Row>
                            <Button className="button  button btn-block rounded-0" type="submit" form="scholorshiperro" style={{ width: "7rem", margiTop: "1rem" }}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default InstituteProfile;
