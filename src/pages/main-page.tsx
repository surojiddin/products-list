import {useEffect, useMemo, useState} from "react";
import {
    type PaginationState,
    type SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {useProductColumns} from "@/features/main-page/hooks/use-product-columns.tsx";
import {DataTable} from "@/components/common/data-table.tsx";
import {useDebounce} from "@/hooks/use-debounce.tsx";
import Paginator from "@/components/common/paginator.tsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import { productData } from "@/data/products";

export default function MainPage() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    });
    const [searchInput, setSearchInput] = useState<string>('');
    const [sorting, setSorting] = useState<SortingState>([]);

    const products = productData

    const debouncedSearch = useDebounce(searchInput, 300);
    const columns = useProductColumns();

    useEffect(() => {
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, [debouncedSearch]);

    const filteredData = useMemo(() => {
        if (!debouncedSearch || debouncedSearch.length < 2) {
            return products.data;
        }
        const searchLower = debouncedSearch.toLowerCase();
        return products.data.filter((product) =>
            product.name.toLowerCase().includes(searchLower) ||
            product.sku.toLowerCase().includes(searchLower) ||
            product.barcode.includes(debouncedSearch)
        );
    }, [debouncedSearch, products.data]);

    const sortedData = useMemo(() => {
        if (sorting.length === 0) return filteredData;

        return [...filteredData].sort((a, b) => {
            for (const sort of sorting) {
                const key = sort.id as keyof typeof a;
                const aVal = a[key];
                const bVal = b[key];

                if (aVal < bVal) return sort.desc ? 1 : -1;
                if (aVal > bVal) return sort.desc ? -1 : 1;
            }
            return 0;
        });
    }, [filteredData, sorting]);

    const paginatedData = useMemo(() => {
        const start = pagination.pageIndex * pagination.pageSize;
        const end = start + pagination.pageSize;
        return sortedData.slice(start, end);
    }, [sortedData, pagination.pageIndex, pagination.pageSize]);

    const table = useReactTable({
        data: paginatedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        onGlobalFilterChange: setSearchInput,
        onSortingChange: setSorting,
        state: {
            pagination,
            globalFilter: searchInput,
            sorting,
        },
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        rowCount: filteredData.length,
    });

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Mahsulotlar</CardTitle>
                    <CardDescription>Mahsulotlar ro'yxati</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        table={table}
                        isFetching={false}
                        isSearching={debouncedSearch.length >= 2}
                    />
                </CardContent>
                <CardFooter>
                    <Paginator table={table} />
                </CardFooter>
            </Card>
        </>
    )
}
