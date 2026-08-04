"use client";

import { useRef, useState } from "react";
import type { UploadedFile } from "@/types/upload";
import { readZip } from "@/lib/instagram/readZip";

export default function UploadCard() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [uploadedFile, setUploadedFile] =
        useState<UploadedFile | null>(null);

    async function handleFile(file: File) {
        if (!file.name.endsWith(".zip")) {
            alert("Please upload a ZIP file.");
            return;
        }

        const files = await readZip(file);

        console.log(files);

        setUploadedFile({
            file,
            name: file.name,
            size: file.size,
        });
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

            {uploadedFile && (
                <div className="mt-6 rounded-lg bg-neutral-800 p-4">
                    <div>{uploadedFile.name}</div>

                    <div className="text-sm text-neutral-400">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                </div>
            )}
        </div>
    );
}