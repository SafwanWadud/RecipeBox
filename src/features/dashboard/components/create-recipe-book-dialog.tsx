import { useState } from "react";
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

export const CreateRecipeBookDialog = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [isPending, setIsPending] = useState(false);
    const createRecipeBook = useMutation(api.recipeBooks.createRecipeBook);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        try {
            await createRecipeBook({ name: name.trim() });
            setName("");
            setOpen(false);
        } catch (error) {
            console.error("Failed to create recipe book:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Book
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-linear-to-br from-primary/20 to-accent/20 rounded-xl">
                            <Book className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg">Create Recipe Book</DialogTitle>
                            <DialogDescription>Organize your recipes into collections</DialogDescription>
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
                            placeholder="e.g. Grandma's Desserts"
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
                            Create Book
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
