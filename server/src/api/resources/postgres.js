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
                  RIGHT OUTER JOIN itemtags
                      ON itemtags.itemid = items.id
                  INNER JOIN tags 
                      ON tags.tagid = itemtags.tagid
                  WHERE itemowner='${id}'
                  GROUP BY items.id`
                )
                .then(res => res.rows);
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
        }
    };
}
