import { DashboardClient } from "@/components/dashboard-client";

export default async function DashboardById({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <DashboardClient id={id} />;
}