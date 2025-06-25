import { z } from 'zod';

import { completeOrganizationOnboardingSchema } from '@/schemas/onboarding/complete-organization-onboarding-schema';
import { completeUserOnboardingSchema } from '@/schemas/onboarding/complete-user-onboarding-schema';

export const completeOnboardingSchema =
  completeOrganizationOnboardingSchema.merge(completeUserOnboardingSchema);

export type CompleteOnboardingSchema = z.infer<typeof completeOnboardingSchema>;
