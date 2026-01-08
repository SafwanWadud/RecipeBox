import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/context/theme-provider";

const RootLayout = () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Outlet />
        <TanStackRouterDevtools />
    </ThemeProvider>
);

export const Route = createRootRoute({ component: RootLayout });
