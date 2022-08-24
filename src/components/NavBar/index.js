import React, { useState, useEffect, useContext } from 'react';
import { Nav, Navbar, Button, Container, Row, Col, Card, NavDropdown, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { AuthContext } from '../../contexts/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import logoBranding from '../../assets/images/fyplogo4.png';
// import userAvatar from "../../assets/images/iconfinder_user.png";


const NavBar = ({ user }) => {
    const { isLogin, signOut } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('');
    const navigate = useNavigate();

    // const onHomeChange = () => {
    //     setActiveTab(activeTab === tabs.HOME ? '' : tabs.HOME);
    //     navigate('/');
    // }

    const onNavChange = (route) => {
        setActiveTab(route);
        navigate(`/${route}`);
    }
    // const toggle = () => {
    //     setUserMenu(!userMenu);
    // };
    return (
        <>
            {
                !isLogin ?
                    <Navbar className="navigation shadow" bg="light" expand="lg">
                        {/* <Container> */}
                        <Navbar.Brand as={Link} to="/" style={{ marginLeft: '2rem' }}>
                            <img className="navigation__logo" src={logoBranding} alt="logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav style={{ width: "100%" }}>
                                <div style={{ display: 'flex', marginLeft: '0rem' }}>
                                    <Nav.Link
                                        className={activeTab == 'colleges' ? 'nav_link active_nav_link' : 'nav_link'}
                                        onClick={() => onNavChange('colleges')}
                                    >
                                        Colleges
                                    </Nav.Link>

                                    <Nav.Link
                                        className={activeTab == 'scholorships' ? 'nav_link active_nav_link' : 'nav_link'}
                                        onClick={() => onNavChange('scholorships')}
                                    >
                                        Scholorships
                                    </Nav.Link>

                                    <Nav.Link
                                        className={activeTab == 'pastPapers' ? 'nav_link active_nav_link' : 'nav_link'}
                                        onClick={() => onNavChange('pastPapers')}
                                    >
                                        Past Papers
                                    </Nav.Link>
                                </div>

                                <div className="nav_right">
                                    {/* <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{ fontSize: '1.4rem', color: "grey" }}
                        /> */}
                                    <div style={{ position: "relative", display: "flex" }}>
                                        <Form.Control
                                            className="nav_searchBar"
                                            type="text"
                                            name="searchColleges"
                                            placeholder="Search Colleges"
                                        // value={formik.values.password}
                                        // onChange={formik.handleChange}
                                        />
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                            style={{ fontSize: '1rem', color: "grey", cursor: "pointer", position: "absolute", right: "2%", marginTop: "0.7rem" }}
                                        />
                                    </div>
                                    <div className='nav_btns'>
                                        <Button variant="primary" className='nav_btn' onClick={() => onNavChange('signup')}>Sign Up</Button>
                                        <Button variant="outline-primary" className="nav_btn signin_btn_hover" onClick={() => onNavChange('signIn')} >Log In</Button>
                                    </div>
                                </div>
                            </Nav>
                        </Navbar.Collapse>
                        {/* </Container> */}
                    </Navbar> : null
            }

        </>
    );
}

export default NavBar;