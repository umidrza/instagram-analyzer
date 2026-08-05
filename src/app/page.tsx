"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/types/domain";
import UploadCard from "@/components/upload/UploadCard";
import Dashboard from "@/components/dashboard";

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  return (
    <main className="min-h-screen bg-neutral-950 p-6">
      {analysis ? (
        <div className="mx-auto w-full max-w-6xl">
          <Dashboard data={analysis} />
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <UploadCard onAnalysisComplete={setAnalysis} />
        </div>
      )}
    </main>
  );
}