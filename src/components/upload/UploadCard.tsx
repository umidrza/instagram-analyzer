"use client";

import { useRef, useState } from "react";
import type { InstagramData } from "@/types/instagram";
import type { UploadedFile } from "@/types/upload";
import { parseFile } from "@/lib/instagram/parser";

export default function UploadCard() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [uploadedFile, setUploadedFile] =
        useState<UploadedFile | null>(null);
        
    const [parsedData, setParsedData] =
        useState<InstagramData | null>(null);

    async function handleFile(file: File) {
        if (!file.name.endsWith(".zip")) {
            alert("Please upload a ZIP file.");
            return;
        }

        const data = await parseFile(file);

        setParsedData(data);
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
                <div className="mt-6 space-y-4 rounded-lg bg-neutral-800 p-4">

                    {parsedData && (
                        <div className="space-y-3">
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-lg bg-neutral-700/60 p-3">
                                    <div className="text-xs uppercase tracking-wide text-neutral-400">
                                        Followers
                                    </div>
                                    <div className="mt-1 text-lg font-semibold text-white">
                                        {parsedData.followers.length}
                                    </div>
                                </div>

                                <div className="rounded-lg bg-neutral-700/60 p-3">
                                    <div className="text-xs uppercase tracking-wide text-neutral-400">
                                        Following
                                    </div>
                                    <div className="mt-1 text-lg font-semibold text-white">
                                        {parsedData.following.length}
                                    </div>
                                </div>

                                <div className="rounded-lg bg-neutral-700/60 p-3">
                                    <div className="text-xs uppercase tracking-wide text-neutral-400">
                                        Pending requests
                                    </div>
                                    <div className="mt-1 text-lg font-semibold text-white">
                                        {parsedData.pendingRequests.length}
                                    </div>
                                </div>
                            </div>

                            {parsedData.pendingRequests.length > 0 ? (
                                <div>
                                    <div className="mb-2 text-sm font-semibold text-white">
                                        Pending requests
                                    </div>
                                    <ul className="max-h-40 space-y-2 overflow-auto">
                                        {parsedData.pendingRequests.map((user) => (
                                            <li
                                                key={user.href || user.username}
                                                className="rounded-lg bg-neutral-700/60 px-3 py-2 text-sm"
                                            >
                                                <div className="font-medium text-white">
                                                    {user.username}
                                                </div>
                                                {user.href && (
                                                    <div className="text-xs text-neutral-400">
                                                        {user.href}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="text-sm text-neutral-400">
                                    No pending requests found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}