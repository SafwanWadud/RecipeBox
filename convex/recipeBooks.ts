import { mutation, query, MutationCtx, QueryCtx } from './_generated/server';
import { v } from 'convex/values';
import { getCurrentUserOrThrow } from './users';
import { getAuthorizedDocument } from './utils';

export const getRecipeBook = query({
    args: {
        recipeBookId: v.id('recipeBooks'),
    },
    handler: async (ctx: QueryCtx, args) => {
        return await ctx.db.get('recipeBooks', args.recipeBookId);
    },
});

export const getRecipeBooks = query({
    args: {
        userId: v.id('users'),
    },
    handler: async (ctx: QueryCtx, args) => {
        return await ctx.db
            .query('recipeBooks')
            .withIndex('byUser', (q) => q.eq('userId', args.userId))
            .collect();
    },
});

export const getMyRecipeBooks = query({
    handler: async (ctx: QueryCtx) => {
        const user = await getCurrentUserOrThrow(ctx);
        return await ctx.db
            .query('recipeBooks')
            .withIndex('byUser', (q) => q.eq('userId', user._id))
            .collect();
    },
});

export const createRecipeBook = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx: MutationCtx, args) => {
        const user = await getCurrentUserOrThrow(ctx);
        const recipeBook = await ctx.db.insert('recipeBooks', {
            name: args.name,
            userId: user._id,
            description: '',
        });
        return recipeBook;
    },
});

export const updateRecipeBook = mutation({
    args: {
        recipeBookId: v.id('recipeBooks'),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
    },
    handler: async (ctx: MutationCtx, args) => {
        await getAuthorizedDocument(ctx, 'recipeBooks', args.recipeBookId);
        const recipeBook = await ctx.db.patch('recipeBooks', args.recipeBookId, {
            name: args.name,
            description: args.description,
        });
        return recipeBook;
    },
});

export const deleteRecipeBook = mutation({
    args: {
        recipeBookId: v.id('recipeBooks'),
    },
    handler: async (ctx: MutationCtx, args) => {
        await getAuthorizedDocument(ctx, 'recipeBooks', args.recipeBookId);
        await ctx.db.delete('recipeBooks', args.recipeBookId);
    },
});
