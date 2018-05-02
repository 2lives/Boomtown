export default function(app) {
    app.set('DEV_JSON_SERVER', 'http://localhost:3001');

    app.set('PGUSER', process.env.PGUSER);
    app.set('PGPASSWORD', process.env.PGPASSWORD);
    app.set('PGDATABASE', process.env.PGDATABASE);
    app.set('PGHOST', process.env.PGHOST);
}
