import connexionReducer from "../Features/connexion"
import userReducer from "../Features/user"
import newUserReducer from "../Features/newUser"
import editingReducer from "../Features/editUserName"
import rememberReducer from "../Features/rememberMe"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'




const persistConfig = {
    timeout: 1000,
    key: 'root',
    storage,
    blacklist: ['connexion', "user", "newUser", "editing"]
  }

  const authPersistConfig = {
    key: 'connexion',
    storage: storage,
    blacklist: ['status', 'message', 'fetching']
  }

  const userPersistConfig = {
    key: 'user',
    storage: storage,
    blacklist: ['message']
  }



  const reducers = combineReducers({
    connexion: persistReducer(authPersistConfig, connexionReducer),
    user: persistReducer(userPersistConfig , userReducer),
    newUser: newUserReducer,
    editing: editingReducer,
    remember: rememberReducer
  })
 

  const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),})

export default store;