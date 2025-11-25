import {createBrowserRouter} from "react-router";
import MainPage from "@/pages/main-page.tsx";
import ProductPage from "@/pages/product-page.tsx";
import {DefaultLayout} from "@/layout/DefaultLayout.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        // errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: 'product/:id',
                element: <ProductPage />
            },
        ],
    },
    {
        path: "*",
        element: <div>404</div>,
    }
]);