// import { unstable_ViewTransition as ViewTransition } from "react";

import { Start } from "@/components/Start";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 max-w-2xl mx-auto">
      {/* <ViewTransition name="page-title"> */}
      <h1 className="text-6xl">Convince Your Boss To Get GitKraken</h1>
      {/* </ViewTransition> */}
      <p>
        NeckbeardAI is a fictional persona that is an exaggeration of the most
        stubborn and old-school developer on your team. If you can convince
        Neckbeard to pay for GitKraken, you can confidently convince anyone.
      </p>
      <noscript>
        <Alert variant="destructive">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      </noscript>
      <Start />
    </div>
  );
}
