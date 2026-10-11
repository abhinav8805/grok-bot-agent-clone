import { Copy, Pause, Plus, RotateCcw, ShieldAlert } from 'lucide-react';

export default function AgentOptionsTab() {
  return (
    <section className="space-y-2 py-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-800">General options</h3>
      <button type="button" className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"><Copy size={16} className="text-slate-400" /> Duplicate agent <Plus size={15} className="ml-auto text-slate-400" /></button>
      <button type="button" className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"><Pause size={16} className="text-slate-400" /> Pause agent</button>
      <button type="button" className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"><RotateCcw size={16} className="text-slate-400" /> Reset agent</button>
      <div className="mt-7 rounded-xl border border-rose-200 bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800"><ShieldAlert size={16} className="text-rose-500" /> Danger zone</div>
        <p className="mt-1.5 text-xs leading-5 text-slate-500">Permanently remove this agent and its configuration.</p>
        <button type="button" className="mt-3 h-9 rounded-lg border border-rose-200 px-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50">Delete agent</button>
      </div>
    </section>
  );
}
