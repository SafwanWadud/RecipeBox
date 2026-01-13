import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    users: defineTable({
        name: v.string(),
        // this the Clerk ID, stored in the subject JWT field
        externalId: v.string(),
    }).index('byExternalId', ['externalId']),
    recipes: defineTable({
        name: v.string(),
        ingredients: v.optional(v.string()),
        directions: v.optional(v.string()),
        rating: v.optional(v.number()),
        activeTime: v.optional(v.number()),
        totalTime: v.optional(v.number()),
        servings: v.optional(v.number()),
        calories: v.optional(v.number()),
        userId: v.id('users'),
        recipeBookId: v.id('recipeBooks'),
    }).index('byRecipeBook', ['recipeBookId']),
    recipeBooks: defineTable({
        name: v.string(),
        description: v.optional(v.string()),
        userId: v.id('users'),
    }).index('byUser', ['userId']),
});
