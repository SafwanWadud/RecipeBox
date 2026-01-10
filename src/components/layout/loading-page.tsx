import { Loader2 } from "lucide-react";

export const LoadingPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-row items-center gap-2">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="text-lg text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
};
