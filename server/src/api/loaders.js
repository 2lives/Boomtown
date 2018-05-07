import DataLoader from 'dataloader';

export default function({ jsonResources, firebaseResources, pgResources }) {
    return {
        UserOwnedItems: new DataLoader(ids => {
            return Promise.all(
                ids.map(id => pgResources.getUserOwnedItems(id))
            );
        }),

        UserBorrowedItems: new DataLoader(ids => {
            return Promise.all(
                ids.map(id => pgResources.getUserBorrowedItems(id))
            );
        }),
        ItemownerUser: new DataLoader(ids => {
            return Promise.all(
                ids.map(id => jsonResources.getItemownerUser(id))
            );
        }),
        ItemBorrower: new DataLoader(ids => {
            return Promise.all(
                ids.map(id => jsonResources.getItemBorrower(id))
            );
        })
    };
}
