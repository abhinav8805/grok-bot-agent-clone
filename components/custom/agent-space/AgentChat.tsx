'use client';

import { AgentConfigContext } from '@/context/AgentConfigContext';
import { MessageType } from '@/type/Message';
import { Send, Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { FormEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';


function formatTime(value: string) {
  return new Date(value).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function AgentChat() {
  const { agentConfig } = useContext(AgentConfigContext) ?? {};
  const { data: session, status: sessionStatus } = useSession();
  const userName = session?.user?.name?.trim().split(/\s+/)[0]
    || session?.user?.email?.split('@')[0]
    || 'there';
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };
  const [messages, setMessages] = useState<MessageType[]>(() => [{
    id: 'greeting',
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    time: new Date().toISOString(),
  }]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  useEffect(() => {
    if (sessionStatus === 'loading') return;
    setMessages((current) => current.map((message) => message.id === 'greeting'
      ? { ...message, content: `${getGreeting()}, ${userName}! How can I help you today?` }
      : message));
  }, [sessionStatus, userName]);

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const content = draft.trim();
    if (!content || !agentConfig?.agentId || isSending) return;

    const userMessage: MessageType = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      time: new Date().toISOString(),
    };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setDraft('');
    setError('');
    setIsSending(true);

    try {
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: agentConfig.agentId,
          messages: conversation.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Unable to get a response from the agent.');

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: typeof data.response === 'string' ? data.response : String(data.response ?? ''),
          time: new Date().toISOString(),
        },
      ]);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Unable to send your message.');
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <section className="flex min-h-120 min-w-0 flex-1 flex-col border-b border-slate-200 xl:min-h-0 xl:border-b-0 xl:border-r">
      <header className="flex h-19 shrink-0 items-center justify-between border-b border-slate-200 px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <img src={agentConfig?.agentImage } alt="" className="size-10 rounded-full border border-slate-200 bg-slate-50" />
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-slate-900">{agentConfig?.name || 'Agent'}</h1>
            <p className="mt-0.5 truncate text-xs text-slate-500">{agentConfig?.description || 'Your personal research agent'}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2.5 text-xs font-medium text-slate-600">
          <span>{isSending ? 'Thinking' : 'Active'}</span>
          <span aria-label={isSending ? 'Agent is responding' : 'Agent is active'} className={`size-2 rounded-full ${isSending ? 'bg-amber-400' : 'bg-emerald-500'}`} />
        </div>
      </header>

      <div className="flex-1 space-y-7 overflow-y-auto px-5 py-7 sm:px-8 sm:py-9" aria-live="polite">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div key={message.id} className={`mx-auto flex max-w-3xl gap-3 ${isUser ? 'justify-end' : 'items-start'}`}>
              {!isUser && <img src={agentConfig?.agentImage} alt="" className="mt-1 size-8 shrink-0 rounded-full border border-slate-200 bg-slate-50" />}
              <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${isUser ? 'rounded-tr-sm bg-slate-900 text-white' : 'rounded-tl-sm border border-slate-200 bg-white text-slate-700'}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className={`mt-1.5 flex items-center gap-1.5 text-[11px] ${isUser ? 'text-slate-300' : 'text-slate-400'}`}>
                  {!isUser && <Sparkles size={12} />}
                  {isUser ? 'You' : agentConfig?.name || 'Agent'} · {formatTime(message.time)}
                </div>
              </div>
              {isUser && <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">You</div>}
            </div>
          );
        })}
        {isSending && <p className="mx-auto max-w-3xl pl-11 text-xs text-slate-400">{agentConfig?.name || 'Agent'} is thinking…</p>}
        {error && <p role="alert" className="mx-auto max-w-3xl text-sm text-red-600">{error}</p>}
        {!agentConfig?.agentId && <p className="mx-auto max-w-3xl text-sm text-slate-500">Loading agent…</p>}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0 px-5 pb-5 pt-2 sm:px-8 sm:pb-7">
        <form onSubmit={sendMessage} className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-slate-100">
          <textarea
            aria-label="Message your agent"
            placeholder="Ask your agent anything..."
            rows={2}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!agentConfig?.agentId || isSending}
            className="block w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="text-xs text-slate-400">Press Enter to send · Shift+Enter for a new line</span>
            <button type="submit" aria-label="Send message" disabled={!draft.trim() || !agentConfig?.agentId || isSending} className="inline-flex size-9 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"><Send size={16} /></button>
          </div>
        </form>
      </div>
    </section>
  );
}
