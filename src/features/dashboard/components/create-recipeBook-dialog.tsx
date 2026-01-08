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

export const CreateRecipeBookDialog = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add your logic here to create the recipe book
        console.log("Creating recipe book:", name);

        // Reset form and close dialog after successful creation
        // setName("");
        // setOpen(false);
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
                            Book Name
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

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!name.trim()}>
                            Create Book
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
