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
    //if resolver is going to be making multiple requests for data, use loader
    Item /*top level types, Item and Query in this case*/: {
        itemowner({ itemowner }, args, context) {
            return context.loaders.ItemownerUser.load(itemowner);
        },
        async borrower({ borrower }, args, context) {
            return borrower
                ? await context.loaders.ItemBorrower.load(borrower)
                : null;
        }
    },

    User: {
        borroweditems({ id }, args, context) {
            return context.loaders.UserBorrowedItems.load(id);
        },
        owneditems({ id }, args, context) {
            return context.loaders.UserOwnedItems.load(id);
        }
    },
    Mutation: {
        addItem(root, args) {
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
    }
};
export default resolveFunctions;
