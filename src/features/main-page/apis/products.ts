import type {ProductFilter, ProductResponse} from "@/types/products.ts";
import {productData} from "@/data/products.ts";

export async function getProducts(filter?: ProductFilter): Promise<ProductResponse> {
    // API dan kelgandek qilish uchun delay qo'shamiz
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredData = [...productData.data];

    // Filterlash logikasi
    if (filter) {
        if (filter.name) {
            filteredData = filteredData.filter(product =>
                product.name.toLowerCase().includes(filter.name!.toLowerCase())
            );
        }

        if (filter.sku) {
            filteredData = filteredData.filter(product =>
                product.sku.toLowerCase().includes(filter.sku!.toLowerCase())
            );
        }

        if (filter.barcode) {
            filteredData = filteredData.filter(product =>
                product.barcode.includes(filter.barcode!)
            );
        }

        if (filter.from) {
            filteredData = filteredData.filter(product =>
                new Date(product.created_at) >= new Date(filter.from!)
            );
        }

        if (filter.to) {
            filteredData = filteredData.filter(product =>
                new Date(product.created_at) <= new Date(filter.to!)
            );
        }
    }

    // Pagination
    const page = filter?.page || 1;
    const limit = filter?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        total: filteredData.length
    };
}