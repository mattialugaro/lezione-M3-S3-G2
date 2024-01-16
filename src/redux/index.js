//src/redux/index.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

// action types
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_SECCESS = 'FETCH_DATA_SECCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// initial state
const initialState = {
    data: null,
    loading: false,
    error: null
};

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_DATA_SECCESS:
            return {...state, loading: false, data: action.payload};
        case FETCH_DATA_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

// action creators
const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
const fetchDataSuccess = (data) => ({ type: FETCH_DATA_SECCESS, payload:data });
const fecthDataFailure = (error) => ({ type: FETCH_DATA_FAILURE, payload:error });

// async action creators
export const fetchData = () => {
    return  async (dispatch) => {
        dispatch(fetchDataRequest());

        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
            const data = await response.json();
            dispatch(fetchDataSuccess(data));
        } catch (error) {
            dispatch(fecthDataFailure(error.message));
        }
    };
};

// store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;