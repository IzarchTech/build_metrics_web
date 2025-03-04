"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * BackButton component that navigates back or to a specified URL.
 *
 * @param href - The URL to navigate to when the button is clicked. If not provided, it navigates back.
 */
function BackButton({ href }: Readonly<{ href?: string }>) {
  const router = useRouter();

  /**
   * Handles the button click event.
   *
   * If `href` is provided, it navigates to the specified URL.
   * If `href` is not provided, it navigates back.
   */
  const handleClick = () => {
    if (href) {
      // Navigate to the specified URL
      router.push(href);
    } else {
      // Navigate back
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      aria-label="Go back"
      className="hover:outline outline-primary/90 hover:bg-primary/90 hover:text-primary-foreground ease-in-out duration-300 transition-all group"
      onClick={handleClick}
    >
      <ArrowLeft className="size-6 group-hover:rotate-90 ease-linear duration-300 delay-75 transition-transform" />
      <span className="sr-only">Go back</span>
    </Button>
  );
}

export default BackButton;
