import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import api from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InterestForm = () => {
  const [form, setSelectForm] = useState(null);
  const [formA, setFrom] = useState(null);

  const handleFormikFileChange = (e, formik) => {
    let file = e.target.files[0];
    setSelectForm(file);
  };

  const onFormSubmit = async (values, resetForm) => {
    try {
      if (form) {
        const formData = new FormData();
        for (const key in values) {
          if (Array.isArray(values[key])) {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            if (values[key] !== null) formData.append(key, values[key]);
          }
        }
        formData.append("form", form);
        await api.post(`/admin/interestForm`, formData);
        setSelectForm(null);
        resetForm();
        getForm();
        toast("Form added Successfull");
      } else {
        window.alert("Please Select the form");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getForm = async () => {
    try {
      let res = await api.get(`/admin/interestForm`);
      setFrom(res.data.data.form);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getForm();
  }, []);

  return (
    <div className="container-fluid shadow college_container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h4 style={{ color: "grey" }}>Interest Form</h4>
      </div>
      <hr />
      <div>
        <Formik
          onSubmit={(values, { resetForm }) => {
            onFormSubmit(values, resetForm);
          }}
          // validationSchema={validSchema}
          enableReinitialize
          initialValues={{
            name: "",
            price: "",
            category: "",
          }}
        >
          {(formik) => (
            <Form
              onSubmit={formik.handleSubmit}
              id="scholorshiperro"
              style={{ padding: "1rem" }}
            >
              <Form.Row>
                <Form.Group controlId="image" as={Col} hasValidation>
                  <Form.Label className="form__label">Interest Form</Form.Label>
                  <Form.Control
                    className="rounded-0"
                    type="file"
                    name="image"
                    id="collegImg"
                    // value={formik.values.image}
                    onChange={(e) => handleFormikFileChange(e, formik)}
                    style={{ display: "none" }}
                  />
                  <br />
                  <div>
                    <label for="collegImg">
                      <FontAwesomeIcon
                        icon={faArrowUpFromBracket}
                        style={{ fontSize: "1.3rem", marginRight: "1rem" }}
                      />
                    </label>
                    <a href={formA}>Download</a>
                  </div>
                </Form.Group>
              </Form.Row>

              <Button
                className="button  button btn-block rounded-0"
                type="submit"
                form="scholorshiperro"
                style={{ width: "7rem", margiTop: "1rem" }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InterestForm;
