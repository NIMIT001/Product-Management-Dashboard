import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productTitle?: string;
}

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  productTitle,
}: DeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{' '}
            {productTitle ? (
              <span className="font-semibold text-foreground">
                &quot;{productTitle}&quot;
              </span>
            ) : (
              'this product'
            )}
            ? This will permanently remove the product from your catalog.
          </p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleConfirm}>
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

