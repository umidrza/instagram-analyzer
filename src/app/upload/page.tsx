"use client";

import { useRouter } from "next/navigation";
import UploadCard from "@/components/upload/UploadCard";
import { useAnalysisStore } from "@/store/analysis";

export default function UploadPage() {
    const router = useRouter();
    const setAnalysis = useAnalysisStore(
        (state) => state.setAnalysis
    );

    return (
        <main className="flex min-h-[calc(100vh-65px)] items-center justify-center p-6">
            <UploadCard
                onAnalysisComplete={(result) => {
                    setAnalysis(result);
                    router.push("/dashboard");
                }}
            />
        </main>
    );
}