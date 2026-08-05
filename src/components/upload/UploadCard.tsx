"use client";

import { useRef, useState } from "react";
import type { AnalysisResult } from "@/types/domain";
import { parseFile } from "@/lib/instagram/parser";
import { analyzeConnections } from "@/lib/instagram/analysis/analyze";
import Dashboard from "../dashboard";

export default function UploadCard() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [analysis, setAnalysis] =
        useState<AnalysisResult | null>(null);

    async function handleFile(file: File) {
        if (!file.name.endsWith(".zip")) {
            alert("Please upload a ZIP file.");
            return;
        }

        const data = await parseFile(file);

        const result = analyzeConnections(data);

        setAnalysis(result);
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        handleFile(file);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (!file) return;

        handleFile(file);
    }

    return (
        <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-full max-w-lg rounded-xl border border-neutral-800 bg-neutral-900 p-8"
        >
            <h2 className="text-2xl font-bold">
                Upload Instagram ZIP
            </h2>

            <p className="mt-2 text-neutral-400">
                Everything is processed locally.
            </p>

            <input
                ref={inputRef}
                type="file"
                accept=".zip"
                hidden
                onChange={onInputChange}
            />

            <button
                onClick={() => inputRef.current?.click()}
                className="mt-8 w-full rounded-lg bg-blue-600 py-3 hover:bg-blue-500"
            >
                Choose ZIP
            </button>

            <div className="mt-6 rounded-lg border border-dashed border-neutral-700 p-8 text-center text-neutral-400">
                Drag & Drop ZIP Here
            </div>

            {analysis && (
                <Dashboard data={analysis} />
            )}

        </div>
    );
}