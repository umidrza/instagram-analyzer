"use client";

import Link from "next/link";
import Dashboard from "@/components/dashboard";
import { useAnalysisStore } from "@/store/analysis";

export default function DashboardPage() {
    const analysis = useAnalysisStore(
        (state) => state.analysis
    );

    if (!analysis) {
        return (
            <main className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center gap-4">
                <p className="text-neutral-400">
                    Upload your archive first.
                </p>

                <Link
                    href="/upload"
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                    Upload Archive
                </Link>
            </main>
        );
    }

    return (
        <main className="p-6">
            <div className="mx-auto max-w-6xl">
                <Dashboard data={analysis} />
            </div>
        </main>
    );
}