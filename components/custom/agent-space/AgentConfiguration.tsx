'use client';

import { useContext, useEffect, useState } from 'react';
import { Bot, CalendarClock, Check, MoreHorizontal, RefreshCw, Settings2, Wrench } from 'lucide-react';
import AgentDetailsTab from './AgentDetailsTab';
import AgentOptionsTab from './AgentOptionsTab';
import AgentScheduleTab from './AgentScheduleTab';
import AgentToolsTab from './AgentToolsTab';
import { AgentConfigContext } from '@/context/AgentConfigContext';
import { toast } from '@/components/ui/toast';
import axios from 'axios';

type ConfigTab = 'details' | 'tools' | 'schedule' | 'options';
const tabs: { id: ConfigTab; label: string; icon: typeof Settings2 }[] = [
  { id: 'details', label: 'Settings', icon: Settings2 },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'schedule', label: 'Schedule', icon: CalendarClock },
  { id: 'options', label: 'Agent settings', icon: MoreHorizontal },
];

export default function AgentConfiguration() {
  const [activeTab, setActiveTab] = useState<ConfigTab>('details');
  const {agentConfig, setAgentConfig} = useContext(AgentConfigContext);
  
    const SaveAgentConfig = async () => {
      toast.add({ 
      title: "saving info",
      description: "your agent config is being saved",
      type: "info",
    })
  
      const result = await axios.put('/api/agent', agentConfig);  
      console.log(result.data);

         toast.add({ 
      title: "agent config saved",
      description: "your agent config has been saved",
      type: "success",
    })
    }
  

  function shuffleAvatar() {
  const RandomSeed = crypto.randomUUID();
  const newAvatarUrl = `https://api.dicebear.com/10.x/bottts/svg?seed=${RandomSeed}`;
  setAgentConfig({
    ...agentConfig,
    agentImage: newAvatarUrl
  });
}
  return (
    <aside className="flex min-h-140 w-full shrink-0 flex-col bg-slate-50/70 xl:h-full xl:min-h-0 xl:w-110 2xl:w-120">
      <header className="flex h-19 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-7">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">Agent Configuration</h2>
        <button onClick={SaveAgentConfig} type="button" className="inline-flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"><Check size={15} /> Save Info </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
              <img src = {agentConfig?.agentImage} alt = "Agent Avatar" className='size-15'></img>
            <div>
              <p className="text-sm font-medium text-slate-800">Agent avatar</p>
              <button onClick={shuffleAvatar} type="button" className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"><RefreshCw size={13} /> Shuffle avatar</button>
            </div>
          </div>
          <label htmlFor="agent-name" className="mb-1.5 mt-4 block text-xs font-medium text-slate-600">Agent name</label>
          <input id="agent-name" defaultValue={agentConfig?.name  } 
          onChange={(event) => setAgentConfig({...agentConfig, name: event.target.value})} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100" />
          
        </section>

        <nav aria-label="Agent configuration sections" className="mt-5 flex items-center gap-1 border-b border-slate-200">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" title={label} aria-label={label} aria-pressed={activeTab === id} onClick={() => setActiveTab(id)} className={`relative flex size-11 items-center justify-center rounded-t-lg transition ${activeTab === id ? 'text-slate-900' : 'text-slate-400 hover:bg-white hover:text-slate-700'}`}>
              <Icon size={18} strokeWidth={1.8} />
              {activeTab === id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-slate-900" />}
            </button>
          ))}
        </nav>

        {activeTab === 'details' && <AgentDetailsTab />}
        {activeTab === 'tools' && <AgentToolsTab />}
        {activeTab === 'schedule' && <AgentScheduleTab />}
        {activeTab === 'options' && <AgentOptionsTab />}
      </div>

      <footer className="hidden shrink-0 items-center gap-2 border-t border-slate-200 bg-white px-7 py-3 text-xs text-slate-400 xl:flex"><Bot size={14} /> Agent settings are ready to configure</footer>
    </aside>
  );
}
