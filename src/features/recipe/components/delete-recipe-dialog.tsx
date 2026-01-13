import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import type { Id } from "@convex/_generated/dataModel";

interface DeleteRecipeDialogProps {
    recipeId: Id<"recipes">;
    recipeName: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const DeleteRecipeDialog = ({ recipeId, recipeName, open, setOpen }: DeleteRecipeDialogProps) => {
    const [isPending, setIsPending] = useState(false);
    const deleteRecipe = useMutation(api.recipes.deleteRecipe);

    const handleDelete = async () => {
        setIsPending(true);
        try {
            await deleteRecipe({ recipeId });
            setOpen(false);
        } catch (error) {
            console.error("Failed to delete recipe:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-destructive/10 rounded-xl">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg">Delete Recipe</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete{" "}
                                {recipeName ? <strong>"{recipeName}"</strong> : "this recipe"}? This action cannot be
                                undone.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <DialogFooter className="sm:justify-between">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={isPending}>
                        {isPending ? (
                            <>
                                <span className="loader mr-2"></span> Deleting
                            </>
                        ) : (
                            <>Delete</>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
