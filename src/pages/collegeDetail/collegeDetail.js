import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faMoneyCheckDollar,
    faBuildingColumns,
    faPersonChalkboard,
    faUserGraduate,
    faUser
} from "@fortawesome/free-solid-svg-icons";
const CollegeDetail = () => {
    const { collegeId } = useParams();
    const [college, setCollege] = useState(null);

    const getCollege = async (values) => {
        try {
            let res = await api.get(`/college/${collegeId}`);
            setCollege(res.data.data)
        }
        catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        getCollege();
    }, [collegeId])
    return (
        <div>
            <div className="coverImg">
                <img style={{ height: "30rem", width: "100%" }} src={college?.image} alt="" />
            </div>
            <Container>
                <h1 className='collegeName'>{college?.name}</h1>
                <div style={{ letterSpacing: "0.1rem" }}>
                    {college?.discription}
                </div>
                <div className="collegeAllImages">
                    {college?.allImages.map((img) => {
                        return <img className='collegeSingleImgeDetial' src={img} alt="" />
                    })}
                </div>
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
                            <span><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faUserGraduate} /></span>
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
            </Container>
        </div>
    )
};

export default CollegeDetail;