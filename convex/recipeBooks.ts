import { mutation, query, MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

export const getRecipeBook = query({
    args: {
        recipeBookId: v.id("recipeBooks"),
    },
    handler: async (ctx: QueryCtx, args) => {
        return await ctx.db.get("recipeBooks", args.recipeBookId);
    },
});

export const getRecipeBooks = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx: QueryCtx, args) => {
        return await ctx.db
            .query("recipeBooks")
            .withIndex("byUser", (q) => q.eq("userId", args.userId))
            .collect();
    },
});

export const getMyRecipeBooks = query({
    handler: async (ctx: QueryCtx) => {
        const user = await getCurrentUserOrThrow(ctx);
        return await ctx.db
            .query("recipeBooks")
            .withIndex("byUser", (q) => q.eq("userId", user._id))
            .collect();
    },
});

export const createRecipeBook = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx: MutationCtx, args) => {
        const user = await getCurrentUserOrThrow(ctx);
        const recipeBook = await ctx.db.insert("recipeBooks", {
            name: args.name,
            userId: user._id,
            recipes: [],
        });
        return recipeBook;
    },
});

export const addRecipeToBook = mutation({
    args: {
        recipeBookId: v.id("recipeBooks"),
        recipeId: v.id("recipes"),
    },
    handler: async (ctx: MutationCtx, args) => {
        const user = await getCurrentUserOrThrow(ctx);
        const recipeBook = await ctx.db.get("recipeBooks", args.recipeBookId);

        if (!recipeBook) {
            throw new Error("Recipe book not found");
        }

        if (recipeBook.userId !== user._id) {
            throw new Error("You are not authorized to add a recipe to this book");
        }

        recipeBook.recipes.push(args.recipeId);
        await ctx.db.patch("recipeBooks", args.recipeBookId, { recipes: recipeBook.recipes });

        return recipeBook;
    },
});

export const removeRecipeFromBook = mutation({
    args: {
        recipeBookId: v.id("recipeBooks"),
        recipeId: v.id("recipes"),
    },
    handler: async (ctx: MutationCtx, args) => {
        const user = await getCurrentUserOrThrow(ctx);
        const recipeBook = await ctx.db.get("recipeBooks", args.recipeBookId);

        if (!recipeBook) {
            throw new Error("Recipe book not found");
        }

        if (recipeBook.userId !== user._id) {
            throw new Error("You are not authorized to remove a recipe from this book");
        }

        recipeBook.recipes = recipeBook.recipes.filter((id) => id !== args.recipeId);
        await ctx.db.patch("recipeBooks", args.recipeBookId, { recipes: recipeBook.recipes });

        return recipeBook;
    },
});

export const deleteRecipeBook = mutation({
    args: {
        recipeBookId: v.id("recipeBooks"),
    },
    handler: async (ctx: MutationCtx, args) => {
        const user = await getCurrentUserOrThrow(ctx);
        const recipeBook = await ctx.db.get("recipeBooks", args.recipeBookId);

        if (!recipeBook) {
            throw new Error("Recipe book not found");
        }

        if (recipeBook.userId !== user._id) {
            throw new Error("You are not authorized to delete this recipe book");
        }

        await ctx.db.delete("recipeBooks", args.recipeBookId);
    },
});
