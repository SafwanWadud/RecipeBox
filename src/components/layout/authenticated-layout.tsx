import { Navigate, Outlet } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { LoadingPage } from "@/components/layout/loading-page";

export const AuthenticatedLayout = () => {
    return (
        <>
            <AuthLoading>
                <LoadingPage />
            </AuthLoading>
            <Authenticated>
                <Outlet />
            </Authenticated>
            <Unauthenticated>
                <Navigate to="/" />
            </Unauthenticated>
        </>
    );
};
