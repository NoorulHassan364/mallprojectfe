import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Col, Form, Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
const ApplyForAdmission = () => {
    const [admissions, setAdmissions] = useState([]);
    const navigate = useNavigate();
    const handleCollegeDetail = (id) => {
        navigate(`/userDashboard/colleges/detail/${id}`)

    }
    const handleViewApplication = (id) => {
        navigate(`/userDashboard/admissionDetail/${id}`)

    }
    const columns = [
        {
            name: "College",
            selector: (row) => row.collegeId?.name,
            sortable: true,
            grow: 2,
        },
        {
            name: "Admission Fee",
            selector: (row) => row?.admissionFee,
            sortable: true,
            grow: 2,
        },
        {
            name: "firstName",
            selector: (row) => row?.firstName,
            sortable: true,
            grow: 2,
        },
        {
            name: "lastName",
            selector: (row) => row?.lastName,
            sortable: true,
            grow: 2,
        },
        {
            name: "email",
            selector: (row) => row?.email,
            sortable: true,
            grow: 2,
        },
        {
            name: "College",
            // selector: (row) => row.deadline,
            cell: (row, index, column, id) => {
                return <Button onClick={() => handleCollegeDetail(row?.collegeId?._id)}>View</Button>
            },
            sortable: true,
            grow: 2,
        },
        {
            name: "Application",
            // selector: (row) => row.deadline,
            cell: (row, index, column, id) => {
                return <Button onClick={() => handleViewApplication(row?._id)}>Appication</Button>
            },
            sortable: true,
            grow: 2,
        },

    ];


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
    useEffect(() => {
        getAdmissions();
    }, [])
    return (
        <div className='container-fluid shadow college_container' >
            <div style={{ display: "flex", alignItems: "center" }}>
                <h4 style={{ color: "grey" }}>Admissions</h4>
            </div>
            <hr />
            <div>
                <DataTable
                    data={admissions}
                    columns={columns}
                    highlightOnHover
                    responsive
                    pagination
                // paginationPerPage={20}
                // paginationRowsPerPageOptions={[20, 25, 50, 100]}
                />
            </div>

        </div>
    )
}

export default ApplyForAdmission