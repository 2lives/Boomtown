import DataLoader from 'dataloader';
import { getUserOwnedItems } from './jsonServer';
import { getUserBorrowedItems } from './jsonServer';
import { getItemownerUser } from './jsonServer';

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
        })
    };
}
