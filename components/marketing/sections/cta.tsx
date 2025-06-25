'use client';

import * as React from 'react';
import GoogleLogo from 'public/google-logo.svg';
import MicrosoftLogo from 'public/microsoft-logo.svg';
import { toast } from 'sonner';

import { continueWithGoogle } from '@/actions/auth/continue-with-google';
import { continueWithMicrosoft } from '@/actions/auth/continue-with-microsoft';
import { BlurFade } from '@/components/marketing/fragments/blur-fade';
import { GridSection } from '@/components/marketing/fragments/grid-section';
import { TextGenerateEffect } from '@/components/marketing/fragments/text-generate-effect';
import { Button } from '@/components/ui/button';

export function CTA(): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSignInWithGoogle = async (): Promise<void> => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const result = await continueWithGoogle();
    if (result?.serverError || result?.validationErrors) {
      toast.error("Couldn't sign up with Google");
    }
    setIsLoading(false);
  };
  const handleSignInWithMicrosoft = async (): Promise<void> => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const result = await continueWithMicrosoft();
    if (result?.serverError || result?.validationErrors) {
      toast.error("Couldn't sign up with Google");
    }
    setIsLoading(false);
  };
  return (
    <GridSection className="bg-diagonal-lines">
      <div className="container flex flex-col items-center justify-between gap-6 bg-background py-16 text-center">
        <h3 className="m-0 max-w-fit text-3xl font-semibold md:text-4xl">
          <TextGenerateEffect words="Ready to start?" />
        </h3>
        <BlurFade inView>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 whitespace-nowrap rounded-full"
              onClick={handleSignInWithGoogle}
            >
              <GoogleLogo
                width="20"
                height="20"
              />
              Sign up with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 whitespace-nowrap rounded-full"
              onClick={handleSignInWithMicrosoft}
            >
              <MicrosoftLogo
                width="20"
                height="20"
              />
              Sign up with Microsoft
            </Button>
          </div>
        </BlurFade>
      </div>
    </GridSection>
  );
}
