import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import UploadCard from "@/components/upload/UploadCard";
import { processInstagramExport } from "@/lib/instagram/processInstagramExport";
import type { AnalysisResult } from "@/types/domain";

vi.mock("@/lib/instagram/processInstagramExport", () => ({
  processInstagramExport: vi.fn(),
}));

describe("UploadCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls onAnalysisComplete when a ZIP file is selected", async () => {
    const onAnalysisComplete = vi.fn();
    const analysis = { followers: [], following: [], pendingRequests: [] } as unknown as AnalysisResult;

    vi.mocked(processInstagramExport).mockResolvedValue(analysis);

    const { container } = render(<UploadCard onAnalysisComplete={onAnalysisComplete} />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["zip-contents"], "export.zip", { type: "application/zip" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(await screen.findByText("Analyzing...")).toBeInTheDocument();
    expect(processInstagramExport).toHaveBeenCalledWith(file);
    expect(onAnalysisComplete).toHaveBeenCalledWith(analysis);
  });

  it("shows an error when the ZIP processing fails", async () => {
    const onAnalysisComplete = vi.fn();

    vi.mocked(processInstagramExport).mockRejectedValue(new Error("Bad ZIP"));

    const { container } = render(<UploadCard onAnalysisComplete={onAnalysisComplete} />);

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["zip-contents"], "broken.zip", { type: "application/zip" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(await screen.findByText("Bad ZIP")).toBeInTheDocument();
    expect(onAnalysisComplete).not.toHaveBeenCalled();
  });
});
