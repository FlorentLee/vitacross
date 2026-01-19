import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export default function SubscriptionModal({ open, onOpenChange, onConfirm }: SubscriptionModalProps) {
  const [agreed, setAgreed] = useState(true);

  const handleConfirm = () => {
    if (agreed) {
      toast.success("Subscribed successfully! You will receive the latest offers.");
    }
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to VitaCross!</DialogTitle>
          <DialogDescription>
            Stay updated with our latest medical consultation offers and health news.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="subscribe-mandatory" 
              checked={agreed} 
              onCheckedChange={(c) => setAgreed(!!c)}
            />
            <Label htmlFor="subscribe-mandatory" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Subscribe to vitacross@163.com to get the latest offers and consultation updates
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm} className="w-full">Confirm & Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
