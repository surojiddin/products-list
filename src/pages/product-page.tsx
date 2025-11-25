import {useNavigate, useParams} from "react-router";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {productData} from "@/data/products.ts";
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeftIcon} from "lucide-react";
import {humanizeDateTime} from "@/utils/humanize.ts";

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = productData.data.find(p => p.id === Number(id));

    if (!product) {
        return (
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Mahsulot topilmadi</CardTitle>
                    <CardDescription>ID: {id} bo'lgan mahsulot mavjud emas</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <>
            <Card className="max-w-4xl mx-auto">
                <CardHeader className="flex items-center justify-between">
                    <div>
                        <CardTitle>Mahsulot</CardTitle>
                        <CardDescription>Mahsulot haqida ma'lumot</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                    </Button>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li className="flex items-center justify-between">
                            <span>ID</span>
                            <span>{product.id}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span>Nomi</span>
                            <span>{product.name}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span>SKU</span>
                            <span>{product.sku}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span>Barcode</span>
                            <span>{product.barcode}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span>Narxi</span>
                            <span>{product.price.toLocaleString('uz-UZ')} so'm</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span>Yaratilgan vaqti</span>
                            <span>{humanizeDateTime(product.created_at)}</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}
