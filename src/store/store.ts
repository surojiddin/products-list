import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "../features/main-page/slices/pagination-slice.ts";

export const store = configureStore({
    reducer: {
        pagination: paginationReducer,
    },
});

// Global types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
