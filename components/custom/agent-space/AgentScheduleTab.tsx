'use client';

import { useState } from 'react';
import { CalendarClock, Clock3 } from 'lucide-react';

export default function AgentScheduleTab() {
  const [scheduleType, setScheduleType] = useState('Recurring');

  return (
    <section className="py-5">
      <h3 className="text-sm font-semibold text-slate-800">Run schedule</h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">Choose when your agent should run.</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {['Manual', 'Recurring', 'Specific time'].map((option) => <button key={option} type="button" onClick={() => setScheduleType(option)} className={`rounded-lg border px-2 py-2.5 text-xs font-medium transition ${scheduleType === option ? 'border-slate-400 bg-white text-slate-900 ring-2 ring-slate-100' : 'border-slate-200 bg-transparent text-slate-500 hover:bg-white'}`}>{option}</button>)}
      </div>
      {scheduleType === 'Recurring' && <div className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <div><label className="mb-1.5 block text-xs font-medium text-slate-600">Frequency</label><div className="flex h-10 items-center justify-between rounded-lg border border-slate-200 px-3 text-sm text-slate-700">Every day <Clock3 size={15} className="text-slate-400" /></div></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="mb-1.5 block text-xs font-medium text-slate-600">Time</label><div className="flex h-10 items-center rounded-lg border border-slate-200 px-3 text-sm text-slate-700">8:00 AM</div></div><div><label className="mb-1.5 block text-xs font-medium text-slate-600">Days</label><div className="flex h-10 items-center rounded-lg border border-slate-200 px-3 text-sm text-slate-700">Every day</div></div></div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-600"><CalendarClock size={14} className="text-slate-400" /> Every day at 8:00 AM</div>
      </div>}
      {scheduleType === 'Specific time' && <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4"><label className="mb-1.5 block text-xs font-medium text-slate-600">Date and time</label><div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm text-slate-500"><Clock3 size={15} /> Select a date and time</div></div>}
      {scheduleType === 'Manual' && <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-5 text-slate-500">This agent runs when you start it manually.</div>}
    </section>
  );
}
