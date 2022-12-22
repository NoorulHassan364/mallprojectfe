import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../../assets/images/slide3aw.png";
import slide2 from "../../assets/images/slide2aw.png";
import slide3 from "../../assets/images/slide1aw.png";
import nestleLogo from "../../assets/images/nestleLogo.png";
import cocaLogo from "../../assets/images/cocaLogo.png";
import indimoLogo from "../../assets/images/indimoLogo.png";
import nbcLogo from "../../assets/images/nbcLogo.png";
import haierLogo from "../../assets/images/haierLogo.png";
import fb from "../../assets/images/fb.png";
import insta from "../../assets/images/insta.jfif";
import twitter from "../../assets/images/twitter.png";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="section_header">
        <div className="header_text" data-aos="fade-up">
          <h1 className="header_h1">
            Modern Shops To Let/Sale
            <br />
            At Festacity Mall
          </h1>
          <p style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
            <strong>
              Let's help you discover your
              <br />
              next comfort zone
            </strong>
          </p>
          <button
            type="button"
            className="header_getStartedBtn btn btn-primary"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="section_toolsAndResources" data-aos="fade-down">
        <div className="row" style={{ padding: "7rem" }}>
          <div className="col-md-5 col-sm-12">
            <h2
              style={{ fontSize: "2.3rem", fontWeight: 700, lineHeight: 1.2 }}
            >
              A quick walk through of how easy it is to acquire your shop
              outlets with us
            </h2>
            <p style={{ fontSize: "1.1rem", marginTop: "4rem" }}>
              As a process transformation company, we rethink the various ways
              our products and services can help satisfy our customers needs and
              wants with affordable houses that meets their taste
            </p>
          </div>

          <div className="col-md-7 col-sm-12">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                rowGap: "1rem",
              }}
            >
              <div className="shadow walkThroughCards" data-aos="fade-right">
                <h4 style={{ textAlign: "center" }}>Select Shop</h4>
                {/* <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  pariatur laudantium ad vero, natus dicta numquam facere
                  consectetur vel est magnam!
                </p> */}
              </div>
              <div className="shadow walkThroughCards" data-aos="fade-left">
                <h4 style={{ textAlign: "center" }}>Book</h4>
                {/* <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  pariatur laudantium ad vero, natus dicta numquam facere
                  consectetur vel est magnam!
                </p> */}
              </div>
              <div className="shadow walkThroughCards" data-aos="fade-right">
                <h4 style={{ textAlign: "center" }}>Pay</h4>
                {/* <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  pariatur laudantium ad vero, natus dicta numquam facere
                  consectetur vel est magnam!
                </p> */}
              </div>
              <div className="shadow walkThroughCards" data-aos="fade-left">
                <h4 style={{ textAlign: "center" }}>Follow up from us</h4>
                {/* <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  pariatur laudantium ad vero, natus dicta numquam facere
                  consectetur vel est magnam!
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section_carousal">
        <div class="row" style={{ padding: "2rem" }}>
          <div class="col-md-6 col-sm-12">
            <div class="seeMoreMain" data-aos="fade-left">
              <h1
                style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.2 }}
              >
                Let's help you discover <br /> your next comfort zone
              </h1>
              <button type="button" class="seeMoreBtn btn btn-primary">
                See More
              </button>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <Carousel data-aos="fade-right">
              <Carousel.Item>
                <img className="d-block w-100" src={slide2} alt="First slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={slide1}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={slide3} alt="Third slide" />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>

      <div class="ourPartners">
        <h1 class="ourpartnerHeading">Our Partners</h1>
        <div class="ourPartnersImages" data-aos="fade-up">
          <img src={nestleLogo} alt="" style={{ width: "8rem" }} />
          <img src={cocaLogo} alt="" style={{ width: "8rem" }} />
          <img src={nbcLogo} alt="" style={{ width: "8rem" }} />
          <img src={indimoLogo} alt="" style={{ width: "8rem" }} />
          <img src={haierLogo} alt="" style={{ width: "8rem" }} />
        </div>
      </div>

      <div class="getInTouch">
        <div class="getInTouchMain">
          <h2 style={{ fontSize: "3rem", fontWeight: 700 }}>Get in Touch </h2>
          <div class="getIntouchPhone">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4 style={{ fontSize: "1.8rem" }}>Phone</h4>
              <p style={{ fontSize: "1.3rem" }}>+(234) 905 549 4284</p>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, fugiat nihil!. Repellendus dolor quod tempora saepe.
              </p> */}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4 style={{ fontSize: "1.8rem" }}>Email</h4>
              <p style={{ fontSize: "1.3rem" }}>contact@festacitymall.com</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <img
                  src={fb}
                  alt=""
                  style={{ width: "2rem", height: "2rem" }}
                />
                <img
                  src={insta}
                  alt=""
                  style={{ width: "2rem", height: "2rem" }}
                />
                <img
                  src={twitter}
                  alt=""
                  style={{ width: "2rem", height: "2rem" }}
                />
              </div>
            </div>
          </div>
          <p style={{ fontSize: "1.3rem", float: "right" }}>
            Powered by upstreamnetworks.com.ng
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
