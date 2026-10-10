'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Compass, Orbit, Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AgentConfigType } from '@/root/Agent';


export default function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const displayName = user?.name || user?.email?.split('@')[0] || 'Your account';
  
  const [agents, setAgents] = useState<AgentConfigType[]>([]);
  
  useEffect(() => {
    let isCurrent = true;

    async function getUserAgents() {
      try {
        const result = await axios.get('/api/agent');
        if (isCurrent) setAgents(result.data.agentConfigs ?? []);
      } catch (error) {
        console.error('Could not load agents', error);
      }
    }

    getUserAgents();
    return () => {
      isCurrent = false;
    };
  }, [pathname]);
 

  return (
    <aside className="flex h-dvh w-68 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-5 text-slate-900">
      <Link href="/workspace" className="mb-8 flex items-center gap-3 rounded-lg px-2 py-1.5" aria-label="Orbit home">
        <Image src="/logo.png" alt = "logo" width={30} height={30}></Image>
        <span className="text-lg font-semibold tracking-tight">Orbit</span>
      </Link>

      <Link href="/workspace/create-agent" className="mb-8 flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
        <Plus size={30} />
        <span>Create New Agent</span>
      </Link>

      <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Your Agents</div>
      <nav aria-label="Your agents" className="flex-1 space-y-1 overflow-y-auto">
        {agents.map((agent) => (
          <Link
            key={agent.agentId}
            href={`/workspace/${agent.agentId}`}
            className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${pathname === `/workspace/${agent.agentId}` ? 'bg-slate-100 font-medium text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            {agent.agentImage ? (
              <img
                src={agent.agentImage}
                alt=""
                className="size-7 shrink-0 rounded-full bg-slate-100 object-cover"
              />
            ) : (
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Orbit size={15} />
              </span>
            )}
            <span className="truncate">{agent.name}</span>
          </Link>
        ))}
        {agents.length === 0 && (
          <p className="px-2.5 py-2 text-sm text-slate-400">No agents yet</p>
        )}
      </nav>

      <div className="mt-4 border-t border-slate-200 pt-3">
        <Link href="/marketplace" className={`mb-2 flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm transition-colors ${pathname.startsWith('/marketplace') ? 'bg-slate-100 font-medium text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
          <Compass size={18} strokeWidth={1.8} />
          <span>Marketplace</span>
        </Link>
        <button type="button" className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors hover:bg-slate-50">
          <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
            {user?.image ? <img src={user.image} alt="" className="size-full object-cover" /> : displayName.slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">{displayName}</span>
          <span className="size-1.5 rounded-full bg-emerald-500" title="Online" />
        </button>
      </div>
    </aside>
  );
}
