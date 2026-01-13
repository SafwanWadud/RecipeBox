import { createFileRoute } from "@tanstack/react-router";
import { Recipe } from "@/features/recipe";

export const Route = createFileRoute("/_authenticated/recipe/$recipeId")({
    component: Recipe,
});
