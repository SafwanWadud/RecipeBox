import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Book } from "lucide-react";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import type { Id } from "@convex/_generated/dataModel";

interface EditRecipeDialogProps {
    recipeId: Id<"recipes">;
    recipeName: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const EditRecipeDialog = ({ recipeId, recipeName, open, setOpen }: EditRecipeDialogProps) => {
    const [name, setName] = useState(recipeName);
    const [isPending, setIsPending] = useState(false);
    const updateRecipe = useMutation(api.recipes.updateRecipe);

    useEffect(() => {
        if (open) {
            setName(recipeName);
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        try {
            await updateRecipe({ recipeId, name: name.trim() });
            setName("");
            setOpen(false);
        } catch (error) {
            console.error("Failed to update recipe:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-linear-to-br from-primary/20 to-accent/20 rounded-xl">
                            <Book className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg">Edit Recipe</DialogTitle>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <label htmlFor="recipe-name" className="text-sm font-medium text-foreground">
                            Name
                        </label>
                        <Input
                            id="recipe-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                            autoFocus
                        />
                    </div>

                    <DialogFooter className="sm:justify-between">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!name.trim() || name.trim() === recipeName || isPending}>
                            {isPending ? (
                                <>
                                    <span className="loader mr-2"></span> Saving...
                                </>
                            ) : (
                                <>Save</>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
