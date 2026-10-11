"use client"

import AgentChat from '@/components/custom/agent-space/AgentChat';
import AgentConfiguration from '@/components/custom/agent-space/AgentConfiguration';
import { toast } from '@/components/ui/toast';
import { AgentConfigContext } from '@/context/AgentConfigContext';
import { AgentConfigType } from '@/root/Agent';
import axios from 'axios';
import { Agent } from 'http';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AgentSpace() {
  const {agentId} = useParams();
  const [agentConfig, setAgentConfig] = useState<AgentConfigType | null>()

  useEffect(() => {
    agentId && GetAgentConfig()
  }, [agentId])


  const GetAgentConfig = async() => {
    const result = await axios.get('/api/agent?agentId=' + agentId )

    console.log(result.data);
    setAgentConfig(result.data)
  }


  return (
    <AgentConfigContext.Provider value={{agentConfig, setAgentConfig}}>
    <main className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-white xl:flex-row">
      <AgentChat />
      <AgentConfiguration />
    </main>
    </AgentConfigContext.Provider>
  );
}
