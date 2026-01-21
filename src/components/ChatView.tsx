"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "@/db/types";
import { Header } from "./Header";
import { characterLimit } from "@/lib/constants";

const initialPrompts = [
  "I've been using GitKraken personally for a long time. Would the company be willing to cover the license for work?",
  "I'm not experienced with git. When I searched for a tool to help, GitKraken was the first one I found. Would the company pay for it?",
  "We have multiple repos that are tightly coupled. GitKraken has a tool for making that easier. Can we buy it?",
  "Reviewing PRs in GitHub can be a bit of a pain. I have heard GitKraken has a nice UI for that. Would the team be interested in that?",
] as const;

export function ChatView() {
  const { chatId } = useParams<{ chatId: string }>();

  const [currentUserInput, setCurrentUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatNotFound, setChatNotFound] = useState(false);
  const [currentScore, setCurrentScore] = useState(2);

  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(`/api/chat/${chatId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Chat not found");
        }

        return response.json();
      })
      .then(({ messages }) => {
        setChatHistory(messages);
        setTimeout(() => {
          chatHistoryRef.current?.scrollTo({
            top: chatHistoryRef.current?.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      })
      .catch(() => {
        setChatNotFound(true);
      });
  }, [chatId]);

  const shouldShowInitialPrompts = chatHistory.length === 1;

  async function submitUserMessage(message: string) {
    console.log({ message });

    setIsLoading(true);

    const newMessage: ChatMessage = {
      id: "temporary-id" + Date.now(),
      chat_id: chatId || "",
      role: "user",
      score: 0,
      message,
      inserted_at: Date.now(),
    };

    const newChatHistory = [...chatHistory, newMessage];

    setChatHistory(newChatHistory);

    setTimeout(() => {
      chatHistoryRef.current?.scrollTo({
        top: chatHistoryRef.current?.scrollHeight,
        behavior: "smooth",
      });
    }, 100);

    setCurrentUserInput("");

    const target = chatInputRef.current;
    if (target) {
      target.style.height = "auto";
      // target.style.height = target.scrollHeight + "px";
    }

    console.log({ currentUserInput });

    const response = await fetch(`/api/chat/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    }).catch((err) => {
      return err;
    });

    if (!response?.ok) {
      toast.error("Error sending message");
      setIsLoading(false);
      setCurrentUserInput(message);
      setChatHistory(chatHistory);

      return;
    }

    const chatResponse = await response.json();

    setCurrentScore(chatResponse.score);

    newChatHistory.push(chatResponse.message);
    setChatHistory(newChatHistory);
    setIsLoading(false);

    setTimeout(() => {
      chatHistoryRef.current?.scrollTo({
        top: chatHistoryRef.current?.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        {!chatNotFound && (
          <div className="flex flex-row h-full">
            <div className="conversation w-[60%] flex flex-col flex-1 p-4 relative ">
              <div
                ref={chatHistoryRef}
                className="chat-history flex-1 flex flex-col justify-end overflow-auto py-4 w-full h-full px-4 pt-10"
              >
                {chatHistory.map((chatMessage) => {
                  return (
                    <div
                      key={chatMessage.id}
                      className="flex flex-col py-2 w-full"
                    >
                      <div
                        className={clsx(
                          "flex flex-row w-fit max-w-3/4 p-2 rounded-sm h-auto",
                          {
                            "bg-gray-700 self-end":
                              chatMessage.role === "assistant",
                            "bg-gray-200 text-gray-700":
                              chatMessage.role === "user",
                          },
                        )}
                      >
                        {chatMessage.message}
                      </div>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-center justify-center">
                    <ThreeDots color="#333" />
                  </div>
                )}

                {shouldShowInitialPrompts && (
                  <div className="rounded border border-secondary-background p-4">
                    <h2>Getting Started</h2>
                    <p>
                      You can use one of these example prompts to get started.
                      You can also type your own initial prompt.
                    </p>
                    <div className="flex flex-row flex-wrap">
                      {initialPrompts.map((prompt, index) => (
                        <div key={index} className="w-1/2 p-1">
                          <Button
                            className="w-full whitespace-normal flex text-left h-full"
                            variant={"neutral"}
                            onClick={() => {
                              submitUserMessage(prompt);
                            }}
                          >
                            <p className="word-wrap">{prompt}</p>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <form
                className="flex flex-row gap-4 w-full"
                onSubmit={async (e) => {
                  e.preventDefault();

                  submitUserMessage(currentUserInput);
                }}
              >
                <div className="relative w-full">
                  <Textarea
                    ref={chatInputRef}
                    value={currentUserInput}
                    placeholder="Type your message..."
                    onInput={(e) => {
                      setCurrentUserInput(e.currentTarget.value);
                      // Autosize logic
                      const target = e.currentTarget;
                      target.style.height = "auto";
                      target.style.height = target.scrollHeight + "px";
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        const form = e.currentTarget.form;
                        if (form) {
                          form.requestSubmit();
                        }
                      }
                    }}
                    className="resize-none min-h-[40px] max-h-48 overflow-auto"
                    rows={1}
                  />
                  <div
                    className={clsx(
                      "absolute right-2 bottom-[6px] text-sm text-gray-300 pointer-events-none rounded px-2 py-1",
                      {
                        "bg-gray-800":
                          currentUserInput.length <= characterLimit,
                        "bg-red-700": currentUserInput.length > characterLimit,
                      },
                    )}
                  >
                    {currentUserInput.length} / {characterLimit}
                  </div>
                </div>
                <Button disabled={isLoading || currentUserInput.length === 0}>
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>

            <div className="w-[40%] flex flex-col items-center justify-center h-full p-4">
              <Avatar approvalRating={currentScore} />
            </div>
          </div>
        )}
        {chatNotFound && (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <h1>Chat not found</h1>
          </div>
        )}
      </div>
    </>
  );
}
