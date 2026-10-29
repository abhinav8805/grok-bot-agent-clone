export type AgentConfigType = {
    agentId: string;
    name: string;
    description: string | null;
    agentImage: string | null;
    createdAt: Date;
    userEmail: string;
    composioSessionId: string | null;
    tools: any
};