"use client";

import { useRef, useState } from "react";
import type { AnalysisResult } from "@/types/domain";
import { analyzeInstagram } from "@/lib/instagram/analyzeInstagram";

interface Props {
    onAnalysisComplete: (analysis: AnalysisResult) => void;
}

export default function UploadCard({ onAnalysisComplete }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleFile(file: File) {
        setIsLoading(true);
        setError(null);

        try {
            const result = await analyzeInstagram(file);
            onAnalysisComplete(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to read the Instagram export.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) {
            setError("No file selected.");
            return;
        }

        handleFile(file);
    }

    function onDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        if (isLoading) {
            return;
        }

        const file = e.dataTransfer.files?.[0];

        if (!file) {
            setError("No file was dropped.");
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

            {error && (
                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept=".zip"
                hidden
                disabled={isLoading}
                onChange={onInputChange}
            />

            <button
                disabled={isLoading}
                onClick={() => inputRef.current?.click()}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isLoading && (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                )}

                {isLoading ? "Analyzing..." : "Choose ZIP"}
            </button>

            <div
                className={`mt-6 rounded-lg border border-dashed p-8 text-center transition ${isLoading
                        ? "border-blue-500 text-blue-400"
                        : "border-neutral-700 text-neutral-400"
                    }`}
            >
                {isLoading
                    ? "Processing your Instagram export..."
                    : "Drag & Drop ZIP Here"}
            </div>
        </div>
    );
}