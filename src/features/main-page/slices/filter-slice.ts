import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProductFilter } from '@/types/products.ts';

const initialState: ProductFilter = {
    name: undefined,
    barcode: undefined,
    sku: undefined,
    from: undefined,
    to: undefined,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<ProductFilter>) => {
            return { ...state, ...action.payload };
        },
        setFilterName: (state, action: PayloadAction<string | undefined>) => {
            state.name = action.payload;
        },
        setFilterSku: (state, action: PayloadAction<string | undefined>) => {
            state.sku = action.payload;
        },
        setFilterBarcode: (state, action: PayloadAction<string | undefined>) => {
            state.barcode = action.payload;
        },
        setFilterFrom: (state, action: PayloadAction<string | undefined>) => {
            state.from = action.payload;
        },
        setFilterTo: (state, action: PayloadAction<string | undefined>) => {
            state.to = action.payload;
        },
        resetFilters: () => {
            return initialState;
        },
    },
});

export const {
    setFilters,
    setFilterName,
    setFilterSku,
    setFilterBarcode,
    setFilterFrom,
    setFilterTo,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
