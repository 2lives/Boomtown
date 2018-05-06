import fetch from 'node-fetch';
import {
    getItem,
    getUser,
    getUserOwnedItems,
    getBorrowedItems
} from './resources/jsonServer';

const jsonApi = 'http://localhost:3001';

export default function({ jsonResources, firebaseResources, pgResources }) {
    return {
        Query: {
            items(root) {
                return pgResources.getItems();
            },
            users(root) {
                return firebaseResources.getUsers();
            },
            item({ id }) {
                return pgResources.getItem();
            },
            user({ id }) {
                return firebaseResources.getUser();
            },
            tagField(root) {
                return pgResources.tagField();
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
                return pgResources.addItem();
            }
        }
    };
}
