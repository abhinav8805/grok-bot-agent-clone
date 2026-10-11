import { CalendarClock, Github, Globe2, Mail, Slack } from 'lucide-react';

const tools = [
  { name: 'Gmail', icon: Mail, color: 'text-rose-500', bg: 'bg-rose-50' },
  { name: 'Slack', icon: Slack, color: 'text-violet-600', bg: 'bg-violet-50' },
  { name: 'Google Calendar', icon: CalendarClock, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Notion', icon: Globe2, color: 'text-slate-800', bg: 'bg-slate-100' },
  { name: 'GitHub', icon: Github, color: 'text-slate-800', bg: 'bg-slate-100' },
];

export default function AgentToolsTab() {
  return (
    <section className="py-5">
      <div className="mb-4"><h3 className="text-sm font-semibold text-slate-800">Connected tools</h3><p className="mt-1 text-xs leading-5 text-slate-500">Connect apps to give your agent more context.</p></div>
      <div className="space-y-2">
        {tools.map(({ name, icon: Icon, color, bg }) => <div key={name} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3">
          <span className={`flex size-9 items-center justify-center rounded-lg ${bg} ${color}`}><Icon size={17} /></span>
          <span className="min-w-0 flex-1 text-sm font-medium text-slate-700">{name}</span>
          <button type="button" className="h-8 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50">Connect</button>
        </div>)}
      </div>
    </section>
  );
}
