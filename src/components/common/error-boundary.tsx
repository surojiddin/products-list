import { useRouteError, isRouteErrorResponse } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ErrorBoundary() {
    const error = useRouteError();

    let errorMessage: string;
    let errorStatus: string | number = "Error";

    if (isRouteErrorResponse(error)) {
        errorStatus = error.status;
        errorMessage = error.statusText || error.data?.message || "Something went wrong";
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else {
        errorMessage = "Unknown error occurred";
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-destructive">
                        {errorStatus}
                    </CardTitle>
                    <CardDescription>
                        Xatolik yuz berdi
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        {errorMessage}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => window.location.href = '/'}
                            variant="default"
                        >
                            Bosh sahifaga qaytish
                        </Button>
                        <Button
                            onClick={() => window.location.reload()}
                            variant="outline"
                        >
                            Qayta yuklash
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
