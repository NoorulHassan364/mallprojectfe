// import React, { Component } from 'react'
// import { Button, Col, Container, Form, Row, Spinner, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { trackPromise } from 'react-promise-tracker';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import api from '../../api';
// // import BasicButton from './../../../../skfvendor/src/Demo/UIElements/Basic/Button';
// // import SignIn from './../../../../skfvendor/src/pages/SignIn/index';

// export default class Index extends Component {
//     state = {
//         showOldPasword: false,
//         showNewPasword: false,
//         showConfirmPasword: false,
//         isLoading: false,
//         resetPasswordSuccesAlerts: false,
//         resetPasswordDangerAlerts: false
//     }
//     validSchema = Yup.object().shape({
//         // oldPassword: Yup.string()
//         //     .min(8, "Your old password must be at least 8 characters long").max(100, "Too long")
//         //     .required("Required")
//         //     .matches(
//         //         /^(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[0-9]).*$/,
//         //         "Must contain at least 1 lowercase character, 1 number, 1 special character"
//         //     ),

//         // newPassword: Yup.string()
//         //     .min(8, "Your old password must be at least 8 characters long").max(100, "Too long")
//         //     .required("Required")
//         //     .matches(
//         //         /^(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[0-9]).*$/,
//         //         "Must contain at least 1 lowercase character, 1 number, 1 special character"
//         //     ),
//         // confirmPassword: Yup.string().required('required').oneOf([Yup.ref("newPassword"), null], "Passwords must match").min(8, "Your confirm password must be at least 8 characters long").max(100, "Too long")
//         //     .required("Required")
//         //     .matches(
//         //         /^(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*[0-9]).*$/,
//         //         "Must contain at least 1 lowercase character, 1 number, 1 special character"
//         //     ),
//         newPassword: Yup.string().required("Required").min(8, "Your password must be at least 8 characters long"),
//         confirmPassword: Yup.string().required('required').oneOf([Yup.ref("newPassword"), null], "Passwords must match").min(8, "Confirm password must be at least 8 characters long"),
//     });

//     handleShowOldPassword = () => {
//         this.state.showOldPasword ?
//             this.setState({ showOldPasword: false })
//             :
//             this.setState({ showOldPasword: true })
//     }
//     handleShowNewPassword = () => {
//         this.state.showNewPasword ?
//             this.setState({ showNewPasword: false })
//             :
//             this.setState({ showNewPasword: true })
//     }
//     handleShowConfirmPassword = () => {
//         this.state.showConfirmPasword ?
//             this.setState({ showConfirmPasword: false })
//             :
//             this.setState({ showConfirmPasword: true })
//     }

//     handleResetPasswordSubmit = async (values, clearForm) => {
//         console.log("resteToken", this.props.match.params.resetToken)

//         try {
//             this.setState({ isLoading: true });
//             const res = await api.post(`/users/user/updatePassword/${this.props.match.params.resetToken}`, {
//                 ...values
//             });

//             console.log(res);
//             this.setState({ isLoading: false, resetPasswordSuccesAlerts: true, resetPasswordDangerAlerts: false });
//             clearForm({ values: '' })
//         }
//         catch (err) {
//             this.setState({ isLoading: false, resetPasswordSuccesAlerts: false, resetPasswordDangerAlerts: true });
//             console.log(err)
//         }

//     }
//     render() {
//         return (
//             <div className="section-resetPassword">
//                 <Container>
//                     <h2 className="text-center mb-4">Reset Your Subka Faida Password</h2>
//                     <Row>
//                         <Col md={6} sm={12} style={{ margin: 'auto' }}>
//                             {
//                                 this.state.resetPasswordSuccesAlerts ?
//                                     <Alert variant="success" className="rounded text-center">Your Password has been Reset Successfully</Alert>
//                                     : ""
//                             }
//                             {
//                                 this.state.resetPasswordDangerAlerts ?
//                                     <Alert variant="danger" className="rounded text-center">Incorrect Password!</Alert>
//                                     : ""
//                             }
//                             <Formik
//                                 onSubmit={(values, { resetForm }) => {
//                                     this.handleResetPasswordSubmit(values, resetForm)
//                                     // resetForm({ values: "" })
//                                 }}
//                                 validationSchema={this.validSchema}
//                                 enableReinitialize
//                                 initialValues={{
//                                     oldPassword: '',
//                                     newPassword: '',
//                                     confirmPassword: '',
//                                 }}
//                             >
//                                 {(formik) => (
//                                     <Form onSubmit={formik.handleSubmit} id="resetPassword">
//                                         {/* <Form.Group controlId="oldPassword" as={Col} className="isValidHide" hasValidation>
//                                             <Form.Label className="form__label">Old Password</Form.Label>
//                                             <div style={{ position: "relative", display: "flex" }}>
//                                                 <Form.Control
//                                                     className="p-3 rounded-0 "
//                                                     // style={{backG}}
//                                                     type={this.state.showOldPasword ? "text" : "password"}
//                                                     name="oldPassword"
//                                                     placeholder="Please Enter Your Old Password"
//                                                     value={formik.values.oldPassword}
//                                                     onChange={formik.handleChange}
//                                                     onBlur={formik.handleBlur}
//                                                     isValid={formik.touched.oldPassword && !formik.errors.oldPassword}
//                                                     isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
//                                                 />
//                                                 {

//                                                     this.state.showOldPasword ?
//                                                         <i class="fas fa-eye-slash" style={{ color: "black", cursor: "pointer", position: "absolute", right: "2%", marginTop: "0.7rem" }} onClick={() => {
//                                                             console.log("password show")
//                                                             this.handleShowOldPassword()
//                                                         }}></i>
//                                                         :
//                                                         <i class="far fa-eye" style={{ color: "black", cursor: "pointer", position: "absolute", right: "2%", marginTop: "0.7rem" }} onClick={() => {
//                                                             console.log("password show")
//                                                             this.handleShowOldPassword()
//                                                         }} ></i>
//                                                 }
//                                             </div>
//                                             <Form.Control.Feedback style={{ display: "block" }} type="invalid">
//                                                 {formik.errors.oldPassword}
//                                             </Form.Control.Feedback>
//                                         </Form.Group> */}
//                                         {
//                                             this.state.resetPasswordSuccesAlerts ?
//                                                 ""
//                                                 :
//                                                 (
//                                                     <>
//                                                         <Form.Group controlId="newPassword" as={Col} className="isValidHide" hasValidation>
//                                                             <Form.Label className="form__label">New Password</Form.Label>
//                                                             <div style={{ position: "relative", display: "flex" }}>
//                                                                 <Form.Control
//                                                                     className="p-3 rounded-0 "
//                                                                     // style={{backG}}
//                                                                     type={this.state.showNewPasword ? "text" : "password"}
//                                                                     name="newPassword"
//                                                                     placeholder="Please Enter Your New Password"
//                                                                     value={formik.values.newPassword}
//                                                                     onChange={formik.handleChange}
//                                                                     onBlur={formik.handleBlur}
//                                                                     isValid={formik.touched.newPassword && !formik.errors.newPassword}
//                                                                     isInvalid={formik.touched.newPassword && formik.errors.newPassword}
//                                                                 />
//                                                                 {

//                                                                     this.state.showNewPasword ?
//                                                                         <i class="fas fa-eye-slash" style={{ color: "black", cursor: "pointer", position: "absolute", right: "2%", marginTop: "0.7rem" }} onClick={() => {
//                                                                             console.log("password show")
//                                                                             this.handleShowNewPassword()
//                                                                         }}></i>
//                                                                         :
//                                                                         <i class="far fa-eye" style={{ color: "black", cursor: "pointer", position: "absolute", right: "2%", marginTop: "0.7rem" }} onClick={() => {
//                                                                             console.log("password show")
//                                                                             this.handleShowNewPassword()
//                                                                         }} ></i>
//                                                                 }
//                                                             </div>
//                                                             <Form.Control.Feedback style={{ display: "block" }} type="invalid">
//                                                                 {formik.errors.newPassword}
//                                                             </Form.Control.Feedback>
//                                                         </Form.Group>

//                                                         <Form.Group controlId="confirmPassword" as={Col} className="isValidHide" hasValidation>
//                                                             <Form.Label className="form__label">Confirm Password</Form.Label>
//                                                             <div style={{ position: "relative", display: "flex" }}>
//                                                                 <Form.Control
//                                                                     className="p-3 rounded-0 "
//                                                                     // style={{backG}}
//                                                                     type={this.state.showConfirmPasword ? "text" : "password"}
//                                                                     name="confirmPassword"
//                                                                     placeholder="Please Enter Your Confirm Password"
//                                                                     value={formik.values.confirmPassword}
//                                                                     onChange={formik.handleChange}
//                                                                     onBlur={formik.handleBlur}
//                                                                     isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
//                                                                     isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
//                                                                 />
//                                                                 {

//                                                                     this.state.showConfirmPasword ?
//                                                                         <i class="fas fa-eye-slash" style={{ color: "black", cursor: "pointer", position: "absolute", right: "2%", marginTop: "0.7rem" }} onClick={() => {
//                                                                             console.log("password show")
//                                                                             this.handleShowConfirmPassword()
//                                                                         }}></i>
//                                                                         :
//                                                                         <i class="far fa-eye" style={{ color: "black", cursor: "pointer", position: "absolute", right: "2%", marginTop: "0.7rem" }} onClick={() => {
//                                                                             console.log("password show")
//                                                                             this.handleShowConfirmPassword()
//                                                                         }} ></i>
//                                                                 }
//                                                             </div>
//                                                             <Form.Control.Feedback style={{ display: "block" }} type="invalid">
//                                                                 {formik.errors.confirmPassword}
//                                                             </Form.Control.Feedback>
//                                                         </Form.Group>
//                                                     </>
//                                                 )

//                                         }


//                                         <div className='text-center mt-2'>
//                                             {
//                                                 this.state.resetPasswordSuccesAlerts ?
//                                                     <a href="/signin">
//                                                         <Button className="button-ghost" variant="outline-light" style={{ marginLeft: '1rem', width: '12rem' }}>
//                                                             <span>Go to SignIn</span>
//                                                         </Button>
//                                                     </a>
//                                                     :
//                                                     <Button className="button-ghost" variant="outline-light" style={{ marginLeft: '1rem', width: '12rem' }} type="submit">
//                                                         {this.state.isLoading ? (
//                                                             <Spinner animation="border" size="sm" />
//                                                         ) : ('')}
//                                                         <span className={`${this.state.isLoading ? 'ml-2' : ''}`}>Submit</span>
//                                                     </Button>

//                                             }
//                                         </div>
//                                     </Form>
//                                 )}
//                             </Formik>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         )
//     }
// }
