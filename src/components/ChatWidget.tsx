"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, useState, useRef, useEffect } from "react";

/** Strip common markdown emphasis */
function stripChatMarkdown(text: string): string {
  let s = text;
  s = s.replace(/\*\*\*([^*]*)\*\*\*/g, "$1");
  s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
  s = s.replace(/\*([^*]+)\*/g, "$1");
  s = s.replace(/_{1,2}([^_]+)_{1,2}/g, "$1");
  s = s.replace(/\*{1,3}/g, "");
  return s;
}

/** Original Robot Icon */
function RobotIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="5" y="8" width="14" height="11" rx="2" />
      <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M9 16h6" />
      <path d="M12 8V5" />
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RobotAvatar({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  const box = size === "lg" ? "h-12 w-12" : "h-8 w-8";
  const icon = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#e4e6eb] text-[#050505] shadow-sm ${box} ${className ?? ""}`}
    >
      <RobotIcon className={icon} />
    </span>
  );
}

function ChatFabContent({ open }: { open: boolean }) {
  if (open) {
    return (
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0084ff] text-white shadow-lg transition hover:bg-[#0073e6]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-6 w-6"
          aria-hidden
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
    );
  }
  return <RobotAvatar size="lg" className="shadow-lg" />;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, stop, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <div
      data-chat-widget-root
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[1001] box-border flex max-w-[100vw] flex-col items-stretch gap-3 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] font-sans sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:w-auto sm:flex-row sm:items-end sm:gap-0 sm:p-0 sm:pb-0 sm:pl-0 sm:pr-0 [&_*]:box-border"
    >
      {/* Panel: full-width above FAB on small screens; to the left of FAB on sm+ */}
      <div
        className={`pointer-events-auto box-border flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 transition-all duration-300 ease-in-out origin-bottom sm:absolute sm:bottom-0 sm:right-[4.5rem] sm:w-[360px] sm:max-w-[min(360px,calc(100vw-1.5rem-4.5rem-0.75rem))] sm:origin-bottom-right ${
          open
            ? "max-h-[min(32rem,calc(100dvh-7.5rem-env(safe-area-inset-bottom,0px)))] h-[min(32rem,calc(100dvh-7.5rem-env(safe-area-inset-bottom,0px)))] scale-100 opacity-100 sm:h-[min(540px,calc(100dvh-2rem-env(safe-area-inset-bottom,0px)-env(safe-area-inset-top,0px)))] sm:max-h-[min(540px,calc(100dvh-2rem-env(safe-area-inset-bottom,0px)-env(safe-area-inset-top,0px)))]"
            : "h-0 max-h-0 scale-50 opacity-0 sm:max-h-0"
        }`}
      >
        <header className="flex min-w-0 shrink-0 items-center justify-between !gap-3 border-b border-black/[0.05] bg-white !px-4 !py-3 shadow-sm z-10">
          <div className="flex min-w-0 flex-1 items-center !gap-3">
            <div className="relative shrink-0">
              <RobotAvatar />
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#31A24C]"></div>
            </div>
            <div className="min-w-0">
              <h2 className="text-[15px] font-semibold leading-tight text-[#050505] m-0 p-0">
                Damian&apos;s Assistant
              </h2>
              <p className="text-[12px] text-[#65676B] m-0 p-0">Active now</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#65676B] border-none bg-transparent transition hover:bg-black/5 outline-none focus:ring-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-white !p-4 hide-scrollbar">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 !px-4 text-center opacity-60">
              <RobotAvatar size="lg" />
              <p className="text-[14px] text-[#050505] m-0">
                Hi! Ask me anything about Damian&apos;s portfolio, experience, or skills.
              </p>
            </div>
          )}

          <div className="flex min-w-0 flex-col !gap-1">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              const isPrevSame = index > 0 && messages[index - 1].role === message.role;
              const isNextSame = index < messages.length - 1 && messages[index + 1].role === message.role;

              return (
                <div
                  key={message.id}
                  className={`flex w-full min-w-0 box-border !gap-2 ${isUser ? "justify-end !pl-10" : "justify-start !pr-10"} ${!isNextSame ? "!mb-2" : "mb-0"}`}
                >
                  {!isUser && (
                     <div className="flex w-8 shrink-0 items-end justify-center">
                       {!isNextSame && <RobotAvatar />}
                     </div>
                  )}
                  
                  <div
                    className={`relative box-border w-fit min-w-0 max-w-full !px-3.5 !py-2 text-[15px] leading-relaxed break-words [overflow-wrap:anywhere] ${
                      isUser
                        ? "bg-[#0084FF] text-white"
                        : "bg-[#F0F2F5] text-[#050505]"
                    } ${
                      isUser
                        ? `rounded-l-[18px] ${isPrevSame ? "rounded-tr-[4px]" : "rounded-tr-[18px]"} ${isNextSame ? "rounded-br-[4px]" : "rounded-br-[18px]"}`
                        : `rounded-r-[18px] ${isPrevSame ? "rounded-tl-[4px]" : "rounded-tl-[18px]"} ${isNextSame ? "rounded-bl-[4px]" : "rounded-bl-[18px]"}`
                    }`}
                  >
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        <span key={i} className="whitespace-pre-wrap">
                          {message.role === "assistant" ? stripChatMarkdown(part.text) : part.text}
                        </span>
                      ) : null
                    )}
                  </div>
                </div>
              );
            })}

            {status === "submitted" && (
              <div className="!mb-2 flex w-full min-w-0 justify-start !gap-2">
                 <div className="flex w-8 shrink-0 items-end justify-center"><RobotAvatar /></div>
                 <div className="flex w-fit min-w-0 max-w-full items-center !gap-1 rounded-2xl rounded-bl-[4px] bg-[#F0F2F5] !px-4 !py-2.5 box-border">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8A8D91] [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8A8D91] [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8A8D91]" />
                 </div>
              </div>
            )}
            
            {error && (
              <div className="!mt-2 box-border rounded-lg border border-red-100 bg-red-50 !px-4 !py-3 text-center text-sm text-red-500 break-words [overflow-wrap:anywhere]">
                Something went wrong. Please try again.
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>
        </div>

        <form onSubmit={onSubmit} className="m-0 box-border border-t border-black/[0.05] bg-white !p-3">
          <div className="flex min-w-0 items-end !gap-2">
            <div className="flex min-h-[40px] min-w-0 flex-1 items-center rounded-[20px] bg-[#F0F2F5] !px-4 !py-2 transition-colors focus-within:bg-[#E4E6EB]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={status !== "ready"}
                placeholder="Aa"
                style={{ boxShadow: 'none' }}
                className="m-0 min-w-0 w-full bg-transparent text-[15px] text-[#050505] placeholder-[#8A8D91] appearance-none border-none p-0 shadow-none outline-none ring-0 focus:ring-0"
              />
            </div>
            
            {busy ? (
              <button
                type="button"
                onClick={() => stop()}
                className="flex h-10 items-center justify-center !px-3 text-[14px] font-semibold text-[#0084FF] transition hover:bg-[#F0F2F5] rounded-full border-none bg-transparent"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={status !== "ready" || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#0084FF] transition hover:bg-[#F0F2F5] disabled:opacity-50 disabled:hover:bg-transparent border-none bg-transparent cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]">
                  <path d="M3.4 20.4l17.45-7.56a1 1 0 0 0 0-1.68L3.4 3.6a1 1 0 0 0-1.39 1.18L4.6 11H12v2H4.6l-2.59 6.22a1 1 0 0 0 1.39 1.18z"/>
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="pointer-events-auto relative z-20 ml-auto flex shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 outline-none transition-transform hover:scale-105 focus:outline-none active:scale-95 sm:ml-0"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <ChatFabContent open={open} />
      </button>
    </div>
  );
}