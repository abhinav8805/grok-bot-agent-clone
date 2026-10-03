import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { db, users } from "@/db";

/**
 * Handles POST requests to create (or sync) the authenticated user in the database.
 * Requires an active session with a user email; inserts the user if they don't
 * already exist, ignoring conflicts on the unique email column.
 *
 * @param req - The incoming Next.js request.
 * @returns A JSON response indicating success, that the user already exists,
 * an unauthorized error, or an internal server error.
 */
export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
        return NextResponse.json({error : "Unauthorized"}, {status: 401});
    }

    try{
        const result = await db.insert(users).values({
            name:session?.user?.name,
            email:session?.user?.email,

        }).onConflictDoNothing({
            target: users.email
        }).returning();

        if(result.length === 0){
            return NextResponse.json({message: "User already exists"}, {status: 200});
        }

        return NextResponse.json({message : "user saved successfully", user: result})
    }
    catch(e){
        return NextResponse.json({error: "Internal server error"}, {status:500});
    }
}