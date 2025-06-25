import { z } from 'zod';

export const completeOrganizationOnboardingSchema = z.object({
  organizationName: z
    .string({
      required_error: 'Organization name is required.',
      invalid_type_error: 'Organization name must be a string.'
    })
    .trim()
    .min(1, 'Organization name is required.')
    .max(255, 'Maximum 255 characters allowed.')
});

export type CompleteOrganizationOnboardingSchema = z.infer<
  typeof completeOrganizationOnboardingSchema
>;
