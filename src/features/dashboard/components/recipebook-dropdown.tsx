"use client";

import { useState } from "react";
import { MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Id } from "@convex/_generated/dataModel";
import { DeleteRecipeBookDialog } from "./delete-recipe-book-dialog";
import { EditRecipeBookDialog } from "./edit-recipe-book-dialog";

interface RecipeBookDropdownProps {
    recipeBookId: Id<"recipeBooks">;
    recipeBookName: string;
}

export const RecipeBookDropdown = ({ recipeBookId, recipeBookName }: RecipeBookDropdownProps) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" aria-label="Open menu" size="icon-sm">
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => setOpenEdit(true)}>
                            Edit Recipe Book <Pencil className="ml-auto h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => setOpenDelete(true)}
                            className="text-destructive focus:text-destructive">
                            Delete Recipe Book <Trash2 className="ml-auto h-4 w-4" />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditRecipeBookDialog
                recipeBookId={recipeBookId}
                recipeBookName={recipeBookName}
                open={openEdit}
                setOpen={setOpenEdit}
            />
            <DeleteRecipeBookDialog
                recipeBookId={recipeBookId}
                recipeBookName={recipeBookName}
                open={openDelete}
                setOpen={setOpenDelete}
            />
        </>
    );
};
