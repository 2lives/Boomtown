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
                    `SELECT
                              items.id,
                            items.title,
                            items.itemowner,
                            items.imageurl,
                            items.description,
                            items.created,
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
        },
        tagField() {
            return pool.query(`SELECT * FROM tags`).then(resp => resp.rows);
        },
        getUserBorrowedItems(id) {
            return pool
                .query(
                    `SELECT items.id,
                              items.title,
                              items.imageurl,
                              items.description,
                              items.borrower,
                              items.created,
                              items.itemowner,
                              array_agg(tags.tag) AS tags
                      FROM items 
                      LEFT OUTER JOIN itemtags
                          ON itemtags.itemid = items.id
                      INNER JOIN tags 
                          ON tags.tagid = itemtags.tags
                      WHERE borrower='${id}'
                      GROUP BY items.id`
                )
                .then(res => res.rows);
        },

        getUserOwnedItems(id) {
            return pool
                .query(
                    `SELECT items.id,
                          items.title,
                          items.imageurl,
                          items.description,
                          items.borrower,
                          items.created,
                          items.itemowner,
                          array_agg(tags.tag) AS tags
                  FROM items 
                  LEFT OUTER JOIN itemtags
                      ON itemtags.itemid = items.id
                  INNER JOIN tags 
                      ON tags.tagid = itemtags.tags
                  WHERE items.itemowner='${id}'
                  GROUP BY items.id`
                )
                .then(res => res.rows);
        },
        addItem(values) {
            console.log(values);
            return pool.connect((err, client, done) => {
                client.query('BEGIN', err => {
                    console.log('error:', err);
                    client
                        .query(
                            `INSERT INTO items(title, imageurl, description, itemowner) VALUES ($1, $2, $3, $4) RETURNING id, title, imageurl, description, itemowner, created`,
                            [
                                values.title,
                                values.imageurl,
                                values.description,
                                values.itemowner
                            ]
                        )
                        .then(res => {
                            for (let i = 0; i < values.tags.length; i++) {
                                client.query(
                                    `INSERT INTO itemtags(itemid, tags) VALUES ($1, $2) RETURNING itemid, tags`,
                                    [res.rows[0].id, values.tags[i]]
                                );
                            }
                        })
                        .then(() => {
                            client.query('COMMIT', err => {
                                if (err) {
                                    console.error(
                                        'Error committing transaction',
                                        err.stack
                                    );
                                }
                                done();
                            });
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    };
}
