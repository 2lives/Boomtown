import fetch from 'node-fetch';

export default function(app) {
    const jsonAPI = 'http://localhost:3001';

    return {
        getItems(root) {
            return fetch(`${jsonAPI}/items`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        getUsers(root) {
            return fetch(`${jsonAPI}/users`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        getItem(root, { id }) {
            return fetch(`${jsonAPI}/items/${id}`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        getUser(root, { id }) {
            return fetch(`${jsonAPI}/users/${id}`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        getUserOwnedItems(id) {
            return fetch(`${jsonAPI}/items/?itemowner=${id}`).then(resp =>
                resp.json()
            );
        },

        getUserBorrowedItems(id) {
            return fetch(`${jsonAPI}/items/?borrower=${id}`).then(resp =>
                resp.json()
            );
        },

        getItemownerUser(id) {
            return fetch(`${jsonAPI}/users/${id}`).then(resp => resp.json());
        },

        getItemBorrower(id) {
            return fetch(`${jsonAPI}/users/${id}`).then(resp => resp.json());
        },

        addItem() {
            const newItem = {
                title: args.title,
                itemowner: args.itemowner,
                imageurl: args.imageurl,
                tags: args.tags,
                created: args.created
            };

            fetch(`${jsonAPI}/items`, {
                method: 'POST',
                body: JSON.stringify(newItem),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .catch(error => console.error('Error:', error));
            return newItem;
        }
    };
}
