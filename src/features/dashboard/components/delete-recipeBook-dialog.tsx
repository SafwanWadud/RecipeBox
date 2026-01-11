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
import { Trash2, AlertTriangle } from "lucide-react";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import type { Id } from "@convex/_generated/dataModel";

interface DeleteRecipeBookDialogProps {
    recipeBookId: Id<"recipeBooks">;
    recipeBookName: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const DeleteRecipeBookDialog = ({
    recipeBookId,
    recipeBookName,
    open,
    setOpen,
}: DeleteRecipeBookDialogProps) => {
    const [isPending, setIsPending] = useState(false);
    const deleteRecipeBook = useMutation(api.recipeBooks.deleteRecipeBook);

    const handleDelete = async () => {
        setIsPending(true);
        try {
            await deleteRecipeBook({ recipeBookId });
            setOpen(false);
        } catch (error) {
            console.error("Failed to delete recipe book:", error);
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
                            <DialogTitle className="text-lg">Delete Recipe Book</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete{" "}
                                {recipeBookName ? <strong>"{recipeBookName}"</strong> : "this recipe book"}? This action
                                cannot be undone.
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
