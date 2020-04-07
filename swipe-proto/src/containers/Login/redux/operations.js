import firebase from './../../../config/Firebase';

const LOGIN = (email, password) => {
    console.log("LOGIN: ", email, password);
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {

    })
    .catch((err)=> {
        return err;
    });
}

const SIGNUP = (email, password) => {
    console.log("LOGIN: ", email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {

    })
    .catch((err)=> {
        return err;
    });
}

export default {
    LOGIN,
    SIGNUP
}