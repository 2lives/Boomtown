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
            return pool
                .query(
                    // `SELECT * FROM items`
                    `SELECT
                              items.id,
                            items.title,
                            items.imageurl,
                            items.description,
                            items.created,
                            items.itemowner,
                            items.borrower,
                            array_agg(tags.tag) AS tags
                                FROM items
                                RIGHT OUTER JOIN itemtags
                                    ON itemtags.itemid = items.id
                                INNER JOIN tags
                                    ON tags.tagid = itemtags.tags
                                GROUP BY items.id
                        `
                )
                .then(res => res.rows);
        },
        getItem(id) {
            return pool
                .query(`SELECT * FROM items WHERE id = ${id}`)
                .then(resp => resp.rows[0]);
        }
    };
}
