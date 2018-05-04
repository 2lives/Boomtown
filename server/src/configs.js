export default function(app) {
    app.set('DEV_JSON_SERVER', 'http://localhost:3001');

    app.set('PGUSER', process.env.PGUSER);
    app.set('PGPASSWORD', process.env.PGPASSWORD);
    app.set('PGDATABASE', process.env.PGDATABASE);
    app.set('PGHOST', process.env.PGHOST);
}

app.set(
     'FIREBASE_API_KEY', process.env.FIREBASE_API_KEY || "AIzaSyD2z87rWVCqfowtEjQKfzDWoi9tXcJJNnY",
);

app.set('FIREBASE_AUTH_DOMAIN' process.env.FIREBASE_AUTH_DOMAIN || "boomtown-7cd02.firebaseapp.com")

app.set('FIREBASE_DB_URL' process.env.FIREBASE_DB_URL || "https://boomtown-7cd02.firebaseio.com")

// var config = {
//      apiKey: "AIzaSyD2z87rWVCqfowtEjQKfzDWoi9tXcJJNnY",
//      authDomain: "boomtown-7cd02.firebaseapp.com",
//      databaseURL: "https://boomtown-7cd02.firebaseio.com",
//      projectId: "boomtown-7cd02",
//      storageBucket: "boomtown-7cd02.appspot.com",
//      messagingSenderId: "736276730535"
//    };
//    firebase.initializeApp(config);