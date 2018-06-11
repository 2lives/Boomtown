import * as firebase from 'firebase';

var config = {
    apiKey: 'AIzaSyD2z87rWVCqfowtEjQKfzDWoi9tXcJJNnY',
    authDomain: 'boomtown-7cd02.firebaseapp.com',
    databaseURL: 'https://boomtown-7cd02.firebaseio.com',
    projectId: 'boomtown-7cd02',
    storageBucket: 'boomtown-7cd02.appspot.com',
    messagingSenderId: '736276730535'
};
firebase.initializeApp(config);

const fbStorage = firebase.storage().ref();

export { fbStorage };
