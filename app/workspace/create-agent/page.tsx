'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Check, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { randomUUID } from 'crypto';
import axios from 'axios';
import { Agent } from 'http';
import { useRouter } from "next/navigation";

export default function CreateAgent() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [created, setCreated] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState('sawarmn');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function shuffleAvatar() {
    const seed = crypto.randomUUID();
    setAvatarSeed(seed);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    setCreated(true);
  }

  const onClickCreateAgent = async(e : any) => {
    e.preventDefault();
    setIsLoading(true);
    try{
    const avatarImage = `https://api.dicebear.com/10.x/bottts/svg?seed=${avatarSeed}`;
    const newAgentId = crypto.randomUUID();
    const result = await axios.post('/api/agent', {
      name: name,
      description: description,
      agentImage: avatarImage,
      agentId: newAgentId
    });
    console.log(result.data);
    router.push('/workspace/' + newAgentId);
    setIsLoading(false);
  }
  catch(e){
    setIsLoading(false);
    console.log("error creating agent", e)
  }
  }

  return (
    <main className="h-full min-h-0 overflow-hidden bg-slate-50/70 px-4 py-3 sm:px-8 sm:py-4">
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col justify-center">
        <header className="mb-3 shrink-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
            <Sparkles size={14} />
            <span>YOUR WORKSPACE</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Create New Agent
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-slate-500">
            Set up your AI agent by choosing an avatar, name, and description. You can configure its tools and behavior later.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <section className="flex flex-col items-center m-4">
            <img
              src={`https://api.dicebear.com/10.x/bottts/svg?seed=${avatarSeed}`}
              alt="Avatar"
              className="h-25 w-25"
            />
            <button
              type="button"
              onClick={shuffleAvatar}
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <RefreshCw size={15} />
              Shuffle avatar
            </button>
          </section>

          <section className="space-y-3 px-6 py-4 sm:px-8">
            <div className="space-y-2">
              <label
                htmlFor="agent-name"
                className="block text-sm font-medium text-slate-800"
              >
                Agent Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="agent-name"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setCreated(false);
                }}
                placeholder="e.g. Research Assistant"
                required
                maxLength={80}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="agent-description"
                className="block text-sm font-medium text-slate-800"
              >
                Agent Description{' '}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                id="agent-description"
                name="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setCreated(false);
                }}
                placeholder="Describe what this agent will help you with..."
                rows={2}
                maxLength={500}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm leading-5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
              <p className="text-right text-xs text-slate-400">
                {description.length}/500
              </p>
            </div>
          </section>

          <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p role="status" className="text-sm text-emerald-700">
              {created && (
                <span className="inline-flex items-center gap-1.5">
                  <Check size={15} /> Agent details are ready.
                </span>
              )}
            </p>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <Link
                href="/workspace"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Cancel
              </Link>
              <button 
                
                type="submit"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                onClick={onClickCreateAgent}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className='animate-spin' />: null}
                Create Agent
              </button>
            </div>
          </footer>
        </form>
      </div>
    </main>
  );
}
