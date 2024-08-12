"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="border border-input bg-background px-4 py-2 text-foreground shadow-sm hover:bg-muted hover:text-muted-foreground focus-visible:ring-1"
    >
      <ArrowLeft width={24} height={24} />
      Back
    </Button>
  );
}
