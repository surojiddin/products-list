import {useState} from "react";
import {
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
import {useGetProducts} from "@/features/main-page/hooks/use-products.ts";
import type {ProductFilter} from "@/types/products.ts";
import {Accordion, AccordionContent, AccordionItem} from "@/components/ui/accordion.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Filter, X} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {DatePicker} from "@/components/custom/date-picker.tsx";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {setPagination} from "@/features/main-page/slices/pagination-slice.ts";

export default function MainPage() {
    const dispatch = useAppDispatch();
    const pagination = useAppSelector((state) => state.pagination);
    const [searchInput, setSearchInput] = useState('');
    const [filters, setFilters] = useState<ProductFilter>({});
    const [accordionValue, setAccordionValue] = useState<string>("");
    const debouncedSearch = useDebounce(searchInput, 300);
    const { data: products, isLoading } = useGetProducts({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        ...filters,
        ...(debouncedSearch.length >= 2 ? { name: debouncedSearch } : {}),
    });

    const columns = useProductColumns();

    const table = useReactTable({
        data: products?.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: (updaterOrValue) => {
            const newPagination = typeof updaterOrValue === 'function'
                ? updaterOrValue(pagination)
                : updaterOrValue;
            dispatch(setPagination(newPagination));
        },
        onGlobalFilterChange: setSearchInput,
        state: {
            pagination,
            globalFilter: searchInput,
        },
        manualPagination: true,
        manualFiltering: false, // Client-side column filtering
        manualSorting: false, // Client-side sorting
        rowCount: products?.total || 0,
    });

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Mahsulotlar</CardTitle>
                            <CardDescription>Mahsulotlar ro'yxati</CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAccordionValue(accordionValue === "filter" ? "" : "filter")}
                            className="w-auto"
                        >
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Accordion
                        type="single"
                        collapsible
                        value={accordionValue}
                        onValueChange={setAccordionValue}
                    >
                        <AccordionItem value="filter" className="border-none">
                            <AccordionContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                                    {/* Mahsulot nomi */}
                                    <div className="space-y-2">
                                        <Label htmlFor="filter-name">Mahsulot nomi</Label>
                                        <Input
                                            id="filter-name"
                                            placeholder="Qidirish..."
                                            value={filters.name || ''}
                                            onChange={(e) => {
                                                setFilters(prev => ({...prev, name: e.target.value || undefined}));
                                                dispatch(setPagination({...pagination, pageIndex: 0}));
                                            }}
                                        />
                                    </div>

                                    {/* SKU */}
                                    <div className="space-y-2">
                                        <Label htmlFor="filter-sku">SKU</Label>
                                        <Input
                                            id="filter-sku"
                                            placeholder="SKU kodi..."
                                            value={filters.sku || ''}
                                            onChange={(e) => {
                                                setFilters(prev => ({...prev, sku: e.target.value || undefined}));
                                                dispatch(setPagination({...pagination, pageIndex: 0}));
                                            }}
                                        />
                                    </div>

                                    {/* Barkod */}
                                    <div className="space-y-2">
                                        <Label htmlFor="filter-barcode">Barkod</Label>
                                        <Input
                                            id="filter-barcode"
                                            placeholder="Barkod..."
                                            value={filters.barcode || ''}
                                            onChange={(e) => {
                                                setFilters(prev => ({...prev, barcode: e.target.value || undefined}));
                                                dispatch(setPagination({...pagination, pageIndex: 0}));
                                            }}
                                        />
                                    </div>

                                    {/* Sana (dan) */}
                                    <div className="space-y-2">
                                        <Label>Sana (dan)</Label>
                                        <DatePicker
                                            date={filters.from ? new Date(filters.from) : undefined}
                                            setDate={(date) => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    from: date ? date.toISOString().split('T')[0] : undefined
                                                }));
                                                dispatch(setPagination({...pagination, pageIndex: 0}));
                                            }}
                                            placeholder="Sanani tanlang"
                                        />
                                    </div>

                                    {/* Sana (gacha) */}
                                    <div className="space-y-2">
                                        <Label>Sana (gacha)</Label>
                                        <DatePicker
                                            date={filters.to ? new Date(filters.to) : undefined}
                                            setDate={(date) => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    to: date ? date.toISOString().split('T')[0] : undefined
                                                }));
                                                dispatch(setPagination({...pagination, pageIndex: 0}));
                                            }}
                                            placeholder="Sanani tanlang"
                                        />
                                    </div>

                                    {/* Clear filters button */}
                                    <div className="space-y-2 flex items-end">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => {
                                                setFilters({});
                                                dispatch(setPagination({...pagination, pageIndex: 0}));
                                            }}
                                            disabled={Object.keys(filters).length === 0}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Tozalash
                                        </Button>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <DataTable
                        table={table}
                        isFetching={isLoading}
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
