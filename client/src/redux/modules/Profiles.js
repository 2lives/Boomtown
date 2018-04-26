const GET_PROFILE_IS_LOADING = 'GET_PROFILE_IS_LOADING';
const GET_PROFILE_ITEMS = 'GET_PROFILE_ITEMS';
const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

export const get_profile_is_loading = () => ({
    type: GET_PROFILE_IS_LOADING
});

export const get_profile_items = items => ({
    type: GET_PROFILE_ITEMS,
    payload: items
});

export const get_profile_error = error => ({
    type: GET_PROFILE_ERROR,
    payload: error
});

export const get_profile_data = profileData => dispatch => {
    const urls = ['http://localhost:3001/items', 'http://localhost:3001/users'];
    dispatch(get_profile_is_loading(true));

    const matchItemownerToUserBio = itemsWithBio => {
        itemsWithBio[0].map(item => {
            itemsWithBio[1].map(user => {
                if (user.id === item.itemowner) {
                    item.itemowner = user;
                }
            });
        });
        console.log(itemsWithBio[0]);
        return itemsWithBio[0];
    };
    const matchItemsToUsers = (items, profileData) => {
        console.log(profileData);
        return items.filter(item => item.itemowner.id === profileData);
    };

    Promise.all(urls.map(url => fetch(url).then(resp => resp.json())))
        .then(resp =>
            dispatch(
                get_profile_items(
                    matchItemsToUsers(
                        matchItemownerToUserBio(resp),
                        profileData
                    )
                )
            )
        )
        .catch(error => dispatch(get_profile_error(error)));
};

const initialState = {
    profileItems: [],
    isLoading: false,
    error: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_IS_LOADING: {
            return { ...state, isLoading: true };
        }
        case GET_PROFILE_ITEMS: {
            const personsProfileItems = action.payload;
            return {
                ...state,
                profileItems: personsProfileItems,
                isLoading: false
            };
            break;
        }
        case GET_PROFILE_ERROR: {
            return { ...state, isLoading: false, error: action.payload };
            break;
        }
        default: {
            return {
                ...state
            };
        }
    }
};
