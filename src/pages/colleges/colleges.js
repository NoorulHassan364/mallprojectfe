import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form } from 'react-bootstrap';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Colleges = () => {
    const [colleges, setColleges] = useState([])
    const [collegesCopy, setCollegesCopy] = useState([])
    const [favColleges, setFavColleges] = useState([]);
    const navigate = useNavigate();

    const validSchema = Yup.object().shape({
        // district: Yup.string().required("required"),
        // college: Yup.string().required("required"),
    });

    const getColleges = async (values) => {
        try {
            let res = await api.get("/college");
            setColleges(res.data.data)
            setCollegesCopy(res.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const getFavColleges = async (userId) => {
        try {
            let res = await api.get(`/college/favourites/${userId}`);
            setFavColleges(res.data.data.favourites)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleFavourite = async (collegeId, e) => {
        e.stopPropagation();
        try {
            let clg = favColleges.find(el => el._id == collegeId);
            let user = JSON.parse(localStorage.getItem("user"));
            let res;
            if (clg) {
                res = await api.post(`/college/favourites/remove`, { userId: user._id, college: collegeId });
            } else {
                res = await api.post(`/college/favourites`, { userId: user._id, college: collegeId });

            }
            setFavColleges(res.data.data.favourites)
        }
        catch (err) {
            console.log(err)
        }
    }
    const onSubmitSearchCollege = (values, resetForm) => {
        if (values?.district == "" && values?.college == "") {
            setColleges(collegesCopy)
        } else if (values?.district == "" && values?.college !== "") {
            setColleges(collegesCopy?.filter(el => el.name.toLowerCase() == values?.college?.toLowerCase()))
        }
        else if (values?.district !== "" && values?.college == "") {
            setColleges(collegesCopy?.filter(el => el.location.toLowerCase() == values.district.toLowerCase()))
        }
        else {
            setColleges(collegesCopy?.filter(el => el.location.toLowerCase() == values.district.toLowerCase() && el.name.toLowerCase() == values?.college?.toLowerCase()))
        }
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        getColleges()
        getFavColleges(user?._id)
    }, [])
    return (
        <div className='container-fluid shadow college_container' >
            <div style={{ display: "flex", alignItems: "center" }}>
                <h4 style={{ color: "grey" }}>Colleges</h4>
                <Formik
                    onSubmit={(values, { resetForm }) => onSubmitSearchCollege(values, resetForm)}
                    validationSchema={validSchema}
                    enableReinitialize
                    initialValues={{
                        district: '',
                        college: '',
                    }}
                >
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit} id="college-search" style={{ display: "flex", marginLeft: "auto", padding: "1rem", alignItems: "center" }}>
                            <Form.Row>
                                <Form.Group controlId="district" as={Col} hasValidation
                                    style={{ marginBottom: "0rem" }}
                                >
                                    <Form.Control
                                        className="rounded-0"
                                        as="select"
                                        name="district"
                                        style={{ width: "14rem", marginBottom: "0rem", height: "3rem" }}
                                        placeholder="Enter district"
                                        value={formik.values.district}
                                        onChange={(e) => formik.handleChange(e)}
                                        custom
                                    >
                                        <option value="" disabled>Disctrict</option>
                                        {/* <option value="all">All</option> */}
                                        <option value="Lahore">Lahore</option>
                                        <option value="karachi">Karachi</option>
                                        <option value="Islamabad">Islamabad</option>
                                        <option value="peshawar">Peshawar</option>
                                    </Form.Control>

                                </Form.Group>

                                <Form.Group controlId="college" as={Col} style={{ marginBottom: "0rem" }} hasValidation>
                                    <Form.Control
                                        className="p-3 rounded-0"
                                        type="text"
                                        name="college"
                                        style={{ width: "14rem", marginBottom: "0rem", height: "3rem" }}
                                        placeholder="College Name"
                                        value={formik.values.college}
                                        onChange={formik.handleChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Button className="button  button btn-block rounded-0" type="submit" form="college-search" style={{ height: "fit-content", width: "14rem", marginLeft: "1rem" }} >
                                Search
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <hr />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", rowGap: "2rem" }}>
                {
                    colleges?.map((el) => {
                        return (

                            <div style={{ position: "relative", display: "flex" }} onClick={(e) => {
                                navigate(`/userDashboard/colleges/detail/${el?._id}`)
                            }} >
                                <Card style={{ width: '23rem' }} className="college_card">
                                    <Card.Img variant="top" src={el.image} />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: "1.6rem" }}>{el.name}</Card.Title>
                                        <Card.Text>
                                            <span>{el.location}</span>
                                            <div className="innerTextCollegeMain">
                                                <div className='innerTextCollege'>
                                                    <span className='innerTextCollegeTitle'>Avg Price</span>
                                                    <span>Rs.{el.averageCost}</span>
                                                </div>
                                                <div className='innerTextCollege'>
                                                    <span className='innerTextCollegeTitle'>Students</span>
                                                    <span>{el.totalStudents}</span>
                                                </div>
                                                <div className='innerTextCollege'>
                                                    <span className='innerTextCollegeTitle'>Teachers</span>
                                                    <span>{el.totalTeachers}</span>
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <div className='collegeFavourite'>
                                    <FontAwesomeIcon
                                        onClick={(e) => handleFavourite(el._id, e)}
                                        icon={faHeart}
                                        style={{ color: favColleges?.find((clg) => clg._id == el._id) ? "#ea657c" : "grey", cursor: "pointer" }}
                                    />
                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </div>

    )
}

export default Colleges;