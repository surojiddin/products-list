export interface Product {
    id: number;
    name: string;
    barcode: string;
    sku: string;
    price: number;
    created_at: string;
}

export interface ProductResponse {
    data: Product[];
    total: number;
}

export interface ProductFilter {
    name?: string;
    barcode?: string;
    sku?: string;
    from?: string;
    to?: string;
    limit?: number;
    page?: number;
}