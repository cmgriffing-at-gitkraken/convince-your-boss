"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function Start() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  return (
    <>
      <Alert variant="default" className="max-w-sm">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          These chats are not 100% private. While unlikely, the chat id could be
          guessed by other users. Please do not use any sensitive information in
          your chat.
        </AlertDescription>
      </Alert>
      <Button
        onClick={async () => {
          setIsStarting(true);
          const response = await fetch("/api/chat/start", {
            method: "POST",
          });
          setIsStarting(false);

          if (!response.ok) {
            toast.error("Error starting chat");
            return;
          }

          const { chatId } = await response.json();

          router.push(`/chat/${chatId}`);
        }}
        className="btn btn-primary"
        disabled={isStarting}
      >
        {isStarting && <LoaderCircle />}
        {isStarting ? "Starting..." : "Get Started"}
      </Button>
    </>
  );
}
