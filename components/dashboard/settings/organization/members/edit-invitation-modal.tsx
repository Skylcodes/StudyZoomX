'use client';

import NiceModal, { NiceModalHocProps } from '@ebay/nice-modal-react';
import { Role } from '@prisma/client';
import { DialogDescription } from '@radix-ui/react-dialog';
import { type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

import { updateInvitation } from '@/actions/invitations/update-invitation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { roleLabels } from '@/constants/labels';
import { MediaQueries } from '@/constants/media-queries';
import { useEnhancedModal } from '@/hooks/use-enhanced-modal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useZodForm } from '@/hooks/use-zod-form';
import { cn } from '@/lib/utils';
import {
  updateInvitationSchema,
  type UpdateInvitationSchema
} from '@/schemas/invitations/update-invitation-schema';
import type { InvitationDto } from '@/types/dtos/invitation-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';

export type EditInvitationModalProps = NiceModalHocProps & {
  profile: ProfileDto;
  invitation: InvitationDto;
};

export const EditInvitationModal = NiceModal.create<EditInvitationModalProps>(
  ({ profile, invitation }) => {
    const modal = useEnhancedModal();
    const mdUp = useMediaQuery(MediaQueries.MdUp, { ssr: false });
    const methods = useZodForm({
      schema: updateInvitationSchema,
      mode: 'onSubmit',
      defaultValues: {
        id: invitation.id,
        role: invitation.role
      }
    });
    const title = 'Update invitation';
    const description =
      'Edit the invitation by changing the form fields below.';
    const canSubmit =
      !methods.formState.isSubmitting &&
      (!methods.formState.isSubmitted || methods.formState.isDirty);
    const onSubmit: SubmitHandler<UpdateInvitationSchema> = async (values) => {
      if (!canSubmit) {
        return;
      }
      const result = await updateInvitation(values);
      if (!result?.serverError && !result?.validationErrors) {
        toast.success('Invitation updated');
        modal.handleClose();
      } else {
        toast.error("Couldn't update invitation");
      }
    };
    const renderForm = (
      <form
        className={cn('flex flex-col gap-4', !mdUp && 'p-4')}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <input
          type="hidden"
          className="hidden"
          disabled={methods.formState.isSubmitting}
          {...methods.register('id')}
        />
        <div className="flex flex-col gap-2 pt-2">
          <FormLabel required>Email</FormLabel>
          <Input
            type="email"
            required
            disabled
            value={invitation.email}
          />
        </div>
        <FormField
          control={methods.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel required>Role</FormLabel>
              <FormControl>
                <Select
                  required
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={
                    methods.formState.isSubmitting ||
                    profile.role === Role.MEMBER
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Role).map((value) => (
                      <SelectItem
                        key={value}
                        value={value}
                      >
                        {roleLabels[value as Role]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    );
    const renderButtons = (
      <>
        <Button
          type="button"
          variant="outline"
          onClick={modal.handleClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="default"
          disabled={!canSubmit}
          loading={methods.formState.isSubmitting}
          onClick={methods.handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </>
    );
    return (
      <FormProvider {...methods}>
        {mdUp ? (
          <Dialog open={modal.visible}>
            <DialogContent
              className="max-w-sm"
              onClose={modal.handleClose}
              onAnimationEndCapture={modal.handleAnimationEndCapture}
            >
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription className="sr-only">
                  {description}
                </DialogDescription>
              </DialogHeader>
              {renderForm}
              <DialogFooter>{renderButtons}</DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer
            open={modal.visible}
            onOpenChange={modal.handleOpenChange}
          >
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription className="sr-only">
                  {description}
                </DrawerDescription>
              </DrawerHeader>
              {renderForm}
              <DrawerFooter className="flex-col-reverse pt-4">
                {renderButtons}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </FormProvider>
    );
  }
);
