export default function(app) {
    app.set('PGUSER', process.env.PGUSER || 'boomtown');
    app.set('PGPASSWORD', process.env.PGPASSWORD || 'boomtown');
    app.set('PGDATABASE', process.env.PGDATABASE || 'boomtown');
    app.set('PGHOST', process.env.PGHOST || 'localhost');

    app.set(
        'FIREBASE_API_KEY',
        process.env.FIREBASE_API_KEY ||
            'AIzaSyD2z87rWVCqfowtEjQKfzDWoi9tXcJJNnY'
    );
    app.set(
        'FIREBASE_AUTH_DOMAIN',
        process.env.FIREBASE_AUTH_DOMAIN || 'boomtown-7cd02.firebaseapp.com'
    );
    app.set(
        'FIREBASE_DB_URL',
        process.env.FIREBASE_DB_URL || 'https://boomtown-7cd02.firebaseio.com'
    );

    app.set(
        'FIREBASE_PROJECT_ID',
        process.env.FIREBASE_PROJECT_ID || 'boomtown-7cd02'
    );
    app.set(
        'FIREBASE_STORAGE_BUCKET',
        process.env.FIREBASE_STORAGE_BUCKET || 'boomtown-7cd02.appspot.com'
    );
    app.set(
        'FIREBASE_MESS_SENDID',
        process.env.FIREBASE_MESS_SENDID || '736276730535'
    );
}
