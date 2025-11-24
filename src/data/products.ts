import type {ProductResponse} from "@/types/products.ts";

const productNames = [
    'Smartfon Samsung Galaxy', 'Noutbuk Lenovo IdeaPad', 'Simsiz quloqchin AirPods',
    'Aqlli soat Xiaomi Mi Band', 'Planshet iPad Air', 'Televizor LG 4K',
    'Fotoaparat Canon EOS', 'Simsiz sichqoncha Logitech', 'Portativ zaryadlash Xiaomi',
    'Bluetooth kolonka JBL', 'Monitor Dell UltraSharp', 'Klaviatura Razer',
    'Gaming noutbuk ASUS ROG', 'Smartfon iPhone', 'Planshet Samsung Tab',
    'Naushnik Sony WH', 'Smart TV Samsung', 'Printer HP LaserJet',
    'Router TP-Link', 'SSD Samsung EVO', 'RAM Kingston HyperX',
    'Videokarta NVIDIA RTX', 'Protsessor Intel Core', 'Materinka ASUS Prime',
    'Kullar Corsair RGB', 'Webcam Logitech HD', 'Mikrofon Blue Yeti',
    'Gaming kreslo DXRacer', 'Monitor Samsung Curved', 'Smartfon Xiaomi Redmi'
];

const generateRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

const generateSKU = (index: number) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const rand1 = letters[Math.floor(Math.random() * 26)];
    const rand2 = letters[Math.floor(Math.random() * 26)];
    return `SKU-${rand1}${rand2}-${String(index).padStart(3, '0')}`;
};

const generateBarcode = () => {
    return String(Math.floor(Math.random() * 9000000000000) + 1000000000000);
};

const generatePrice = () => {
    return Math.floor(Math.random() * 10000000) + 100000;
};

const generateProducts = (): ProductResponse => {
    const data = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `${productNames[Math.floor(Math.random() * productNames.length)]} ${Math.floor(Math.random() * 100)}`,
        sku: generateSKU(i + 1),
        barcode: generateBarcode(),
        created_at: generateRandomDate(),
        price: generatePrice(),
    }));

    return {
        data,
        total: 100
    };
};

export const productData: ProductResponse = generateProducts();
