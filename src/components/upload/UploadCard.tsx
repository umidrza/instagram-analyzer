"use client";

import { useRef } from "react";
import type { AnalysisResult } from "@/types/domain";
import { analyzeInstagram } from "@/lib/instagram/analyzeInstagram";

interface Props {
    onAnalysisComplete: (analysis: AnalysisResult) => void;
}

export default function UploadCard({ onAnalysisComplete }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleFile(file: File) {
        if (!file.name.endsWith(".zip")) {
            alert("Please upload a ZIP file.");
            return;
        }

        const result = await analyzeInstagram(file);

        onAnalysisComplete(result);
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        handleFile(file);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (!file) {
            return;
        }

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
        </div>
    );
}