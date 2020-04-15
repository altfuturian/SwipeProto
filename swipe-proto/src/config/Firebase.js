import * as fbConfig from 'firebase';
import 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDrotSPX5TCqpn7GG7xMh6fGHyd6VqqCds",
    authDomain: "swipe-proto.firebaseapp.com",
    databaseURL: "https://swipe-proto.firebaseio.com",
    projectId: "swipe-proto",
    storageBucket: "swipe-proto.appspot.com",
    messagingSenderId: "387361760630",
    appId: "1:387361760630:web:f358852aa2aac3badb0657",
    measurementId: "G-WTHCFNP3YV"
};

fbConfig.initializeApp(config);

fbConfig.firestore().settings(settings);

export default fbConfig;