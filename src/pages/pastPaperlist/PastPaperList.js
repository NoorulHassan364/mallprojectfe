import { faEye, faPaperPlane, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Col, Form, Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import api from '../../api';

const PastPaperList = () => {
    const [pastPapers, setpastPapers] = useState([]);

    const columns = [
        {
            name: "Institue Name",
            selector: (row) => row.instituteName,
            sortable: true,
            grow: 2,
        },
        {
            name: "Subject",
            selector: (row) => row.subject,
            sortable: true,
            grow: 2,
        },
        {
            name: "session",
            selector: (row) => row.session,
            sortable: true,
            grow: 2,
        },
        {
            name: "Class/Semester",
            selector: (row) => row.classSemester,
            sortable: true,
            grow: 2,
        },
        {
            name: "Document",
            selector: (row) => row.document,

            cell: (row, index, column, id) => {
                return <>
                    {row?.document ?
                        <a href={row?.document}>Download</a>
                        : null
                    }
                </>;
            },
            sortable: true,
            grow: 2,
        },
    ];

    const getPastPapers = async (user) => {
        try {
            let res = await api.get(`/pastPaper`);
            setpastPapers(res.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        getPastPapers(user);
    }, [])
    return (
        <div className='container-fluid shadow college_container' >
            <div style={{ display: "flex", justifyContent: "space-between", }}>
                <h4 style={{ color: "grey", marginTop: "0.4rem" }}>Past Papers</h4>
            </div>
            <hr />
            <div>
                <DataTable
                    data={pastPapers}
                    columns={columns}
                    highlightOnHover
                    responsive
                    pagination
                    paginationPerPage={20}
                    paginationRowsPerPageOptions={[20, 25, 50, 100]}
                />
            </div>
        </div>
    )
}

export default PastPaperList;
