"use client"

import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import  onlineTrackingReducer  from "./slices/online-member-slice"
import searchReducer from "./slices/search-slice"


const rootReducer = combineReducers({
  searchReducer,
  onlineTrackingReducer,
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
