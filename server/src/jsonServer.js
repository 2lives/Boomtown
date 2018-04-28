import fetch from 'node-fetch';

const jsonAPI = 'http://localhost:3001';

export const getUserOwnedItems = id => {
    return fetch(`${jsonAPI}/items/?itemowner=${id}`).then(resp => resp.json());
};

export const getUserBorrowedItems = id => {
    return fetch(`${jsonAPI}/items/?borrower=${id}`).then(resp => resp.json());
};

export const getItemownerUser = id => {
    console.log('itemowner fired');

    return fetch(`${jsonAPI}/users/${id}`).then(resp => resp.json());
};
