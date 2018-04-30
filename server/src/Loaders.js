import DataLoader from 'dataloader';
import {
    getUserOwnedItems,
    getUserBorrowedItems,
    getItemownerUser,
    getItemBorrower
} from './jsonServer';

export function Loaders() {
    return {
        UserOwnedItems: new DataLoader(ids => {
            return Promise.all(ids.map(id => getUserOwnedItems(id)));
        }),

        UserBorrowedItems: new DataLoader(ids => {
            return Promise.all(ids.map(id => getUserBorrowedItems(id)));
        }),
        ItemownerUser: new DataLoader(ids => {
            return Promise.all(ids.map(id => getItemownerUser(id)));
        }),
        ItemBorrower: new DataLoader(ids => {
            return Promise.all(ids.map(id => getItemBorrower(id)));
        })
    };
}
