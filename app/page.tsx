"use client";

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { ArrowRight, Bot, Command, Layers3, Orbit, Plus, Sparkles, Workflow } from 'lucide-react';

const highlights = [
  {
    icon: Bot,
    title: 'Build your agents',
    description: 'Give each agent a clear role, personality, and set of instructions.',
  },
  {
    icon: Workflow,
    title: 'Connect your tools',
    description: 'Bring the services and actions your workflows need into one place.',
  },
  {
    icon: Layers3,
    title: 'Keep work organized',
    description: 'Move between your agents and their conversations from one workspace.',
  },
];

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fa] text-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(186,230,253,0.55),transparent_65%)]" />

      <header className="relative z-10 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 rounded-lg" aria-label="Orbit home">
            <span className="flex size-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
              <Orbit size={19} strokeWidth={2.2} />
            </span>
            <span className="text-lg font-semibold tracking-tight">Orbit</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/workspace" className="hidden rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:inline-flex">
              Workspace
            </Link>
            {status !== 'loading' && (session ? (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Sign out
              </button>
            ) : (
              <Link href="/sign-in?callbackUrl=%2Fworkspace" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
                Sign in
              </Link>
            ))}
            <Link href="/workspace" className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
              Open workspace <ArrowRight size={15} />
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pb-28 lg:pt-28">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <Sparkles size={14} className="text-sky-600" />
            Your AI team, in one place
          </div>
          <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[4.5rem]">
            Make room for
            <span className="mt-1 block bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-600 bg-clip-text pb-2 text-transparent">better work.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Create helpful AI agents, connect the tools they need, and bring your everyday workflows together in Orbit.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/workspace" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
              Go to your workspace <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/workspace/create-agent" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
              <Plus size={16} /> Create an agent
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
            <Command size={14} />
            <span>Your agents and conversations are waiting in one workspace.</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
          <div aria-hidden="true" className="absolute -inset-7 rounded-[2.5rem] bg-gradient-to-br from-sky-200/60 via-white/20 to-indigo-200/60 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_28px_90px_-36px_rgba(15,23,42,0.3)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-slate-950 text-white"><Orbit size={18} /></span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Your workspace</p>
                  <p className="text-xs text-slate-500">A clear view of what you’re building</p>
                </div>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">Ready when you are</span>
            </div>
            <div className="grid grid-cols-[148px_1fr] sm:grid-cols-[172px_1fr]">
              <aside className="min-h-[310px] border-r border-slate-100 bg-slate-50/70 p-3 sm:p-4">
                <div className="mb-5 flex h-9 items-center justify-center gap-2 rounded-lg bg-slate-900 text-xs font-medium text-white">
                  <Plus size={14} /> Create new agent
                </div>
                <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">Your agents</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 rounded-lg bg-white px-2 py-2 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/70">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-violet-100 text-violet-700"><Sparkles size={14} /></span>
                    Researcher
                  </div>
                  <div className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-500">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><Bot size={14} /></span>
                    Writing helper
                  </div>
                </div>
              </aside>
              <div className="flex flex-col p-4 sm:p-6">
                <div className="mb-auto">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700"><Sparkles size={19} /></span>
                  <p className="mt-4 text-xs font-medium text-slate-400">AGENT WORKSPACE</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">Researcher</h2>
                  <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">Explore a topic, gather useful sources, and turn what you find into a clear summary.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-600 sm:text-xs">Research</span>
                    <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-600 sm:text-xs">Summaries</span>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4">
                  <span className="text-xs text-slate-400 sm:text-sm">Message your agent...</span>
                  <span className="flex size-7 items-center justify-center rounded-lg bg-slate-900 text-white"><ArrowRight size={14} /></span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 shadow-lg shadow-slate-900/5 sm:flex">
            <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><Workflow size={16} /></span>
            <div><p className="text-xs font-semibold text-slate-800">One focused space</p><p className="text-[10px] text-slate-500">Agents, tools, and chat</p></div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-slate-200/80 bg-white/65">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">A simpler way to work</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Everything starts in your workspace.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">Jump back in, shape an agent around a task, and keep the useful pieces of your workflow close at hand.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.02] sm:p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><Icon size={19} /></span>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-slate-950 px-6 py-6 text-white sm:flex-row sm:items-center sm:px-8">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Ready to pick up where you left off?</h2>
              <p className="mt-1 text-sm text-slate-300">Your Orbit workspace is one click away.</p>
            </div>
            <Link href="/workspace" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              Open workspace <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-slate-200/70 bg-white/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-slate-700"><Orbit size={15} /> Orbit</Link>
          <span>A calmer home for your AI workflows.</span>
          <Link href="/workspace" className="font-medium text-slate-600 transition hover:text-slate-950">Go to workspace <span aria-hidden="true">→</span></Link>
        </div>
      </footer>
    </main>
  );
}
