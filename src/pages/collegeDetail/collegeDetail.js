import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';
import { Col, Container, Row, Tab, Table, Tabs, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faMoneyCheckDollar,
    faBuildingColumns,
    faPersonChalkboard,
    faUserGraduate,
    faUser,
    faCircleDown
} from "@fortawesome/free-solid-svg-icons";
const CollegeDetail = () => {
    const { collegeId } = useParams();
    const [college, setCollege] = useState(null);
    const [admissions, setAdmissions] = useState(null);

    const navigate = useNavigate();
    const getCollege = async (values) => {
        try {
            let res = await api.get(`/college/${collegeId}`);
            setCollege(res.data.data)
        }
        catch (err) {
            console.log(err)
        }
    };
    const getAdmissions = async () => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            let res = await api.get(`/admission/${user?._id}`);
            setAdmissions(res.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleViewApplication = async () => {
        try {
            debugger;
            let user = JSON.parse(localStorage.getItem("user"));
            let admission = admissions?.filter(el => el?.userId == user?._id && el?.collegeId?._id == collegeId);
            navigate(`/userDashboard/admissionDetail/${admission[0]?._id}`)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCollege();
        getAdmissions();
    }, [collegeId])
    return (
        <div>
            <div className="coverImg">
                <img style={{ height: "30rem", width: "100%" }} src={college?.image} alt="" />
            </div>
            <Container>
                <h1 className='collegeName'>{college?.name}</h1>
                {/* <div style={{ letterSpacing: "0.1rem" }}>
                    {college?.discription}
                </div> */}
                {/* <div className="collegeAllImages">
                    {college?.allImages.map((img) => {
                        return <img className='collegeSingleImgeDetial' src={img} alt="" />
                    })}
                </div> */}
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="profile" title="Profile" style={{ backgroundColor: "white" }}>
                        <h3 className='college_snap_head'>College Programs</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Programs</th>
                                    <th>Subjects</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    college?.degreeAndPrograms?.map((program, i) => {
                                        return <tr>
                                            <td>{program?.subject}</td>
                                            <td>
                                                {program?.titles?.map((subject) => {
                                                    return subject?.name + ",  "
                                                })}
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>

                        <h3 className='college_snap_head'>College Snapshoot</h3>
                        <Row style={{ padding: "1rem" }}>
                            <Col md={4} sm={12} >
                                <div className="colegesnap">
                                    <span><FontAwesomeIcon style={{ fontSize: "20px" }} icon={faMoneyCheckDollar} /></span>
                                    <span className='colegesnap_child1'>Average Cost</span>
                                    <span className="colegesnap_child2">${college?.averageCost}</span>
                                </div>
                                <div className="colegesnap">
                                    <span><FontAwesomeIcon style={{ fontSize: "20px" }} icon={faBuildingColumns} /></span>
                                    <span className='colegesnap_child1'>Total Students</span>
                                    <span className="colegesnap_child2">{college?.totalStudents}</span>

                                </div>
                                <div className="colegesnap">
                                    <span><FontAwesomeIcon style={{ fontSize: "20px" }} icon={faPersonChalkboard} /></span>
                                    <span className='colegesnap_child1'>Total Teachers</span>
                                    <span className="colegesnap_child2">{college?.totalTeachers}</span>
                                </div>
                            </Col>
                            <Col md={4} sm={12} className="graduates_div">
                                <div className='graduates_child'>
                                    <span><FontAwesomeIcon style={{ fontSize: "25px", color: 'blue' }} icon={faUserGraduate} /></span>
                                    <span className='graduates_child1'>{college?.graduates}</span>
                                    <span className='graduates_child2'>Graduates</span>
                                </div>
                                <div className='graduates_child'>
                                    <span><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faUser} /></span>
                                    <span className='graduates_child1'>{college?.underGraduates}</span>
                                    <span className='graduates_child2'>Under Graduates</span>
                                </div>
                            </Col>
                        </Row>

                        <h3 className='college_snap_head'>Download Prospectus</h3>
                        <a href={college?.prospectus} target="_blank" >
                            <FontAwesomeIcon style={{ fontSize: "2.3rem", color: "green" }} icon={faCircleDown} />
                        </a>

                        <h3 className='college_snap_head'>Telophone:</h3>
                        <span style={{ fontWeight: "bold", marginLeft: "1rem", backgroundColor: "yellow" }}>{college?.phone}</span>


                    </Tab>
                    <Tab eventKey="admission" title="Admission" style={{ backgroundColor: "white" }}>
                        <h3 className='college_snap_head'>Admission Fee:</h3>
                        <span style={{ fontWeight: "bold", marginLeft: "1rem" }}>Rs.{college?.admissionFee}</span>
                        <br />
                        <div style={{ width: "8rem", margin: "auto" }}>
                            {
                                admissions?.filter(el => el?.collegeId?._id == college?._id)?.length > 0 ?
                                    <Button style={{ marginTop: "3rem", marginBottom: "4rem" }} onClick={() => handleViewApplication()}>View Application</Button> :
                                    <Button style={{ marginTop: "3rem", marginBottom: "4rem" }} onClick={() => navigate(`/userDashboard/admissionForm/${college?._id}`)}>Apply Now</Button>
                            }

                        </div>
                    </Tab>
                </Tabs>


            </Container>
        </div>
    )
};

export default CollegeDetail;