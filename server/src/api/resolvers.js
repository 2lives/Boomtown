import fetch from 'node-fetch';

export default function({ jsonResources, pgResources }) {
    return {
        Query: {
            items(root) {
                return jsonResources.getItems();
            },
            users(root) {
                return jsonResources.getUsers();
            },
            item({ id }) {
                return jsonResources.getItem();
            },
            user({ id }) {
                return jsonResources.getUser();
            }
        },

        Item: {
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
                return jsonResources.addItem();
            }
        }
    };
}
