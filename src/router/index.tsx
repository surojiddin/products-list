import {createBrowserRouter} from "react-router";
import MainPage from "@/pages/main-page.tsx";
import ProductPage from "@/pages/product-page.tsx";
import {DefaultLayout} from "@/layout/DefaultLayout.tsx";
import {ErrorBoundary} from "@/components/common/error-boundary.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <MainPage />,
                errorElement: <ErrorBoundary />
            },
            {
                path: 'product/:id',
                element: <ProductPage />,
                errorElement: <ErrorBoundary />
            },
        ],
    },
    {
        path: "*",
        element: <div>404</div>,
    }
]);