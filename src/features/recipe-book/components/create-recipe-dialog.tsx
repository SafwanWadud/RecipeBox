import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Book } from "lucide-react";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import type { Id } from "@convex/_generated/dataModel";

interface CreateRecipeDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    recipeBookId: Id<"recipeBooks">;
}

export const CreateRecipeDialog = ({ open, setOpen, recipeBookId }: CreateRecipeDialogProps) => {
    const [name, setName] = useState("");
    const [isPending, setIsPending] = useState(false);
    const createRecipe = useMutation(api.recipes.createRecipe);

    useEffect(() => {
        if (!open) {
            setName("");
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        try {
            await createRecipe({ name: name.trim(), recipeBookId });
            setName("");
            setOpen(false);
        } catch (error) {
            console.error("Failed to create recipe:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    <Plus className="mr-2 h-5 w-5" />
                    Add Recipe
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-linear-to-br from-primary/20 to-accent/20 rounded-xl">
                            <Book className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg">Create Recipe</DialogTitle>
                            <DialogDescription>Add a new recipe to your collection</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <label htmlFor="book-name" className="text-sm font-medium text-foreground">
                            Name
                        </label>
                        <Input
                            id="book-name"
                            type="text"
                            placeholder="e.g. Pudding"
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
                        <Button type="submit" disabled={!name.trim() || isPending}>
                            {isPending && <span className="loader mr-2"></span>}
                            Create Recipe
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
