'use client';

import * as React from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { TrashIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { CropPhotoModal } from '@/components/dashboard/settings/account/profile/crop-photo-modal';
import { NextButton } from '@/components/onboarding/next-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { ImageDropzone } from '@/components/ui/image-dropzone';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { MAX_IMAGE_SIZE } from '@/constants/limits';
import { cn, getInitials } from '@/lib/utils';
import { type CompleteUserOnboardingSchema } from '@/schemas/onboarding/complete-user-onboarding-schema';
import { FileUploadAction } from '@/types/file-upload-action';

export type OnboardingProfileStepProps =
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    email: string;
    canSubmit: boolean;
    loading: boolean;
    isLastStep: boolean;
  };

export function OnboardingProfileStep({
  email,
  canSubmit,
  loading,
  isLastStep,
  className,
  ...other
}: OnboardingProfileStepProps): React.JSX.Element {
  const methods = useFormContext<CompleteUserOnboardingSchema>();
  const image = methods.watch('image');
  const name = methods.watch('name');
  const handleDrop = async (files: File[]): Promise<void> => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error("Uploaded image shouldn't exceed 5mb size limit");
      } else {
        const base64Image: string = await NiceModal.show(CropPhotoModal, {
          file,
          aspectRatio: 1,
          circularCrop: true
        });

        if (base64Image) {
          methods.setValue('action', FileUploadAction.Update);
          methods.setValue('image', base64Image, {
            shouldValidate: true,
            shouldDirty: true
          });
        }
      }
    }
  };
  const handleRemoveImage = (): void => {
    methods.setValue('action', FileUploadAction.Delete);
    methods.setValue('image', undefined, {
      shouldValidate: true,
      shouldDirty: true
    });
  };
  return (
    <div
      className={cn('flex flex-col gap-4', className)}
      {...other}
    >
      <div className="mt-4 flex items-center justify-center pb-6">
        <div className="relative">
          <ImageDropzone
            accept={{ 'image/*': [] }}
            multiple={false}
            borderRadius="full"
            onDrop={handleDrop}
            src={image}
            className="max-h-[120px] min-h-[120px] w-[120px] p-0.5"
            disabled={loading}
          >
            <Avatar className="size-28">
              <AvatarFallback className="size-28 text-2xl">
                {name && getInitials(name)}
              </AvatarFallback>
            </Avatar>
          </ImageDropzone>
          {image && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -bottom-1 -right-1 z-10 size-8 rounded-full bg-background !opacity-100"
                  disabled={loading}
                  onClick={handleRemoveImage}
                >
                  <TrashIcon className="size-4 shrink-0" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Remove image</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="grid gap-x-8 gap-y-4">
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  maxLength={64}
                  autoComplete="name"
                  required
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  maxLength={32}
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-2 flex flex-col space-y-2">
          <FormLabel required>Email</FormLabel>
          <Input
            type="email"
            maxLength={255}
            autoComplete="username"
            value={email}
            disabled
          />
        </div>
      </div>
      <NextButton
        loading={loading}
        disabled={!canSubmit}
        isLastStep={isLastStep}
      />
    </div>
  );
}
