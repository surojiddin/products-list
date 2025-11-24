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