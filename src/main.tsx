import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import {ThemeProvider} from "@/providers/theme-provider.tsx";
import {PageTitleProvider} from "@/providers/page-title-provider.tsx";
import {AppLoader} from "@/components/common/app-loader.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
            <PageTitleProvider>
                <Suspense fallback={<AppLoader/>}>
                    <App/>
                </Suspense>
            </PageTitleProvider>
        </ThemeProvider>
    </StrictMode>,
)
