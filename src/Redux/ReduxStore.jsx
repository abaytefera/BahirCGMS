import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { APi } from "./CenteralAPI.jsx";
import webState from "./WebState.jsx";

import { chatApi } from "./Conversation.jsx";

const rootReducer = combineReducers({
  'webState': webState,
  [APi.reducerPath]: APi.reducer,
 'chatApi': chatApi.reducer
});

// Added 'auth' to whitelist so the login token persists on refresh
const persisConfig = { 
  key: 'root', 
  storage: storage.default ? storage.default : storage, 
    whitelist: ['webState', 'auth'] 

};

const presisReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
  reducer: presisReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(APi.middleware,chatApi.middleware);
  }
});

export const persistor = persistStore(store);