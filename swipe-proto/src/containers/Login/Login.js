/*******************************************/
/**    Created by: Carl Jason Tapales     **/
/**    Modified by: Carl Jason Tapales    **/
/*******************************************/

import React, { Component } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { auth, db } from '../../config/Firebase'
import './style.css';

import * as tbl from './../constants'

import LOGIN_FORM from './LoginForm';
import SIGNUP_FORM from './SignupForm';

class Login extends Component {
    constructor(props) {
        super(props);
        this.funcLoadSignUp = this.funcLoadSignUp.bind(this);
        this.funcOnSkip = props.funcOnSkip.bind(this);

        this.state = {
            loadSignUp: false
        };
    }

    funcLoadSignUp = () => {
        this.setState({
            loadSignUp: !this.state.loadSignUp,
        });
    }

    funcLogin = (email, password) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => { })
            .catch((err) => {
                console.log(err);
            });
    }

    funcSignUp = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((u) => {
                db.collection(tbl.USERS)
                .add({
                    userId: u.user.uid,
                    username: email,
                    password: password,
                    created_at: new Date(),
                    updated_at: new Date()
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        let button;

        if (!this.state.loadSignUp) {
            button = <Col><Button variant="outline-primary" onClick={this.funcOnSkip} block>Skip Sign In</Button></Col>;
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
                                    <LOGIN_FORM
                                    funcLogin = {this.funcLogin.bind(this)}
                                    />
                                </Container>
                                <Container>
                                    <Button variant="link" onClick={this.funcLoadSignUp}> Don't have an account? Sign up</Button>
                                </Container>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Container>
                                    <h3>Registration</h3>
                                    <SIGNUP_FORM funcSignUp={this.funcSignUp.bind(this)}/>
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