import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { AgentConfig, db, Tools } from "@/db";
import { and, eq } from "drizzle-orm";
import { executeAgentChat } from "@/lib/openai/openai-agent";
import { getOrCreateAgentSession } from "@/lib/composio/services";
import { AgentConfigType } from "@/type/Agent";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { agentId, messages, timezone } = await req.json();

    if (!session?.user?.email) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    if (!agentId || !Array.isArray(messages)) {
        return NextResponse.json(
            { error: "Missing agentId or messages" },
            { status: 400 }
        );
    }

    let agentComposionTools: any[] = [];

    const agentConfigs = await db.select().from(AgentConfig)
    .where(
        and(
            eq(AgentConfig.agentId, agentId),
            eq(AgentConfig.userEmail, session.user.email)
        )   
    )
    const agentConfig : AgentConfigType = agentConfigs[0]; 


    if (!agentConfig) {
        return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    if (messages.some((message) =>
        !message || !["user", "agent", "assistant"].includes(message.role) || typeof message.content !== "string"
    )) {
        return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }
    
    if(agentConfig?.tools){
        const composioSession = await getOrCreateAgentSession(agentConfig, session.user?.email);
        agentComposionTools = await composioSession.tools();
    }

    const tools = await db.select().from(Tools).where(eq(Tools.isActive, true));

    const toolsCatalog = tools.map((tool) => ({
        slug: tool.slug,
        name: tool.name,
        description: tool.description
    }))

    const response = await executeAgentChat(agentConfig.name, agentConfig.description ?? "",
        messages, agentComposionTools, toolsCatalog, timezone
    );

    let ToolsConnection = null;

    if (response?.routine) {
    const routineTools = response.routine?.tools;
    const routineToolSlugs = new Set(routineTools?.map((tool: { slug: string }) => tool.slug) ?? []);
    const routineMappedTools = tools.filter((tool) => routineToolSlugs.has(tool.slug));

    ToolsConnection = routineMappedTools;
    }

    return NextResponse.json({
        response,
        ToolsConnection,
    })

}
