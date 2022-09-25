import axiosApi from "../../axiosApi";

export const FETCH_ALBUM_REQUEST = 'FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_FAILURE = 'FETCH_ALBUM_FAILURE';

export const FETCH_ARTIST_REQUEST = 'FETCH_ARTIST_REQUEST';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ARTIST_FAILURE = 'FETCH_ARTIST_FAILURE';

export const FETCH_TRACK_REQUEST = 'FETCH_TRACK_REQUEST';
export const FETCH_TRACK_SUCCESS = 'FETCH_TRACK_SUCCESS';
export const FETCH_TRACK_FAILURE = 'FETCH_TRACK_FAILURE';

export const CREATE_TRACK_HISTORY_REQUEST = 'CREATE_TRACK_HISTORY_REQUEST';
export const CREATE_TRACK_HISTORY_SUCCESS = 'CREATE_TRACK_HISTORY_SUCCESS';
export const CREATE_TRACK_HISTORY_FAILURE = 'CREATE_TRACK_HISTORY_FAILURE';

export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST';
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';


const fetchAlbumRequest = () => ({type: FETCH_ALBUM_REQUEST});
const fetchAlbumSuccess = (data) => ({type: FETCH_ALBUM_SUCCESS, payload: data});
const fetchAlbumFailure = () => ({type: FETCH_ALBUM_FAILURE});

const fetchArtistRequest = () => ({type: FETCH_ARTIST_REQUEST});
const fetchArtistSuccess = (data) => ({type: FETCH_ARTIST_SUCCESS, payload: data});
const fetchArtistFailure = () => ({type: FETCH_ARTIST_FAILURE});

const fetchTrackRequest = () => ({type: FETCH_TRACK_REQUEST});
const fetchTrackSuccess = (data) => ({type: FETCH_TRACK_SUCCESS, payload: data});
const fetchTrackFailure = () => ({type: FETCH_TRACK_FAILURE});

export const createTrackHistoryRequest = () => ({type: CREATE_TRACK_HISTORY_REQUEST});
export const createTrackHistorySuccess = data => ({type: CREATE_TRACK_HISTORY_SUCCESS, payload: data});
export const createTrackHistoryFailure = error => ({type: CREATE_TRACK_HISTORY_FAILURE, payload: error});

export const fetchHistoryRequest = () => ({type: FETCH_HISTORY_REQUEST});
export const fetchHistorySuccess = data => ({type: FETCH_HISTORY_SUCCESS, payload: data});
export const fetchHistoryFailure = error => ({type: FETCH_HISTORY_FAILURE, payload: error});

export const fetchArtists = () => {
    return async dispatch => {
        try {
            dispatch(fetchArtistRequest());
            const response = await axiosApi.get('/artists');
            dispatch(fetchArtistSuccess(response.data));
        } catch (e) {
            dispatch(fetchArtistFailure());
        }
    };
};

export const fetchAlbums = id => {
    return async dispatch => {
        let response = null;
        try {
            dispatch(fetchAlbumRequest());
            if (id) {
                response = await axiosApi.get('/albums?artist=' + id);
            } else {
                response = await axiosApi.get('/albums');
            }
            dispatch(fetchAlbumSuccess(response.data));
        } catch (e) {
            dispatch(fetchAlbumFailure());
        }
    };
};

export const fetchTracks = (id, token) => {
    return async dispatch => {
        let response = null;
        try {
            dispatch(fetchTrackRequest());
            if (id) {
                response = await axiosApi.get('/tracks?album=' + id, {
                    headers: {
                        'Authorization': token,
                    }
                });
            } else {
                response = await axiosApi.get('/tracks');
            }
            dispatch(fetchTrackSuccess(response.data));
        } catch (e) {
            dispatch(fetchTrackFailure());
        }
    };
};


export const createTrackHistory = (token, track) => {
    return async dispatch => {
        try {
            dispatch(createTrackHistoryRequest());
            const response = await axiosApi.post('/track_history',{
                track: track,
            },{
                headers: {
                    'Authorization': token,
                },

            });
            dispatch(createTrackHistorySuccess(response.data));
        } catch (e) {
            dispatch(createTrackHistoryFailure());
        }
    };
};

export const fetchHistory = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchHistoryRequest());
            const response = await axiosApi.get('/track_history',{
                headers: {
                    'Authorization': getState().users.user && getState().users.user.token,
                },
            });
            dispatch(fetchHistorySuccess(response.data));
        } catch (e) {
            dispatch(fetchHistoryFailure());
        }
    };
};
