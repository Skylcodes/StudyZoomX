'use client';

import NiceModal, { type NiceModalHocProps } from '@ebay/nice-modal-react';
import { AlertCircleIcon, CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { InputWithAdornments } from '@/components/ui/input-with-adornments';
import { Label } from '@/components/ui/label';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';

export type CopyCreatedApiKeyModalProps = NiceModalHocProps & {
  apiKey: string;
};

export const CopyCreatedApiKeyModal =
  NiceModal.create<CopyCreatedApiKeyModalProps>(({ apiKey }) => {
    const modal = useEnhancedModal();
    const copyToClipboard = useCopyToClipboard();
    const handleCopy = async (): Promise<void> => {
      if (!apiKey) {
        return;
      }
      await copyToClipboard(apiKey);
      toast.success('Copied!');
    };
    return (
      <AlertDialog open={modal.visible}>
        <AlertDialogContent
          className="max-w-sm"
          onClose={modal.handleClose}
          onAnimationEndCapture={modal.handleAnimationEndCapture}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>API key created</AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Copy the API key before closing the modal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col items-start gap-4">
            <Alert variant="warning">
              <div className="flex flex-row items-start gap-2">
                <AlertCircleIcon className="mt-0.5 size-[18px] shrink-0" />
                <AlertDescription>
                  <h3 className="mb-2 font-semibold">
                    We'll show you this key just once
                  </h3>
                  Please copy your key and store it in a safe place. For
                  security reasons we cannot show it again.
                </AlertDescription>
              </div>
            </Alert>
            <div className="flex w-full flex-col space-y-2">
              <Label>API key</Label>
              <InputWithAdornments
                readOnly
                type="text"
                value={apiKey}
                endAdornment={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Copy api key"
                    className="-mr-2.5 size-8"
                    onClick={handleCopy}
                  >
                    <CopyIcon className="size-4 shrink-0" />
                  </Button>
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Please copy the API key before you close the dialog.
            </p>
          </div>
          <AlertDialogFooter>
            <Button
              type="button"
              variant="default"
              onClick={modal.handleClose}
            >
              Got it
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  });
