import { Agent, assistant, run, user } from "@openai/agents";

export type Message={
    role:"user" | "agent" | "assistant",
    content : string
}

export const createAgent = (name: string, instrutions: string) =>{
    return new Agent({
        name: name,
        instructions: instrutions,
        tools: [],
        model:"gpt-5-mini"
    })
}

export const executeAgentChat= async(
    name: string,
    instrutions: string,
    messages: Message[]
) =>{
    const agent= createAgent(name, instrutions);
    const history = messages.map((msg) => msg.role === 'assistant' || msg.role == 'agent' ? 
        assistant(msg.content) : user(msg.content));

        const result = await run(agent, history);

        return result.finalOutput
}