import React, { useState, useEffect, useContext } from "react";
import {
  Nav,
  Navbar,
  Button,
  Container,
  Row,
  Col,
  Card,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { AuthContext } from "../../contexts/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faU,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logoBranding from "../../assets/images/amuwoLogo.png";
import userIcon from "../../assets/images/userIcon.png";
// import userAvatar from "../../assets/images/iconfinder_user.png";

const NavBar = ({ user }) => {
  const { isLogin, signOut } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("");
  const [currUser, setUser] = useState(null);
  const navigate = useNavigate();

  // const onHomeChange = () => {
  //     setActiveTab(activeTab === tabs.HOME ? '' : tabs.HOME);
  //     navigate('/');
  // }

  const onNavChange = (route) => {
    setActiveTab(route);
    navigate(`/${route}`);
  };
  // const toggle = () => {
  //     setUserMenu(!userMenu);
  // };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);
  return currUser?.userType == "admin" ? null : (
    <>
      <Navbar className="navigation shadow" bg="light" expand="lg">
        {/* <Container> */}
        <Navbar.Brand as={Link} to="/" style={{ marginLeft: "2rem" }}>
          <img className="navigation__logo" src={logoBranding} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: "100%" }}>
            <div style={{ display: "flex", marginLeft: "0rem" }}>
              <Nav.Link
                className={
                  activeTab == "" ? "nav_link active_nav_link" : "nav_link"
                }
                onClick={() => onNavChange("")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className={
                  activeTab == "aboutUs"
                    ? "nav_link active_nav_link"
                    : "nav_link"
                }
                onClick={() => onNavChange("aboutUs")}
              >
                About US
              </Nav.Link>
              <Nav.Link
                className={
                  activeTab == "shops" ? "nav_link active_nav_link" : "nav_link"
                }
                onClick={() => onNavChange("shops")}
              >
                Shops/Outlets
              </Nav.Link>
              <Nav.Link
                className={
                  activeTab == "contactUs"
                    ? "nav_link active_nav_link"
                    : "nav_link"
                }
                onClick={() => onNavChange("contactUs")}
              >
                Contact US
              </Nav.Link>
            </div>

            <div className="nav_right">
              {isLogin ? (
                <NavDropdown
                  title={
                    <img src={userIcon} alt="imgg" style={{ width: "2rem" }} />
                  }
                  style={{ marginRight: "3rem" }}
                >
                  <NavDropdown.Item href="/shopPayments">
                    Shop Payments
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/levey">Levey/Bills</NavDropdown.Item>
                  <NavDropdown.Item href="/myShops">My Shops</NavDropdown.Item>
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="nav_btns">
                  <Button
                    variant="primary"
                    className="nav_btn"
                    onClick={() => onNavChange("signup")}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="nav_btn signin_btn_hover"
                    onClick={() => onNavChange("signIn")}
                  >
                    Log In
                  </Button>
                </div>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  );
};

export default NavBar;
