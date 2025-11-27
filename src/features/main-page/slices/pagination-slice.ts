import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

const initialState: PaginationState = {
    pageIndex: 0,
    pageSize: 15,
};

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPagination: (state, action: PayloadAction<PaginationState>) => {
            state.pageIndex = action.payload.pageIndex;
            state.pageSize = action.payload.pageSize;
        },
        setPageIndex: (state, action: PayloadAction<number>) => {
            state.pageIndex = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
            state.pageIndex = 0; // Reset to first page when page size changes
        },
        resetPagination: (state) => {
            state.pageIndex = initialState.pageIndex;
            state.pageSize = initialState.pageSize;
        },
    },
});

export const { setPagination, setPageIndex, setPageSize, resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;
