import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 403 });
    }

    const userId = Number(session.user.id);
    const token = await prisma.onRampTransaction.findFirst({
        where: { userId },
        orderBy: { startTime: 'desc' }, // Get the most recent token
        select: { token: true, userId: true, amount: true }
    });

    if (!token) {
        return NextResponse.json({ message: "No token found" }, { status: 404 });
    }

    return NextResponse.json({ token: token.token, userId: token.userId, amount: token.amount });
};