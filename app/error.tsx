"use client";

import MaxWidthWrapper from "../src/components/ui/MaxWidthWrapper";
import { Button } from "../src/components/ui/shadcn/button";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <MaxWidthWrapper>
      <main className="h-[calc(100vh-5rem)] flex justify-center items-center flex-col gap-6">
        <h1 className="text-3xl font-semibold text-red-600">
          Something went wrong!
        </h1>
        <p className="text-lg">{error.message}</p>

        <Button onClick={reset} variant="secondary">
          Try again
        </Button>
      </main>
    </MaxWidthWrapper>
  );
}
