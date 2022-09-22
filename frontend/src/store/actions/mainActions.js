import axiosApi from "../../axiosApi";


export const FETCH_MAIN_REQUEST = 'FETCH_MAIN_REQUEST';
export const FETCH_MAIN_SUCCESS = 'FETCH_MAIN_SUCCESS';
export const FETCH_MAIN_FAILURE = 'FETCH_MAIN_FAILURE';

export const FETCH_ALBUM_REQUEST = 'FETCH_ALBUM_REQUEST';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const FETCH_ALBUM_FAILURE = 'FETCH_ALBUM_FAILURE';

export const FETCH_ARTIST_REQUEST = 'FETCH_ARTIST_REQUEST';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ARTIST_FAILURE = 'FETCH_ARTIST_FAILURE';

export const FETCH_TRACK_REQUEST = 'FETCH_TRACK_REQUEST';
export const FETCH_TRACK_SUCCESS = 'FETCH_TRACK_SUCCESS';
export const FETCH_TRACK_FAILURE = 'FETCH_TRACK_FAILURE';


const fetchAlbumRequest = () => ({type: FETCH_ALBUM_REQUEST});
const fetchAlbumSuccess = (data) => ({type: FETCH_ALBUM_SUCCESS, payload: data});
const fetchAlbumFailure = () => ({type: FETCH_ALBUM_FAILURE});

const fetchArtistRequest = () => ({type: FETCH_ARTIST_REQUEST});
const fetchArtistSuccess = (data) => ({type: FETCH_ARTIST_SUCCESS, payload: data});
const fetchArtistFailure = () => ({type: FETCH_ARTIST_FAILURE});

const fetchTrackRequest = () => ({type: FETCH_TRACK_REQUEST});
const fetchTrackSuccess = (data) => ({type: FETCH_TRACK_SUCCESS, payload: data});
const fetchTrackFailure = () => ({type: FETCH_TRACK_FAILURE});

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
