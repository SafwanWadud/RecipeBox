import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserButton } from '@clerk/clerk-react';
import { ChefHat, Search, Users, ArrowLeft, MoreHorizontal, Timer, Flame, Utensils, Plus } from 'lucide-react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { ModeToggle } from '@/components/mode-toggle';
import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@convex/_generated/api';
import type { Id } from '@convex/_generated/dataModel';
import { CreateRecipeDialog } from './components/create-recipe-dialog';
import { RecipeBookDropdown } from '../dashboard/components/recipebook-dropdown';

export const RecipeBook = () => {
    const [openCreateRecipeDialog, setOpenCreateRecipeDialog] = useState(false);
    const navigate = useNavigate();
    const recipeBookId = useParams({
        from: '/_authenticated/recipe-book/$recipe-book',
        select: (params) => params['recipe-book'],
    });
    const recipeBook = useQuery(api.recipeBooks.getRecipeBook, { recipeBookId: recipeBookId as Id<'recipeBooks'> });
    const recipes = useQuery(api.recipes.getRecipes, recipeBookId ? { recipeBookId: recipeBookId as Id<'recipeBooks'> } : 'skip');
    const [searchQuery, setSearchQuery] = useState('');

    if (!recipeBook) {
        return <div>Recipe book not found</div>;
    }

    return (
        <div className='min-h-screen bg-background pb-20'>
            {/* Header */}
            <header className='border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10 transition-all duration-200'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <img src='/logo.png' alt='RecipeBox Logo' className='h-10 w-10 object-contain' />
                        <Link to='/dashboard' className='text-xl font-bold text-foreground hover:opacity-80 transition-opacity'>
                            RecipeBox
                        </Link>
                    </div>
                    <div className='flex items-center gap-4'>
                        <UserButton />
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
                {/* Back Link */}
                <Button
                    variant='ghost'
                    className='pl-0 hover:bg-transparent hover:text-primary gap-2 text-muted-foreground transition-colors'
                    onClick={() => navigate({ to: '/dashboard' })}>
                    <ArrowLeft className='h-4 w-4' />
                    Back to Dashboard
                </Button>

                {/* Banner Section */}
                <div className='relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-background border border-border/50 shadow-xl'>
                    <div className='absolute top-0 right-0 p-12 opacity-10'>
                        <ChefHat className='w-64 h-64 -rotate-12' />
                    </div>

                    <div className='relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between'>
                        <div className='space-y-4 max-w-2xl'>
                            <div className='inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 cursor-default'>
                                {recipes?.length} Recipes
                            </div>
                            <h1 className='text-4xl md:text-5xl font-bold tracking-tight text-foreground'>{recipeBook?.name}</h1>
                            <p className='text-lg text-muted-foreground leading-relaxed'>{recipeBook?.description}</p>
                        </div>

                        <div className='flex gap-3'>
                            <CreateRecipeDialog
                                recipeBookId={recipeBookId as Id<'recipeBooks'>}
                                open={openCreateRecipeDialog}
                                setOpen={setOpenCreateRecipeDialog}
                            />
                            <RecipeBookDropdown recipeBookId={recipeBookId as Id<'recipeBooks'>} recipeBookName={recipeBook.name} />
                        </div>
                    </div>
                </div>

                {/* Search & Filter Section */}
                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-20 z-9 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 sm:mx-0 sm:px-0 border-b sm:border-none border-border/40'>
                    <div className='relative w-full sm:max-w-md group'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors' />
                        <Input
                            type='search'
                            placeholder='Filter recipes...'
                            className='pl-10 h-11 bg-card/50 border-border/60 focus:bg-card transition-all'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center gap-2 self-end sm:self-auto'>
                        {/* Placeholder for future sort/filter controls */}
                        <div className='text-sm text-muted-foreground font-medium'>Showing all recipes</div>
                    </div>
                </div>

                {/* Recipe List */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {recipes
                        ?.filter((recipe) => recipe.name.toLowerCase().includes(searchQuery.trim().toLowerCase()))
                        .map((recipe) => (
                            <Card
                                onClick={() => navigate({ to: `/recipe/${recipe._id}` })}
                                key={recipe._id}
                                className='group hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 border-border/60 cursor-pointer overflow-hidden backdrop-blur-xs bg-card/80'>
                                <div className='h-48 bg-secondary/30 relative overflow-hidden'>
                                    <div className='absolute inset-0 flex items-center justify-center text-muted-foreground/20 group-hover:scale-105 transition-transform duration-500'>
                                        <Utensils className='h-16 w-16' />
                                    </div>
                                </div>
                                <CardContent>
                                    <h3 className='font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors'>{recipe.name}</h3>

                                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                                        <div className='flex items-center gap-1.5'>
                                            {recipe.totalTime && (
                                                <>
                                                    <Timer className='h-4 w-4 text-primary/70' />
                                                    {recipe.totalTime}
                                                </>
                                            )}
                                        </div>
                                        <div className='flex items-center gap-1.5'>
                                            {recipe.servings && (
                                                <>
                                                    <Users className='h-4 w-4 text-primary/70' />
                                                    {recipe.servings}
                                                </>
                                            )}
                                        </div>
                                        <div className='flex items-center gap-1.5'>
                                            {recipe.calories && (
                                                <>
                                                    <Flame className='h-4 w-4 text-primary/70' />
                                                    {recipe.calories}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                    {/* Add New Recipe Card (Empty State-ish) */}
                    <Card
                        onClick={() => setOpenCreateRecipeDialog(true)}
                        className='border-2 border-dashed border-border bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[300px] gap-4 group text-muted-foreground hover:text-primary'>
                        <div className='h-16 w-16 rounded-full bg-secondary group-hover:bg-primary/10 flex items-center justify-center transition-colors'>
                            <Plus className='h-8 w-8' />
                        </div>
                        <div className='text-center'>
                            <span className='font-semibold text-lg block'>Add New Recipe</span>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
};
