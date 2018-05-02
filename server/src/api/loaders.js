import DataLoader from 'dataloader';

export default function({ jsonResources, pgResources }) {
    return {
        UserOwnedItems: new DataLoader(ids => {
            return Promise.all(
                ids.map(id => jsonResources.getUserOwnedItems(id))
            );
        }),

        UserBorrowedItems: new DataLoader(ids => {
            return Promise.all(
                ids.map(id => jsonResources.getUserBorrowedItems(id))
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
