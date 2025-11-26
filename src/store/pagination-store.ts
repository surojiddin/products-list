import { create } from 'zustand';

interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

interface PaginationStoreState {
    // State
    pagination: PaginationState;

    // Actions
    setPagination: (pagination: PaginationState) => void;
    setPageIndex: (pageIndex: number) => void;
    setPageSize: (pageSize: number) => void;
    reset: () => void;
}

const initialState: PaginationState = {
    pageIndex: 0,
    pageSize: 15,
};

const usePaginationStore = create<PaginationStoreState>((set) => ({
    // Initial state
    pagination: initialState,

    // Actions
    setPagination: (pagination) => set({ pagination }),
    setPageIndex: (pageIndex) => set((state) => ({
        pagination: { ...state.pagination, pageIndex }
    })),
    setPageSize: (pageSize) => set((state) => ({
        pagination: { ...state.pagination, pageSize, pageIndex: 0 }
    })),
    reset: () => set({ pagination: initialState })
}));

export default usePaginationStore;