"use client";

// import { unstable_ViewTransition as ViewTransition } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [showHeader, setShowHeader] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    console.log({ pathname });
    if (pathname !== "/") {
      setShowHeader(true);
    }
  }, [pathname]);

  useEffect(() => {
    document.title = "Convince Your Boss to Pay for GitKraken";
  }, [pathname]);

  return (
    <header className="p-2 flex flex-row justify-between fixed top-0 left-0 right-0 bg-gray-900 z-1">
      {showHeader && (
        <Link
          href="/"
          className="text-gray-300 text-2xl font-bold flex items-center gap-2"
        >
          <h1 id="page-title" className="text-3xl font-bold">
            Convince Your Boss to Pay for GitKraken
          </h1>
        </Link>
      )}

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
        {isStarting ? "Starting..." : "New Chat"}
      </Button>
    </header>
  );
}
