import { createFileRoute } from '@tanstack/react-router';
import { RecipeBook } from '@/features/recipe-book';

export const Route = createFileRoute('/_authenticated/recipe-book/$recipe-book')({
    component: RecipeBook,
});
