import React from 'react';
import ReactDOM from 'react-dom/client';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {Router} from "react-router-dom";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import App from './App';
import './index.css';
import history from "./history";
import mainReducer from "./store/reducers/mainReducer";
import theme from "./theme";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    main: mainReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <App/>
            </Router>
        </ThemeProvider>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
