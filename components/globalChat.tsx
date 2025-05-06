"use client";

import { getGlobalChat, sendGlobalChat } from "@/lib/db";
import prisma from "@/lib/prisma";
import pusherClient from "@/lib/pusherClient";
import { redirect } from "next/navigation";
import { send } from "process";
import { useEffect, useState } from "react";

type messageType = {
  sender: string;
  message: string;
};

export default function GlobalChat(
  { user }: { user: any } // user is not used in this component, but it's passed as a prop
) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<messageType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await getGlobalChat();
      const reversedData = data.reverse();
      const sortedData = reversedData.map((item: any) => ({
        sender: item.sender,
        message: item.message,
      }));
      setMessages(sortedData);
    })();
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe("chat");
    channel.unbind_all();

    channel.bind("chat-event", function (data: any) {
      setMessages((prevState: any) => [
        ...prevState,
        { sender: data.sender, message: data.message },
      ]);
    });

    return () => {
      pusherClient.unsubscribe("chat");
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ message, sender: user.user.email.split("@")[0] }),
    });
    console.log(user);

    sendGlobalChat("fathan", message);

    setLoading(false);
  };

  return (
    <div className="flex flex-col border-2 w-full h-2/3 bg-background rounded-lg px-3 py-2">
      <div className="flex items-center w-full justify-start pb-1 border-b-2">
        <h2 className="text-xl font-bold text-white">global chat</h2>
      </div>
      <div className="flex flex-col gap-2 mt-2 overflow-y-auto flex-grow">
        {messages &&
          messages.map((chat: any, index) => {
            return (
              <div key={index} className="flex items-center text-sm gap-2">
                <div className="text-white">
                  <span className="font-bold">@{chat.sender}:</span>{" "}
                  {chat.message}
                </div>
              </div>
            );
          })}
      </div>

      {/* Input Message */}
      <div className="flex items-center w-full justify-start pt-2">
        <textarea
          rows={3}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(e);
              setMessage("");
            }
          }}
          disabled={loading}
          // if loading true, placeholder is "sending..."
          placeholder={
            loading ? "sending..." : "type your message... (enter to send)"
          }
          className="w-full px-2 text-sm text-white bg-background border-2 border-gray-600 rounded-md"
        />
      </div>
    </div>
  );
}
