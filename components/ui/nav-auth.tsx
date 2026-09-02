"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function NavAuth() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton>
          <Button variant="text" className="h-9 px-3">
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button variant="primary" className="h-9 px-4">
            Sign up
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "size-9",
            },
          }}
        />
      </Show>
    </>
  );
}
