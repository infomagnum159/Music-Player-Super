import {
    FETCH_ALBUM_FAILURE,
    FETCH_ALBUM_REQUEST,
    FETCH_ALBUM_SUCCESS,
    FETCH_ARTIST_FAILURE,
    FETCH_ARTIST_REQUEST,
    FETCH_ARTIST_SUCCESS, FETCH_HISTORY_FAILURE,
    FETCH_HISTORY_REQUEST,
    FETCH_HISTORY_SUCCESS,
    FETCH_TRACK_FAILURE,
    FETCH_TRACK_REQUEST,
    FETCH_TRACK_SUCCESS
} from "../actions/mainActions";


const initialState = {
    fetchLoading: false,
    singleLoading: false,
    artists: [],
    albums: null,
    tracks: null,
    history: null,
}


const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTIST_REQUEST:
            return {...state, fetchLoading: true};
        case FETCH_ARTIST_SUCCESS:
            return {...state,  fetchLoading: false, artists: action.payload};
        case FETCH_ARTIST_FAILURE:
            return {...state, fetchLoading: false};
        case FETCH_ALBUM_REQUEST:
            return {...state, singleLoading: true};
        case FETCH_ALBUM_SUCCESS:
            return {...state,  singleLoading: false, albums: action.payload};
        case FETCH_ALBUM_FAILURE:
            return {...state, singleLoading: false};
        case FETCH_TRACK_REQUEST:
            return {...state, singleLoading: true};
        case FETCH_TRACK_SUCCESS:
            return {...state,  singleLoading: false, tracks: action.payload};
        case FETCH_TRACK_FAILURE:
            return {...state, singleLoading: false};
        case FETCH_HISTORY_REQUEST:
            return {...state, singleLoading: true};
        case FETCH_HISTORY_SUCCESS:
            return {...state,  singleLoading: false, history: action.payload};
        case FETCH_HISTORY_FAILURE:
            return {...state, singleLoading: false};
        default:
            return state;
    }
};
export default mainReducer;
