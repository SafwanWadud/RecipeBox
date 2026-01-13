import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Book } from 'lucide-react';
import { api } from '@convex/_generated/api';
import { useMutation } from 'convex/react';
import type { Id } from '@convex/_generated/dataModel';

interface EditRecipeBookDialogProps {
    recipeBookId: Id<'recipeBooks'>;
    recipeBookName: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const EditRecipeBookDialog = ({ recipeBookId, recipeBookName, open, setOpen }: EditRecipeBookDialogProps) => {
    const [name, setName] = useState(recipeBookName);
    const [isPending, setIsPending] = useState(false);
    const updateRecipeBook = useMutation(api.recipeBooks.updateRecipeBook);

    useEffect(() => {
        if (open) {
            setName(recipeBookName);
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        try {
            await updateRecipeBook({ recipeBookId, name: name.trim() });
            setName('');
            setOpen(false);
        } catch (error) {
            console.error('Failed to update recipe book:', error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <div className='flex items-center gap-3'>
                        <div className='p-2.5 bg-linear-to-br from-primary/20 to-accent/20 rounded-xl'>
                            <Book className='h-5 w-5 text-primary' />
                        </div>
                        <div>
                            <DialogTitle className='text-lg'>Edit Recipe Book</DialogTitle>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className='space-y-6 pt-4'>
                    <div className='space-y-2'>
                        <label htmlFor='book-name' className='text-sm font-medium text-foreground'>
                            Name
                        </label>
                        <Input id='book-name' type='text' value={name} onChange={(e) => setName(e.target.value)} className='w-full' autoFocus />
                    </div>

                    <DialogFooter className='sm:justify-between'>
                        <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type='submit' disabled={!name.trim() || name.trim() === recipeBookName || isPending}>
                            {isPending ? (
                                <>
                                    <span className='loader mr-2'></span> Saving...
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
