import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: user.id },
            include: {
                plans: {
                    where: { isActive: true },
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
            },
        });

        if (!dbUser || dbUser.plans.length === 0) {
            return NextResponse.json(null);
        }

        return NextResponse.json(dbUser.plans[0].planData);
    } catch (error) {
        console.error("Error fetching plan:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const planData = await req.json();

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

        // Deactivate old plans
        await prisma.generatedPlan.updateMany({
            where: { userId: dbUser.id, isActive: true },
            data: { isActive: false },
        });

        // Create new plan
        const newPlan = await prisma.generatedPlan.create({
            data: {
                userId: dbUser.id,
                planData: planData,
                isActive: true,
            },
        });

        return NextResponse.json(newPlan);
    } catch (error) {
        console.error("Error saving plan:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
