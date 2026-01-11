import { Id, Doc } from "./_generated/dataModel";
import { QueryCtx, MutationCtx } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

type OwnedTable = "recipes" | "recipeBooks";

export async function getAuthorizedDocument<T extends OwnedTable>(
    ctx: QueryCtx | MutationCtx,
    tableName: T,
    id: Id<T>,
): Promise<Doc<T>> {
    const user = await getCurrentUserOrThrow(ctx);
    const doc = await ctx.db.get(tableName, id);

    if (!doc) {
        throw new Error(tableName + " document (id:" + id + ") not found");
    }

    if (doc.userId !== user._id) {
        const actionType = "insert" in ctx.db ? "mutation" : "query";
        throw new Error(
            "Unauthorized " + actionType + " attempt by " + user._id + " on " + tableName + " table for doc id=" + id,
        );
    }

    return doc;
}
