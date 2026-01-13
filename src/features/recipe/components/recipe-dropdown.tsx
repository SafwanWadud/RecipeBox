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
import { DeleteRecipeDialog } from "./delete-recipe-dialog";
import { EditRecipeDialog } from "./edit-recipe-dialog";

interface RecipeDropdownProps {
    recipeId: Id<"recipes">;
    recipeName: string;
}

export const RecipeDropdown = ({ recipeId, recipeName }: RecipeDropdownProps) => {
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
                            Edit Recipe <Pencil className="ml-auto h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => setOpenDelete(true)}
                            className="text-destructive focus:text-destructive">
                            Delete Recipe <Trash2 className="ml-auto h-4 w-4" />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditRecipeDialog recipeId={recipeId} recipeName={recipeName} open={openEdit} setOpen={setOpenEdit} />
            <DeleteRecipeDialog recipeId={recipeId} recipeName={recipeName} open={openDelete} setOpen={setOpenDelete} />
        </>
    );
};
