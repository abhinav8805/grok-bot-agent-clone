'use client';

import { Send, Sparkles } from 'lucide-react';

const avatar = 'https://api.dicebear.com/10.x/bottts/svg?seed=orbit-assistant';

export default function AgentChat() {
  return (
    <section className="flex min-h-120 min-w-0 flex-1 flex-col border-b border-slate-200 xl:min-h-0 xl:border-b-0 xl:border-r">
      <header className="flex h-19 shrink-0 items-center justify-between border-b border-slate-200 px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <img src={avatar} alt="Orbit assistant" className="size-10 rounded-full border border-slate-200 bg-slate-50" />
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-slate-900">Orbit Assistant</h1>
            <p className="mt-0.5 text-xs text-slate-500">Your personal research agent</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2.5 text-xs font-medium text-slate-600">
          <span>Active</span>
          <button type="button" role="switch" aria-checked="true" aria-label="Agent active status" className="relative h-6 w-11 rounded-full bg-emerald-500 p-0.5">
            <span className="absolute right-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm" />
          </button>
        </div>
      </header>

      <div className="flex-1 space-y-7 overflow-y-auto px-5 py-7 sm:px-8 sm:py-9">
        <div className="mx-auto flex max-w-3xl justify-end gap-3">
          <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-slate-900 px-4 py-3 text-sm leading-6 text-white shadow-sm">
            Can you help me prepare a quick overview of this week&apos;s priorities?
            <div className="mt-1.5 text-[11px] text-slate-300">You · 9:41 AM</div>
          </div>
          <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">JD</div>
        </div>

        <div className="mx-auto flex max-w-3xl items-start gap-3">
          <img src={avatar} alt="" className="mt-1 size-8 shrink-0 rounded-full border border-slate-200 bg-slate-50" />
          <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm">
            <p>Absolutely. Here&apos;s a quick snapshot to get you started:</p>
            <ul className="mt-2 space-y-1.5 pl-4 text-slate-600">
              <li className="list-disc">Review the product launch timeline</li>
              <li className="list-disc">Share feedback on the latest designs</li>
              <li className="list-disc">Prepare notes for Thursday&apos;s team sync</li>
            </ul>
            <p className="mt-2">Would you like me to turn these into a prioritized checklist?</p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400"><Sparkles size={12} /> Orbit Assistant · 9:41 AM</div>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-5 pb-5 pt-2 sm:px-8 sm:pb-7">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-slate-100">
          <textarea aria-label="Message your agent" placeholder="Ask your agent anything..." rows={2} className="block w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400" />
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="text-xs text-slate-400">Your agent is ready to help</span>
            <button type="button" aria-label="Send message" className="inline-flex size-9 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-700"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
