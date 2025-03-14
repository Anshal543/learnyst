"use client"

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import chatReducer from "./slices/chats-slices"
import infiniteScrollReducer from "./slices/infinite-scroll-slice"
import onlineTrackingReducer from "./slices/online-member-slice"
import searchReducer from "./slices/search-slice"

const rootReducer = combineReducers({
  searchReducer,
  onlineTrackingReducer,
  infiniteScrollReducer,
  chatReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
