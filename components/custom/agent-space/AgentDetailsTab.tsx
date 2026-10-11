import { AgentConfigContext } from "@/context/AgentConfigContext";
import { useContext } from "react";

export default function AgentDetailsTab() {
  const {agentConfig, setAgentConfig} = useContext(AgentConfigContext)
  return (
    <section className="space-y-4 py-5">
      <div>
        <label htmlFor="agent-details" className="mb-1.5 block text-sm font-medium text-slate-800">Agent description &amp; instructions</label>
        <textarea id="agent-details" defaultValue={agentConfig?.description} rows={11} className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-5 text-slate-700 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100" 
                  onChange={(event) => setAgentConfig({...agentConfig, description: event.target.value})}
            />

        <p className="mt-1 text-xs leading-5 text-slate-400">Describe your agent and how it should respond.</p>
      </div>
    </section>
  );
}
