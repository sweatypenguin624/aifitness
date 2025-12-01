import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type"); // workout, meal, weight

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id },
        });

        if (!dbUser) {
            return NextResponse.json([]);
        }

        let logs;
        if (type === "workout") {
            logs = await prisma.workoutLog.findMany({
                where: { userId: dbUser.id },
                orderBy: { date: "desc" },
            });
        } else if (type === "meal") {
            logs = await prisma.mealLog.findMany({
                where: { userId: dbUser.id },
                orderBy: { date: "desc" },
            });
        } else if (type === "weight") {
            logs = await prisma.weightLog.findMany({
                where: { userId: dbUser.id },
                orderBy: { date: "asc" },
            });
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        return NextResponse.json(logs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { type, data } = body;

        // Ensure user exists in DB
        const dbUser = await prisma.user.upsert({
            where: { clerkId: user.id },
            update: {},
            create: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName} ${user.lastName}`.trim(),
            },
        });

        let newLog;
        if (type === "workout") {
            newLog = await prisma.workoutLog.create({
                data: {
                    userId: dbUser.id,
                    date: new Date(data.date),
                    exercise: data.exercise,
                    sets: Number(data.sets),
                    reps: Number(data.reps),
                    weight: Number(data.weight),
                },
            });
        } else if (type === "meal") {
            newLog = await prisma.mealLog.create({
                data: {
                    userId: dbUser.id,
                    date: new Date(data.date),
                    name: data.name,
                    calories: Number(data.calories),
                    protein: Number(data.protein),
                    carbs: Number(data.carbs),
                    fats: Number(data.fats),
                },
            });
        } else if (type === "weight") {
            newLog = await prisma.weightLog.create({
                data: {
                    userId: dbUser.id,
                    date: new Date(data.date),
                    weight: Number(data.weight),
                },
            });
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        return NextResponse.json(newLog);
    } catch (error) {
        console.error("Error saving log:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function DELETE(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const id = searchParams.get("id");
        const all = searchParams.get("all");

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id },
        });

        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (type === "weight" && all === "true") {
            await prisma.weightLog.deleteMany({
                where: { userId: dbUser.id },
            });
            return NextResponse.json({ success: true });
        }

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        if (type === "workout") {
            await prisma.workoutLog.delete({ where: { id } });
        } else if (type === "meal") {
            await prisma.mealLog.delete({ where: { id } });
        } else if (type === "weight") {
            await prisma.weightLog.delete({ where: { id } });
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting log:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
