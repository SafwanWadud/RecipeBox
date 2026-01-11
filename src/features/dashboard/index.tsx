import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Book, Plus, ChefHat, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { CreateRecipeBookDialog } from "./components/create-recipeBook-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { RecipeBookDropdown } from "./components/recipebook-dropdown";

export const Dashboard = () => {
    const { user } = useUser();
    const recipeBooks = useQuery(api.recipeBooks.getMyRecipeBooks);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🍳</span>
                        <Link to="/dashboard" className="text-xl font-bold text-foreground">
                            RecipeBox
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search recipes..." className="pl-9 w-64" />
                        </div>
                        <UserButton />
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.firstName || "Chef"}!</h1>
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
                            {!recipeBooks || recipeBooks.length === 0 ? (
                                <div className="text-muted-foreground col-span-2">
                                    You have no recipe books. Create your first one!
                                </div>
                            ) : (
                                recipeBooks.map((recipeBook) => (
                                    <Card
                                        key={recipeBook._id}
                                        className="group relative hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                            <RecipeBookDropdown
                                                recipeBookId={recipeBook._id}
                                                recipeBookName={recipeBook.name}
                                            />
                                        </div>
                                        <div className="h-24 bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-t-lg">
                                            <ChefHat className="h-10 w-10 text-primary/40 group-hover:text-primary/60 transition-colors" />
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
                            <Card className="border-2 border-dashed border-border bg-transparent hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[200px] gap-2 text-muted-foreground hover:text-primary">
                                <Plus className="h-8 w-8" />
                                <span className="font-medium">Create New Book</span>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar - Actions & Form */}
                    <div className="space-y-6">
                        {/* Create Book Form */}
                        <Card className="shadow-lg">
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
                        <Card className="bg-linear-to-br from-secondary to-accent/20">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-card rounded-lg shadow-sm">
                                        <ChefHat className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Pro Tip</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
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
    );
};
