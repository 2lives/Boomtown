const GET_ITEMS = 'GET_ITEMS';
const GET_ITEM_FILTERS = 'GET_ITEM_FILTERS';
const GET_IS_LOADING = 'GET_IS_LOADING';
const GET_TAGS = 'GET_TAGS';
const GET_ERROR = 'GET_ERROR';

//Creating action creators

export const get_items = itemsData => ({
    type: GET_ITEMS,
    payload: itemsData
});

export const get_tags = () => ({
    type: GET_TAGS
});

export const get_item_filters = filters => ({
    type: GET_ITEM_FILTERS,
    payload: filters
});

export const get_is_loading = () => ({
    type: GET_IS_LOADING
});

export const get_errors = error => ({
    type: GET_ERROR,
    payload: error
});

export const get_items_and_users = () => dispatch => {
    const urls = ['http://localhost:3000/items', 'http://localhost:3000/users'];
    let items = [];
    let people = [];
    dispatch(get_is_loading(true));
    Promise.all(urls.map(url => fetch(url)))
        .then(resp => Promise.all(resp.map(resp => resp.json())))
        .then(resp => {
            items = resp[0];
            people = resp[1];
        })
        .then(objects => {
            items.map(item => {
                people.find(profile => {
                    if (profile.id === item.itemowner) {
                        item.itemowner = profile;
                    }
                });
            });
        })
        .then(() => dispatch(get_items(items)))
        .catch(error => dispatch(get_errors(error)));
};

const initialState = {
    items: [],
    isLoading: false,
    itemFilters: [],
    error: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_IS_LOADING: {
            return { ...state, isLoading: true, error: '' };
            break;
        }
        case GET_ITEMS: {
            const itemsAndUsersData = action.payload;
            return {
                ...state,
                items: itemsAndUsersData,
                isLoading: false,
                error: ''
            };
            break;
        }
        case GET_ITEM_FILTERS: {
            let itemFilters = [...state.itemFilters];
            if (!itemFilters.includes(action.payload)) {
                itemFilters.push(action.payload);
            } else {
                itemFilters = itemFilters.filter(tag => tag !== action.payload);
            }
            return { ...state, itemFilters };
            break;
        }

        case GET_ERROR: {
            return { ...state, isLoading: false, error: action.payload };
            break;
        }
        default: {
            return { ...state };
        }
    }
};
