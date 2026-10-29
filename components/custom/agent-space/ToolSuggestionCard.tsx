import type { ToolConnectionCardData } from '@/type/Message';
import { Wrench } from 'lucide-react';

export default function ToolSuggestionCard({ tool }: { tool: ToolConnectionCardData }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3">
      {tool.icon ? <img src={tool.icon} alt="" className="size-9 rounded-lg object-contain" /> :
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600"><Wrench size={17} /></span>}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="truncate text-sm font-medium text-slate-800">{tool.name}</h4>
          {tool.isConnected && <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">Connected</span>}
        </div>
        <p className="mt-1 text-xs leading-5 text-slate-500">{tool.reason || tool.description}</p>
      </div>
    </li>
  );
}
