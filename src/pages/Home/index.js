import React, { useState, useContext, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import matchScools from "../../assets/images/match-schools-img.png";
import highSchoolStdent from "../../assets/images/pakStudent2.png";
// import highSchoolStdent from "../../assets/images/high-school-student.png";
import transferStdent from "../../assets/images/pakstudent4.png";
import collegeList from "../../assets/images/list-img.png";
import scholorshipImg from "../../assets/images/scholorship.jpg";
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer'

const HomePage = () => {
    const navigate = useNavigate()
    const handleGetStarted = () => {
        navigate('/signup')
    }

    return (
        <div>
            <div className='section_header' data-aos="fade-up">
                <div className='header_text'>
                    <h1 className='header_h1'>Every College. Every <br /> Scholarship.</h1>
                    <p style={{ marginTop: '3rem' }}><strong>Research schools, get scholarships, and understand where you fit — at any <br /> stage of your college journey.</strong></p>
                    <Button className='header_getStartedBtn' onClick={() => handleGetStarted()}> Get Started</Button>
                </div>
            </div>

            <div className="section_toolsAndResources" data-aos="fade-down">
                <h2 style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '2rem' }}>Tools and resources for every student.</h2>
                <Row style={{ padding: '2rem' }}>
                    <Col md={6} sm={12}>
                        <Row>
                            <Col md={6}>
                                <img style={{ width: '14rem' }} src={highSchoolStdent} alt="" />
                            </Col>
                            <Col md={6} className="highSchool">
                                <h6 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>High School Students
                                </h6>
                                <p style={{ fontSize: '1.5rem' }}>Start planning as a senior, junior, sophomore, or freshman. Get exactly what you need at any stage of your college journey.</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} sm={12}>
                        <Row>
                            <Col md={6}>
                                <img style={{ width: '14rem' }} src={transferStdent} alt="" />
                            </Col>
                            <Col md={6} className="transferStu">
                                <h6 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Transfer Students
                                </h6>
                                <p style={{ fontSize: '1.5rem' }}>Want to transfer schools? We offer tools and resources for students who are already enrolled to help you transfer schools with confidence.</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <div className="section_findSchools" data-aos="fade-right">
                <div className='section_findSchools_img'>
                    <img className='img-fluid' src={matchScools} alt="" />
                </div>
                <div className='section_findSchools_txt'>
                    <h3>Find schools that match your style
                    </h3>
                    <p>Even in uncertain times, we’ll help you discover colleges that match what’s most important to you — your budget, your majors, your style.</p>
                </div>

            </div>

            <div className="section_collegeList" data-aos="fade-left">
                <div className='section_findSchools_txt'>
                    <h3>Build your college list with confidence
                    </h3>
                    <p>We’ll help you build and refine a personalized list with the right schools to supercharge your chances of admission.</p>
                </div>
                <div className='section_findSchools_img'>
                    <img className='img-fluid' src={collegeList} alt="" />
                </div>

            </div>

            <div className="section_collegeList" data-aos="fade-right">
                <div className='section_findSchools_img' >
                    <img className='img-fluid' src={scholorshipImg} alt="" />
                </div>
                <div className='section_findSchools_txt'>
                    <h3>Find scholarships to help you pay
                    </h3>
                    <p>Our up-to-date scholarship database is one of the nation’s largest. Find money to help you fund your education..</p>
                </div>
            </div>

            <div className="section_college_Search" data-aos="fade-up">
                <h4 >Find the right college for you.</h4>
                <Button className='header_getStartedBtn' onClick={() => handleGetStarted()}> Get Started</Button>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;