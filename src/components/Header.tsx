"use client";

// import { unstable_ViewTransition as ViewTransition } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [showHeader, setShowHeader] = useState(false);

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
        <h1 id="page-title" className="text-3xl font-bold">
          Convince Your Boss to Pay for GitKraken
        </h1>
      )}
    </header>
  );
}
