import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import {ThemeProvider} from "@/providers/theme-provider.tsx";
import {PageTitleProvider} from "@/providers/page-title-provider.tsx";
import {AppLoader} from "@/components/common/app-loader.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 daqiqa
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="ui-theme">
                <PageTitleProvider>
                    <Suspense fallback={<AppLoader/>}>
                        <App/>
                    </Suspense>
                </PageTitleProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
)
