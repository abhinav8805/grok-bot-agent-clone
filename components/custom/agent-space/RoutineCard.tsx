import { CalendarClock, ListChecks, Wrench } from 'lucide-react';
import type { RoutineDraft } from '@/lib/openai/agent-response-schema';
import type { ToolConnectionCardData } from '@/type/Message';
import ToolSuggestionCard from './ToolSuggestionCard';

const frequencyLabel: Record<RoutineDraft['schedule']['frequency'], string> = {
  once: 'Once', daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly',
};
const dayLabels: Record<string, string> = {
  MO: 'Mon', TU: 'Tue', WE: 'Wed', TH: 'Thu', FR: 'Fri', SA: 'Sat', SU: 'Sun',
};

export default function RoutineCard({ routine, toolCards }: {
  routine: RoutineDraft;
  toolCards: ToolConnectionCardData[];
}) {
  const schedule = routine.schedule;
  const scheduleDescription = [
    frequencyLabel[schedule.frequency],
    schedule.frequency === 'weekly' && schedule.weekDays.length
      ? schedule.weekDays.map((day) => dayLabels[day] ?? day).join(', ')
      : null,
    `starting ${schedule.startDate}`,
    `at ${schedule.time} (${schedule.timezone})`,
  ].filter(Boolean).join(' · ');

  const toolsBySlug = new Map(toolCards.map((tool) => [tool.slug, tool]));
  const matchedTools = routine.tools.flatMap(({ slug, reason }) => {
    const tool = toolsBySlug.get(slug);
    return tool ? [{ ...tool, reason }] : [{ slug, name: slug, description: '', reason }];
  });

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
      <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><CalendarClock size={19} /></span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">Routine draft</p>
            <h3 className="mt-0.5 text-base font-semibold text-slate-900">{routine.name}</h3>
            <p className="mt-1 text-sm leading-5 text-slate-600">{routine.goal}</p>
          </div>
        </div>
      </header>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-start gap-2.5 text-sm text-slate-700">
          <CalendarClock size={16} className="mt-0.5 shrink-0 text-slate-400" />
          <p>{scheduleDescription}</p>
        </div>
        <div className="flex items-start gap-2.5">
          <ListChecks size={16} className="mt-0.5 shrink-0 text-slate-400" />
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">{routine.instructions}</p>
        </div>

        <section aria-label="Routine tools">
          <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"><Wrench size={14} /> Tools ({matchedTools.length})</h4>
          {matchedTools.length ? (
            <ul className="space-y-2">
              {matchedTools.map((tool) => <ToolSuggestionCard key={tool.slug} tool={tool} />)}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white px-3 py-4 text-sm text-slate-500">No tools suggested for this routine.</p>
          )}
        </section>
      </div>
    </article>
  );
}
