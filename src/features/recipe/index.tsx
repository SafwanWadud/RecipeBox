import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ArrowLeft,
    ChefHat,
    Clock,
    Flame,
    MoreHorizontal,
    Timer,
    Users,
    Utensils,
    Star,
    Pencil,
    Trash2,
} from "lucide-react";
import type { Id } from "@convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton } from "@clerk/clerk-react";
import { ModeToggle } from "@/components/mode-toggle";

export const Recipe = () => {
    const navigate = useNavigate();
    const { recipeId } = useParams({ from: "/_authenticated/recipe/$recipeId" });

    const recipe = useQuery(api.recipes.getRecipe, {
        recipeId: recipeId as Id<"recipes">,
    });

    if (recipe === undefined) {
        return <RecipeSkeleton />;
    }

    if (recipe === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="p-4 rounded-full bg-muted">
                    <Utensils className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold">Recipe not found</h2>
                <Button variant="outline" onClick={() => navigate({ to: "/dashboard" })}>
                    Go to Dashboard
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 transition-all duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="RecipeBox Logo" className="h-10 w-10 object-contain" />
                        <Link
                            to="/dashboard"
                            className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity">
                            RecipeBox
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <UserButton />
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <Button
                    variant="ghost"
                    className="-ml-2 text-muted-foreground hover:text-foreground gap-2"
                    onClick={() =>
                        navigate({
                            to: `/recipe-book/${recipe.recipeBookId}`,
                        })
                    }>
                    <ArrowLeft className="h-4 w-4" />
                    Back to Book
                </Button>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Recipe
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Recipe
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-background to-secondary/20 border border-border/50 shadow-xl p-8 md:p-12">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-5">
                        <ChefHat className="w-96 h-96 rotate-12" />
                    </div>

                    <div className="relative z-10 max-w-3xl space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-primary/80 uppercase tracking-wider">
                                <Utensils className="h-4 w-4" />
                                Recipe
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                                {recipe.name}
                            </h1>
                        </div>

                        {/* Stats Grid */}
                        <div className="flex flex-wrap gap-4 md:gap-8 pt-4">
                            <StatBadge
                                icon={<Clock className="h-5 w-5" />}
                                label="Prep Time"
                                value={typeof recipe.activeTime === "number" ? `${recipe.activeTime}m` : "--"}
                            />
                            <StatBadge
                                icon={<Timer className="h-5 w-5" />}
                                label="Total Time"
                                value={typeof recipe.totalTime === "number" ? `${recipe.totalTime}m` : "--"}
                            />
                            <StatBadge
                                icon={<Users className="h-5 w-5" />}
                                label="Servings"
                                value={typeof recipe.servings === "number" ? `${recipe.servings}` : "--"}
                            />
                            <StatBadge
                                icon={<Flame className="h-5 w-5" />}
                                label="Calories"
                                value={typeof recipe.calories === "number" ? `${recipe.calories}` : "--"}
                            />
                            {typeof recipe.rating === "number" && (
                                <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-border/50">
                                    <Star className="h-5 w-5 text-orange-400 fill-orange-400" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                            Rating
                                        </span>
                                        <span className="font-semibold text-lg leading-none">{recipe.rating}/5</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Ingredients Column */}
                    <div className="md:col-span-4 space-y-6">
                        <Card className="h-full border-border/60 bg-card/50 backdrop-blur-xs">
                            <CardHeader className="pb-3 border-b border-border/40">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <span className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <Utensils className="h-5 w-5" />
                                    </span>
                                    Ingredients
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {recipe.ingredients ? (
                                    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-muted-foreground leading-relaxed">
                                        {recipe.ingredients}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground/50 italic text-center py-8">
                                        No ingredients listed
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Directions Column */}
                    <div className="md:col-span-8 space-y-6">
                        <Card className="h-full border-border/60 bg-card/50 backdrop-blur-xs">
                            <CardHeader className="pb-3 border-b border-border/40">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <span className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <ChefHat className="h-5 w-5" />
                                    </span>
                                    Directions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {recipe.directions ? (
                                    <div className="prose prose-base dark:prose-invert max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed space-y-4">
                                        {recipe.directions}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground/50 italic text-center py-12">
                                        No directions listed
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

const StatBadge = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center gap-3 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-border/50 min-w-[120px]">
        <div className="text-primary/80">{icon}</div>
        <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
            <span className="font-semibold text-lg leading-none">{value}</span>
        </div>
    </div>
);

const RecipeSkeleton = () => (
    <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <Skeleton className="h-[300px] w-full rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                    <Skeleton className="h-[400px] w-full" />
                </div>
                <div className="md:col-span-8">
                    <Skeleton className="h-[600px] w-full" />
                </div>
            </div>
        </main>
    </div>
);
