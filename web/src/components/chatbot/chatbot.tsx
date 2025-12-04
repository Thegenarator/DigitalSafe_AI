"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Heart, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

const QUICK_ACTIONS = [
  "I'm feeling anxious",
  "Help with stress management",
  "I'm dealing with online harassment",
  "I feel depressed",
  "Sleep problems",
  "Coping strategies",
];

export function Chatbot({ className }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm here to support your mental health and wellness with accurate, evidence-based information. I can help with stress, anxiety, depression, trauma, digital safety concerns, and more. What would you like to talk about today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (action: string) => {
    setInput(action);
    setShowQuickActions(false);
    inputRef.current?.focus();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowQuickActions(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();
      
      // Check if response has an error status but still has a message (knowledge base fallback)
      if (!response.ok) {
        // If we have a message from knowledge base fallback, use it
        if (data.message) {
          const assistantMessage: Message = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.message,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          return;
        }
        // Otherwise throw error
        throw new Error(data.message || data.error || "Failed to get response");
      }
      
      // Successful response - use the message
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message || "I'm here to help. Could you tell me more about what you're experiencing?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          error instanceof Error && error.message
            ? `I'm sorry, I encountered an issue: ${error.message}. Please try again, or if you need immediate support, please contact a mental health professional or crisis hotline.`
            : "I'm sorry, I'm having trouble responding right now. Please try again in a moment, or consider reaching out to a mental health professional or crisis hotline if you need immediate support.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = "48px";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink-100 bg-white shadow-2xl ring-1 ring-black/5 backdrop-blur-sm ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b-2 border-ink-100/80 bg-gradient-to-r from-brand-50 via-brand-50/80 to-white px-6 py-5 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 shadow-lg shadow-brand-500/30">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="font-display text-xl font-bold text-ink-900">
            Wellness Chat
          </h2>
          <p className="mt-0.5 text-xs font-medium text-ink-500">Your supportive AI companion</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-100 to-brand-50 px-3 py-1.5 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-brand-600" />
          <span className="text-xs font-bold text-brand-700">AI Powered</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white via-ink-50/20 to-white px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {/* Quick Actions */}
          {showQuickActions && messages.length === 1 && (
            <div className="mb-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-500">
                Quick Start Topics:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="rounded-full border-2 border-brand-200 bg-white px-4 py-2.5 text-xs font-semibold text-brand-700 shadow-sm transition-all duration-200 hover:border-brand-300 hover:bg-gradient-to-r hover:from-brand-50 hover:to-brand-100/50 hover:shadow-md hover:scale-105 active:scale-95"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 via-brand-50 to-brand-100 shadow-md ring-1 ring-brand-200/50">
                  <Heart className="h-4.5 w-4.5 text-brand-600" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-lg ring-1 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white ring-brand-400/30"
                    : "bg-white text-ink-900 ring-ink-100/50"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
                  {message.content}
                </p>
                <p
                  className={`mt-2 text-[10px] font-medium uppercase tracking-wide ${
                    message.role === "user"
                      ? "text-brand-100"
                      : "text-ink-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ink-100 via-ink-50 to-ink-100 shadow-md ring-1 ring-ink-200/50">
                  <span className="text-xs font-bold text-ink-700">You</span>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 via-brand-50 to-brand-100 shadow-md ring-1 ring-brand-200/50">
                <Heart className="h-4.5 w-4.5 text-brand-600" />
              </div>
              <div className="rounded-2xl bg-white px-5 py-3.5 shadow-lg ring-1 ring-ink-100/50">
                <div className="flex items-center gap-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-brand-600" />
                  <span className="text-sm font-medium text-ink-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t-2 border-ink-100/80 bg-gradient-to-br from-white via-brand-50/40 to-white p-5 shadow-inner">
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Share what's on your mind..."
              rows={1}
              className="flex-1 resize-none rounded-2xl border-2 border-ink-200 bg-white px-5 py-3.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 shadow-sm ring-1 ring-ink-100/50 transition-all duration-200 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:shadow-md"
              style={{
                minHeight: "52px",
                maxHeight: "120px",
              }}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 text-white shadow-lg shadow-brand-500/30 transition-all duration-300 hover:from-brand-600 hover:via-brand-700 hover:to-brand-800 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="mt-3 text-xs font-medium text-ink-500 leading-relaxed">
            This chat is private and not stored. For immediate crisis support, please contact your local emergency services or mental health hotline.
          </p>
        </div>
      </div>
    </div>
  );
}

