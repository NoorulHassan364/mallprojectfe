import React, { useEffect, useState } from 'react'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container } from 'react-bootstrap';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
const MyCollegeList = () => {

    const [favColleges, setFavColleges] = useState([]);

    const navigate = useNavigate();

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
            let user = JSON.parse(localStorage.getItem("user"));
            let res = await api.post(`/college/favourites/remove`, { userId: user._id, college: collegeId });
            setFavColleges(res.data.data.favourites)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        getFavColleges(user?._id)
    }, [])
    return (
        <div className='container-fluid shadow college_container' >
            <h4 style={{ padding: "0.5rem", color: "grey" }}>Favourite Colleges</h4>
            <hr />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", rowGap: "2rem" }}>
                {
                    favColleges?.map((el) => {
                        return (

                            <div style={{ position: "relative", display: "flex" }} onClick={() => navigate(`/userDashboard/colleges/detail/${el?._id}`)}>
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
                                        style={{ color: "#ea657c", cursor: "pointer" }}
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

export default MyCollegeList;