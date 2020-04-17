import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from "yup";

const LOGIN_FORM = ({funcLogin}) => {
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    funcLogin(values.email, values.password);
                    setSubmitting(false);
                }, 500);
            }}

            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required("Required"),
                password: Yup.string()
                    .required("Required")
                    .min(6, "Minimum of 6 characters")
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
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-5"
                            disabled={isSubmitting}
                            block
                        >Login</Button>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default LOGIN_FORM;