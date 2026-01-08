import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Book, Plus, ChefHat, Search } from "lucide-react";
import { Link, Navigate } from "@tanstack/react-router";
import { api } from "@convex/_generated/api";
import { Authenticated, AuthLoading, useConvexAuth, useQuery } from "convex/react";
import { CreateRecipeBookDialog } from "./components/create-recipeBook-dialog";

// Placeholder data for UI demonstration
const PLACEHOLDER_BOOKS = [
    { id: 1, name: "Grandma's Favorites", recipeCount: 12, color: "bg-orange-100" },
    { id: 2, name: "Weeknight Dinners", recipeCount: 8, color: "bg-blue-100" },
    { id: 3, name: "Holiday Feast", recipeCount: 5, color: "bg-red-100" },
];

export const Dashboard = () => {
    const { user } = useUser();
    const { isAuthenticated, isLoading } = useConvexAuth();
    const recipeBooks = useQuery(api.recipeBooks.getMyRecipeBooks, isLoading && isAuthenticated ? {} : "skip");

    if (isLoading) {
        // Show loading state while user info is being fetched
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <AuthLoading>
                <div>Loading authentication...</div>
            </AuthLoading>
            <Authenticated>
                <div className="min-h-screen bg-background">
                    {/* Header */}
                    <header className="border-b border-border bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🍳</span>
                                <Link to="/dashboard" className="text-xl font-bold text-foreground">
                                    RecipeBox
                                </Link>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="hidden md:flex relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search recipes..."
                                        className="pl-9 w-64 bg-secondary/50 border-0 focus-visible:ring-1"
                                    />
                                </div>
                                <UserButton />
                            </div>
                        </div>
                    </header>

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-foreground">
                                Welcome back, {user?.firstName || "Chef"}!
                            </h1>
                            <p className="text-muted-foreground mt-2">What are we cooking today?</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content - Recipe Books */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <Book className="h-5 w-5 text-primary" />
                                        Your Recipe Books
                                    </h2>
                                    <CreateRecipeBookDialog />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {!recipeBooks ? (
                                        <div>You have no recipe books. Create your first one!</div>
                                    ) : (
                                        recipeBooks.map((recipeBook) => (
                                            <Card
                                                key={recipeBook._id}
                                                className="group hover:shadow-md transition-all cursor-pointer border-0 shadow-sm overflow-hidden">
                                                <div
                                                    className={`h-24 flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                                                    <ChefHat className="h-10 w-10 text-black/10" />
                                                </div>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-lg">{recipeBook.name}</CardTitle>
                                                </CardHeader>
                                                <CardFooter className="text-sm text-muted-foreground">
                                                    {recipeBook.recipes.length} recipes
                                                </CardFooter>
                                            </Card>
                                        ))
                                    )}

                                    {/* Add New Book Card (Visual cue) */}
                                    <Card className="border-2 border-dashed border-muted bg-transparent hover:bg-secondary/30 transition-colors cursor-pointer flex flex-col items-center justify-center h-50 gap-2 text-muted-foreground hover:text-primary">
                                        <Plus className="h-8 w-8" />
                                        <span className="font-medium">Create New Book</span>
                                    </Card>
                                </div>
                            </div>

                            {/* Sidebar - Actions & Form */}
                            <div className="space-y-6">
                                {/* Create Book Form */}
                                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-primary">
                                            <Plus className="h-5 w-5" />
                                            New Recipe Book
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium leading-none">Book Name</label>
                                            <Input placeholder="e.g. Grandma's Desserts" />
                                        </div>
                                        <Button className="w-full">Create Book</Button>
                                    </CardContent>
                                </Card>

                                {/* Quick Stats or Tips */}
                                <Card className="border-0 bg-linear-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                                <ChefHat className="h-6 w-6 text-orange-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                                                    Pro Tip
                                                </h3>
                                                <p className="text-sm text-orange-700/80 dark:text-orange-200/80 mt-1">
                                                    Organize recipes by occasion (e.g., "Christmas Dinner") to make meal
                                                    planning easier!
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </main>
                </div>
            </Authenticated>
        </>
    );
};
