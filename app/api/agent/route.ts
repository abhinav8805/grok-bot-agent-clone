import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { AgentConfig, db } from "@/db";
import { error } from "console";
import { and, desc, eq } from "drizzle-orm";

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

    const {searchParams} = new URL(req.url);
    const agentId = searchParams.get("agentId");

    if(!session?.user?.email){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if(agentId){
        const agentConfig = await db.select().from(AgentConfig).where(
            and(eq(AgentConfig.userEmail, session?.user.email),
             eq(AgentConfig.agentId, agentId)));
        
        return NextResponse.json(agentConfig[0]);
    }    

    const agentConfigs = await db.select().from(AgentConfig)
    .where(eq(AgentConfig.userEmail, session.user.email))
    .orderBy(desc(AgentConfig.createdAt));

    return NextResponse.json({agentConfigs});

}

export async function PUT(req: NextRequest){
    const agentConfig = await req.json();
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
        return NextResponse.json({error: "Unauthorized"},{ status: 400})
    }

    const result = await db.update(AgentConfig).set({
        ...agentConfig, 
        createdAt: new Date()
    }).where(and(eq(AgentConfig.agentId, agentConfig.agentId)))
    .returning();

    return NextResponse.json({message: "Agent config updated successfully"})
}