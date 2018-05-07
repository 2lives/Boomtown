const GET_ITEMS = 'GET_ITEMS';
const GET_ITEM_FILTERS = 'GET_ITEM_FILTERS';
const GET_IS_LOADING = 'GET_IS_LOADING';
const GET_ERROR = 'GET_ERROR';

export const get_items = itemsData => ({
    type: GET_ITEMS,
    payload: itemsData
});

export const get_item_filters = itemFilters => ({
    type: GET_ITEM_FILTERS,
    payload: itemFilters
});

export const get_is_loading = () => ({
    type: GET_IS_LOADING
});

export const get_errors = error => ({
    type: GET_ERROR,
    payload: error
});

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
        case GET_ITEM_FILTERS: {
            const itemFilters = [...state.itemFilters];
            if (!itemFilters.includes(action.payload)) {
                itemFilters.push(action.payload);
            } else {
                const index = itemFilters.indexOf(action.payload);
                if (index > -1) {
                    itemFilters.splice(index, 1);
                }
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
