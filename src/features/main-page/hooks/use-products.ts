import {useQuery} from "@tanstack/react-query";
import type {ProductFilter} from "@/types/products.ts";
import {getProducts} from "@/features/main-page/apis/products.ts";

export function useGetProducts(filter?: ProductFilter) {
    return useQuery({
        queryKey: ['products', filter],
        queryFn: () => getProducts(filter),
    });
}