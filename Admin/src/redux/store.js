import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/userRedux";
import productReducer from "../redux/productRedux";
import accountReducer from "../redux/accountRedux";

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
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = { // default
    key: 'root',
    version: 1,
    storage,
    stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    account: accountReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

// const persistUser = persistReducer(persistConfig, userReducer)
// const persistProduct = persistReducer(persistConfig, productReducer)

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