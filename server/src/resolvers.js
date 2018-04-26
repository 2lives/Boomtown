import fetch from 'node-fetch';
const resolveFunctions = {
    Query: {
        items(root) {
            return fetch(`http://localhost:3001/items`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        users(root) {
            return fetch(`http://localhost:3001/users`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        item(root, { id }) {
            return fetch(`http://localhost:3001/items/${id}`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        user(root, { id }) {
            return fetch(`http://localhost:3001/users/${id}`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        }
    },

    Item /*top level types, Item and Query in this case*/: {
        itemowner({ itemowner }) {
            return fetch(`http://localhost:3001/users/${itemowner}`).then(
                resp => resp.json()
            );
        },
        borrower({ borrower }) {
            return fetch(`http://localhost:3001/users/${borrower}`).then(resp =>
                resp.json()
            );
        }
    },

    User: {
        borroweditems({
            id
        }) /*this takes in id, which is an arg we set available in schema*/ {
            return fetch(`http://localhost:3001/items/?borrower=${id}`).then(
                resp => resp.json()
            );
        },
        owneditems({ id }) {
            return fetch(`http://localhost:3001/users/?$itemowner=${id}`).then(
                resp => resp.json()
            );
        }
    }
};
export default resolveFunctions;
