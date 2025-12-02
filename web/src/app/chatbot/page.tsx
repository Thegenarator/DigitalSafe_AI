import { Chatbot } from "@/components/chatbot/chatbot";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function ChatbotPage() {
  return (
    <main className="min-h-screen px-4 pb-24 pt-24 sm:px-6 sm:pb-16 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-ink-600 transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-semibold">Back to Home</span>
          </Link>
        </div>

        {/* Info Card */}
        <div className="mb-6 rounded-3xl border border-brand-100/80 bg-gradient-to-br from-brand-50/90 via-white to-safety-low/10 p-6 shadow-lg ring-1 ring-black/5 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-md">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                Mental Health Wellness Chat
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 sm:text-base">
                Your private, supportive space to talk about your feelings, stress,
                anxiety, or any concerns related to digital safety and online
                harassment. This AI companion is here to listen, support, and guide
                you with empathy and care.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                  Private & Anonymous
                </span>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                  24/7 Available
                </span>
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                  Culturally Sensitive
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot */}
        <div className="h-[calc(100vh-280px)] min-h-[600px] sm:h-[calc(100vh-320px)]">
          <Chatbot />
        </div>

        {/* Resources Footer */}
        <div className="mt-6 rounded-2xl border border-ink-100 bg-white/80 p-6 text-center shadow-sm ring-1 ring-black/5">
          <p className="text-sm text-ink-600">
            <strong className="text-ink-900">Important:</strong> This chatbot is
            not a replacement for professional mental health care. If you're
            experiencing a mental health crisis or thoughts of self-harm, please
            contact your local emergency services or a mental health hotline
            immediately.
          </p>
        </div>
      </div>
    </main>
  );
}

