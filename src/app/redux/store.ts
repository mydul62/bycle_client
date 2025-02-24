import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import authReducer from "./api/features/auth/authslice"
import productReducer from './api/features/product/productSlice';
import drowerReducer from './api/features/drowerSlice';
const persistConfig = {
  key: 'auth',
  storage,
  // whitelist: ["auth"],
  serialize: true,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedProductReducer = persistReducer(persistConfig, productReducer)

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    drower: drowerReducer,
    Product: persistedProductReducer ,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware( {
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);