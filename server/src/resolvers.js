import fetch from 'node-fetch';

const jsonAPI = 'http://localhost:3001';
const resolveFunctions = {
    Query: {
        items(root) {
            return fetch(`${jsonAPI}/items`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        users(root) {
            return fetch(`${jsonAPI}/users`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        item(root, { id }) {
            return fetch(`${jsonAPI}/items/${id}`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        },
        user(root, { id }) {
            return fetch(`${jsonAPI}/users/${id}`)
                .then(resp => resp.json())
                .catch(error => console.log(error));
        }
    },

    Item /*top level types, Item and Query in this case*/: {
        itemowner({ itemowner }) {
            return fetch(`${jsonAPI}/users/${itemowner}`).then(resp =>
                resp.json()
            );
        },
        async borrower({ borrower }) {
            const user = await fetch(`${jsonAPI}/users/${borrower}`);
            const json = await user.json();
            if (!json.id) return null;
            return json;
        }
    },

    User: {
        borroweditems({
            id
        }) /*this takes in id, which is an arg we set available in schema*/ {
            return fetch(`${jsonAPI}/items/?borrower=${id}`).then(resp =>
                resp.json()
            );
        },
        owneditems({ id }) {
            return fetch(`${jsonAPI}/users/?$itemowner=${id}`).then(resp =>
                resp.json()
            );
        }
    }
};
export default resolveFunctions;
