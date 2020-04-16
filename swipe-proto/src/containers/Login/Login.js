/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React, { Component } from 'react';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { auth, db } from '../../config/Firebase'
import './style.css';

import * as tbl from './../constants'

class Login extends Component {
    constructor(props) {
        super(props);

        this.funcHandleChange = this.funcHandleChange.bind(this);
        this.funcLogin = this.funcLogin.bind(this);
        this.funcSignUp = this.funcSignUp.bind(this);
        this.funcLoadSignUp = this.funcLoadSignUp.bind(this);

        this.state = {
            loadSignUp: false,
            match: true,
            email: '',
            password: '',
            confirmPwd: ''
        };
    }

    funcLoadSignUp = () => {
        this.setState({
            loadSignUp: !this.state.loadSignUp,
            email: '',
            password: '',
            confirmPwd: ''
        });
    }

    funcLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { })
            .catch((err) => {
                console.log(err);
            });
    }

    funcSignUp = (e) => {
        e.preventDefault();

        if(this.state.password === this.state.confirmPwd) {
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                db.collection(tbl.USERS)
                .add({
                    username: this.state.email,
                    password: this.state.password,
                    created_at: new Date(),
                    updated_at: new Date()
                });
             })
            .catch((err) => {
                console.log(err);
            });
        } else this.setState({match:!this.state.match});

    }

    funcHandleChange = (value, type) => {

        switch(type) {
            case "email" : {
                this.setState({
                    email: value
                })
                break;
            }
            case "pwd" : {
                this.setState({
                   password: value
                })
                break;
            }
            case "cpwd" : {
                this.setState({
                    confirmPwd: value
                })
                break;
            }
            default: break;
        }
    }

    render() {
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
                            <React.Fragment>
                                <Container>
                                    <Form>
                                        <Form.Group controlId="email">
                                            <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                onChange={(ev) => this.funcHandleChange(ev.target.value, "email")}
                                                value={this.state.email}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                onChange={(ev) => this.funcHandleChange(ev.target.value, "pwd")}
                                                value={this.state.password}
                                            />
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
                                <Container>
                                    <Button variant="link" onClick={this.funcLoadSignUp}> Don't have an account? Sign up</Button>
                                </Container>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Container>
                                    <h3>Registration</h3>
                                    <Form>
                                        <Form.Group controlId="email">
                                            <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                onChange={(ev) => this.funcHandleChange(ev.target.value, "email")}
                                                value={this.state.email} />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                onChange={(ev) => this.funcHandleChange(ev.target.value, "pwd")}
                                                value={this.state.password} />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirm password"
                                                onChange={(ev) => this.funcHandleChange(ev.target.value, "cpwd")}
                                                value={this.state.confirmPwd} />
                                            {!this.state.match ? <div className="text-danger"> Password doesn't match </div> : null}
                                        </Form.Group>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="mt-5"
                                            block onClick={this.funcSignUp}
                                        >Proceed</Button>
                                    </Form>
                                </Container>
                                <Container>
                                    <Button variant="link" onClick={this.funcLoadSignUp}>Back</Button>
                                </Container>
                            </React.Fragment>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login;