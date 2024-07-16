import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartRedux";
import userReducer from "../redux/userRedux";
import popupReducer from "../redux/popupRedux";
import orderReducer from "../redux/orderRedux";
import publicActionReducer from "../redux/publicActionRedux";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { // default
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    popup: popupReducer,
    order: orderReducer,
    publicAction: publicActionReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    // reducer: persistedReducer, 
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) => // default
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
}) 