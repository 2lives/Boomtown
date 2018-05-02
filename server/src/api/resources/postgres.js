const { Pool } = require('pg');

export default function(app) {
    const pool = new Pool({
        user: app.get('PGUSER'),
        host: app.get('PGHOST'),
        database: app.get('PGDATABASE'),
        password: app.get('PGPASSWORD')
    });
    return {
        getItems() {
            return pool.query('SELECT * FROM items').then(resp => resp.rows);
        },
        getItem(id) {
            return pool
                .query(`SELECT * FROM items WHERE id = ${id}`)
                .then(resp => resp.rows[0]);
        }
    };
}
