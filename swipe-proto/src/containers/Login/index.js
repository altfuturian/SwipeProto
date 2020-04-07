/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React, { Component } from 'react';
import { operation } from './redux/index'
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import firebase from './../../config/Firebase'
import './style.css';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loadSignUp: false,
            email: "1",
            password: "2"
        };
    }

    funcLoadSignUp = () => {
        this.setState({
            loadSignUp: !this.state.loadSignUp
        });
        console.log("RENDER: ", this.state.loadSignUp);
    }

    funcLogin = (e) => {
        e.preventDefault();
        //operation.LOGIN(this.state.email, this.state.password);
    }

    funcSignUp = (e) => {
        e.preventDefault();
        //operation.SIGNUP(this.state.email, this.state.password);
    }

    funcHandleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log("RENDER: ", this.state.loadSignUp);
        let button;

        if (!this.state.loadSignUp) {
            button = <Col><Button variant="outline-primary" block>Skip Sign In</Button></Col>;
        }

        return (
            <div className="main-container">
                <Row>
                    <Col className="col-9 main-content">
                        <Container>
                            <Col className="col-8">
                                <h1>Swipe Prototype</h1>
                                <p>
                                    Oceans and seas supply most of the water that evaporates and then falls as rain in the water cycle.
                                    They are salty while rivers and lakes are fresh water.
                                    When salty water from the ocean mixes with fresh water, a special place called an estuary is formed.
                                </p>
                                <Button variant="outline-light" onClick={this.funcLoadSignUp}>Sign Up</Button>
                            </Col>
                        </Container>
                    </Col>
                    <Col className="side-content text-center">
                        <Container>
                            <Image src="https://cdn4.iconfinder.com/data/icons/logos-3/426/react_js-512.png" rounded />
                            <Col className="mt-2">
                                <h2>swipe-proto</h2>
                            </Col>
                            {button}
                        </Container>
                        {!this.state.loadSignUp ?
                            <Container>
                                <Form>
                                    <Form.Group controlId="email">
                                        <Form.Control type="email" placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="mt-5"
                                        onClick={this.funcLogin}
                                        block>
                                        Login
                                    </Button>
                                </Form>
                            </Container>
                            :
                            <Container>
                                <h3>Registration</h3>
                                <Form>
                                    <Form.Group controlId="email">
                                        <Form.Control type="email" placeholder="Email" />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Control type="password" placeholder="Confirm password" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="mt-5" block>Proceed</Button>
                                </Form>
                            </Container>
                        }
                        <Container>
                            <a> Don't have an account?</a>
                            <a> Sign up </a>
                        </Container>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login;