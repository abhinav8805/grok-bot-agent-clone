import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { AgentConfig, db } from "@/db";
import { error } from "console";
import { desc, eq } from "drizzle-orm";

export async function POST(req:NextRequest) {
    const {agentId, name, description, agentImage} = await req.json();
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
        return NextResponse.json({error: "unauthorized"}, {status: 401})
    }

    const newAgentConfig = await db.insert(AgentConfig).values({
        agentId: agentId,
        name,
        description,
        agentImage,
        userEmail: session.user.email
    }).returning();

    return NextResponse.json({message: "agent config saved successfully", AgentConfig: newAgentConfig});
}

export async function GET(req:NextRequest) {
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const agentConfigs = await db.select().from(AgentConfig)
    .where(eq(AgentConfig.userEmail, session.user.email))
    .orderBy(desc(AgentConfig.createdAt));

    return NextResponse.json({agentConfigs});

}