import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from "yup";

const SIGNUP_FORM = ({funcSignUp}) => {
    return (
        <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    funcSignUp(values.email, values.password);
                    console.log(values)
                    setSubmitting(false);
                }, 500);
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required("Required"),
                password: Yup.string()
                    .required("Required")
                    .min(6, "Minimum of 6 characters"),
                confirmPassword: Yup.string()
                    .required("Required")
                    .min(6, "Minimum of 6 characters")
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={handleChange}
                                value={values.email}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={values.password}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                            )}
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                onChange={handleChange}
                                value={values.confirmPassword}
                                onBlur={handleBlur}
                            />
                            {errors.confirmPassword && touched.confirmPassword && (
                                <div className="input-feedback">{errors.confirmPassword}</div>
                            )}
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-5"
                            disabled={isSubmitting}
                            block
                        >Sign Up</Button>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default SIGNUP_FORM;