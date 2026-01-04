import { mutation, query, MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

export const getRecipe = query({
    args: {
        recipeId: v.id("recipes"),
    },
    handler: async (ctx: QueryCtx, args) => {
        return await ctx.db.get("recipes", args.recipeId);
    },
});

export const getRecipes = query({
    args: {
        recipeBookId: v.id("recipeBooks"),
    },
    handler: async (ctx: QueryCtx, args) => {
        return await ctx.db
            .query("recipes")
            .withIndex("byRecipeBook", (q) => q.eq("recipeBookId", args.recipeBookId))
            .collect();
    },
});

export const createRecipe = mutation({
    args: {
        name: v.string(),
        ingredients: v.optional(v.string()),
        directions: v.optional(v.string()),
        rating: v.optional(v.number()),
        recipeBookId: v.id("recipeBooks"),
    },
    handler: async (ctx: MutationCtx, args) => {
        const user = await getCurrentUserOrThrow(ctx);

        return await ctx.db.insert("recipes", {
            name: args.name,
            ingredients: args.ingredients,
            directions: args.directions,
            rating: args.rating,
            userId: user._id,
            recipeBookId: args.recipeBookId,
        });
    },
});

export const updateRecipe = mutation({
    args: {
        recipeId: v.id("recipes"),
        name: v.string(),
        ingredients: v.optional(v.string()),
        directions: v.optional(v.string()),
        rating: v.optional(v.number()),
        recipeBookId: v.optional(v.id("recipeBooks")),
    },
    handler: async (ctx: MutationCtx, args) => {
        const user = await getCurrentUserOrThrow(ctx);

        const recipe = await ctx.db.get("recipes", args.recipeId);

        if (!recipe) {
            throw new Error("Recipe not found");
        }

        if (recipe.userId !== user._id) {
            throw new Error("You are not authorized to update this recipe");
        }

        return await ctx.db.patch("recipes", args.recipeId, {
            name: args.name,
            ingredients: args.ingredients,
            directions: args.directions,
            rating: args.rating,
            recipeBookId: args.recipeBookId,
        });
    },
});

export const deleteRecipe = mutation({
    args: {
        recipeId: v.id("recipes"),
    },
    handler: async (ctx: MutationCtx, args) => {
        const user = await getCurrentUserOrThrow(ctx);

        const recipe = await ctx.db.get("recipes", args.recipeId);

        if (!recipe) {
            throw new Error("Recipe not found");
        }

        if (recipe.userId !== user._id) {
            throw new Error("You are not authorized to delete this recipe");
        }

        await ctx.db.delete("recipes", args.recipeId);
    },
});
