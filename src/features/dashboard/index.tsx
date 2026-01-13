import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Book, Plus, ChefHat, Search } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { api } from '@convex/_generated/api';
import { useQuery } from 'convex/react';
import { CreateRecipeBookDialog } from './components/create-recipe-book-dialog';
import { ModeToggle } from '@/components/mode-toggle';
import { RecipeBookDropdown } from './components/recipebook-dropdown';
import { useState } from 'react';

export const Dashboard = () => {
    const { user } = useUser();
    const [openCreateRecipeBook, setOpenCreateRecipeBook] = useState(false);
    const recipeBooks = useQuery(api.recipeBooks.getMyRecipeBooks);
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-background'>
            {/* Header */}
            <header className='border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
                    <Link to='/dashboard' className='text-xl font-bold text-foreground'>
                        <div className='flex items-center'>
                            <img src='/logo.png' alt='RecipeBox Logo' className='h-10 w-10 object-contain' />
                            <span>RecipeBox</span>
                        </div>
                    </Link>
                    <div className='flex items-center gap-4'>
                        <div className='hidden md:flex relative'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                            <Input type='search' placeholder='Search recipes...' className='pl-9 w-64' />
                        </div>
                        <UserButton />
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Welcome Section */}
                <div className='mb-8 text-center'>
                    <h1 className='text-3xl font-bold text-foreground'>Welcome back, {user?.firstName || 'Chef'}!</h1>
                    <p className='text-muted-foreground mt-2'>What are we cooking today?</p>
                </div>

                <div className='space-y-6'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold flex items-center gap-2'>
                            <Book className='h-5 w-5 text-primary' />
                            Your Recipe Books
                        </h2>
                        <CreateRecipeBookDialog open={openCreateRecipeBook} setOpen={setOpenCreateRecipeBook} />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {!recipeBooks || recipeBooks.length === 0 ? (
                            <Card
                                onClick={() => setOpenCreateRecipeBook(true)}
                                className='border-2 border-dashed border-border bg-transparent hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[200px] gap-2 text-muted-foreground hover:text-primary'>
                                <Plus className='h-8 w-8' />
                                <span className='font-medium'>Create New Book</span>
                            </Card>
                        ) : (
                            recipeBooks.map((recipeBook) => (
                                <Card
                                    onClick={() => navigate({ to: `/recipe-book/${recipeBook._id}` })}
                                    key={recipeBook._id}
                                    className='group relative hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1'>
                                    <CardHeader>
                                        <CardAction
                                            onClick={(e) => e.stopPropagation()}
                                            className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 has-data-[state=open]:opacity-100 transition-opacity z-10'>
                                            <RecipeBookDropdown recipeBookId={recipeBook._id} recipeBookName={recipeBook.name} />
                                        </CardAction>
                                    </CardHeader>
                                    <div className='h-24 bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center'>
                                        <ChefHat className='h-10 w-10 text-primary/40 group-hover:text-primary/60 transition-colors' />
                                    </div>
                                    <CardContent>
                                        <CardTitle className='text-lg'>{recipeBook.name}</CardTitle>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
