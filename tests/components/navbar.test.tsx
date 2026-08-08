import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Navbar from "@/components/layout/Navbar";

const { mockUsePathname } = vi.hoisted(() => ({
  mockUsePathname: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Navbar", () => {
  beforeEach(() => {
    mockUsePathname.mockReset();
    mockUsePathname.mockReturnValue("/upload");
  });

  it("highlights the active navigation link based on the current path", () => {
    mockUsePathname.mockReturnValue("/dashboard");

    render(<Navbar />);

    const desktopLinks = screen.getByRole("navigation").querySelectorAll("a");
    const dashboardLink = Array.from(desktopLinks).find((link) => link.textContent === "Dashboard");

    expect(dashboardLink).toHaveClass("text-white");

    const uploadLinks = screen.getAllByRole("link", { name: "Upload" });
    expect(uploadLinks[0]).toHaveClass("text-neutral-400");
  });

  it("toggles the mobile menu when the toggle button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<Navbar />);

    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    const menu = container.querySelector("div.absolute.left-0.top-full") as HTMLElement;

    expect(menu).toHaveClass("invisible");

    await user.click(toggle);

    expect(menu).toHaveClass("visible");
    expect(menu).toHaveClass("translate-y-0");
  });
});
