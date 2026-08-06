"use client";

import Link from "next/link";
import { useState } from "react";

type TabKey = "android" | "iphone" | "desktop";

const guideTabs: Array<{ key: TabKey; label: string; title: string; intro: string }> = [
  {
    key: "android",
    label: "Android",
    title: "How to download your Instagram ZIP file on Android",
    intro:
      "Use these steps on Android to request your Instagram archive and download the ZIP file for upload.",
  },
  {
    key: "iphone",
    label: "iPhone",
    title: "How to download your Instagram ZIP file on iPhone",
    intro:
      "Follow these iPhone steps to request your Instagram data archive and download the ZIP file.",
  },
  {
    key: "desktop",
    label: "PC / Mac",
    title: "How to download your Instagram ZIP file on desktop",
    intro:
      "Desktop is often the fastest way to download larger Instagram data files.",
  },
];

const guides: Record<
  TabKey,
  { steps: Array<{ title: string; description: string | string[] }> }
> = {
  android: {
    steps: [
      {
        title: "Open Instagram and go to Settings",
        description: "Open the Instagram app and tap your profile picture, then open Settings.",
      },
      {
        title: "Select Accounts Center",
        description: "Tap Accounts Center to continue to your account data options.",
      },
      {
        title: "Open Your information and permissions",
        description: "Tap Your information and permissions to view the data download tools.",
      },
      {
        title: "Choose Export your information",
        description: "Tap Export your information to start the archive request.",
      },
      {
        title: "Select the profile",
        description: "Choose the Instagram profile for which you want to download data.",
      },
      {
        title: "Choose Export to device",
        description: "Tap Export to device to request a download directly to your phone.",
      },
      {
        title: "Confirm the export settings",
        description: [
          "Enter your email to receive a notification when the file is ready.",
          "Choose Followers and Following from the customized information options.",
          "Select All Time as the date range.",
          "Choose JSON as the format.",
        ],
      },
      {
        title: "Tap Export",
        description: "Start the export request and wait for Instagram to prepare your file.",
      },
      {
        title: "Check your email",
        description: "Instagram will send a confirmation email when the ZIP archive is ready.",
      },
      {
        title: "Download the ZIP",
        description: "Open the email and tap Download ZIP to get the archive on your device.",
      },
      {
        title: "Upload it here",
        description: "Upload the downloaded ZIP file to this tracker to analyze your Instagram data.",
      },
    ],
  },
  iphone: {
    steps: [
      {
        title: "Open Instagram on your iPhone",
        description: "Launch the Instagram app and sign in to the account whose data you want to export.",
      },
      {
        title: "Go to your profile",
        description: "Tap your profile picture in the bottom-right corner to open your profile page.",
      },
      {
        title: "Open the menu",
        description: "Tap the menu icon in the top-right corner of the screen.",
      },
      {
        title: "Open Settings and privacy",
        description: "From the menu, tap Settings and privacy to continue to the account settings area.",
      },
      {
        title: "Open Accounts Center",
        description: "Scroll down and tap Accounts Center under the Meta section.",
      },
      {
        title: "Open Your information and permissions",
        description: "Inside Accounts Center, tap Your information and permissions.",
      },
      {
        title: "Start your download request",
        description: "Tap Download your information, then tap Download or transfer information.",
      },
      {
        title: "Select your Instagram account",
        description: "Choose your Instagram account from the list of available accounts.",
      },
      {
        title: "Choose what to include",
        description: "Select Some of your information and find Followers and Following under Connections.",
      },
      {
        title: "Continue the request",
        description: "Tap Next, then choose Download to device and set the date range to All time.",
      },
      {
        title: "Choose the file format",
        description: "Set the format to JSON and tap Create files to start the export.",
      },
      {
        title: "Wait for the email",
        description: "Instagram will usually email you when the archive is ready. This can take 24 to 48 hours.",
      },
      {
        title: "Download the archive",
        description: "Open the email, tap the download link, and the file will appear in your Files app on iPhone.",
      },
      {
        title: "Upload the ZIP here",
        description: "Once the ZIP file is downloaded, upload it here to analyze your Instagram data locally in your browser.",
      },
    ],
  },
  desktop: {
    steps: [
      {
        title: "Open Instagram in your browser",
        description: "Go to instagram.com and sign in to your account.",
      },
      {
        title: "Open your profile menu",
        description: "Click your profile picture in the top-right corner and open Settings.",
      },
      {
        title: "Open Accounts Center",
        description: "In the left sidebar, click See more in Accounts Center.",
      },
      {
        title: "Open Your information and permissions",
        description: "Click Your information and permissions to continue.",
      },
      {
        title: "Start your download request",
        description: "Click Download your information, then Download or transfer information.",
      },
      {
        title: "Select your profile",
        description: "Choose the Instagram profile you want to export.",
      },
      {
        title: "Choose what to include",
        description: "Select Some of your information and check Followers and Following.",
      },
      {
        title: "Choose the export settings",
        description: "Click Next, select Download to device, set the date range to All time, and choose JSON.",
      },
      {
        title: "Create the files",
        description: "Click Create files to begin the archive request.",
      },
      {
        title: "Wait for the email",
        description: "Instagram will send an email when your ZIP is ready, usually within 24 to 48 hours.",
      },
      {
        title: "Download the ZIP",
        description: "Open the email and click Download your files to save the ZIP to your Downloads folder.",
      },
      {
        title: "Upload it here",
        description: "Open the ZIP from your Downloads folder and upload it here to start the analysis.",
      },
    ],
  },
};

export default function HowToExportPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("android");
  const activeGuide = guideTabs.find((tab) => tab.key === activeTab) ?? guideTabs[0];
  const steps = guides[activeTab].steps;

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-neutral-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-8 shadow-2xl shadow-black/20">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Step-by-step guide
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            How to download your Instagram ZIP file
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-400 sm:text-lg">
            Choose your device below for the right walkthrough. Once the ZIP file is downloaded, you can upload it here and analyze your Instagram data.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
            >
              Back to uploader
            </Link>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-neutral-700 px-4 py-2 font-medium text-neutral-200 transition hover:border-neutral-500 hover:bg-neutral-800"
            >
              Open Instagram
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="flex flex-wrap gap-2">
            {guideTabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-white">{activeGuide.title}</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-400">{activeGuide.intro}</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {steps.map((step) => (
              <section
                key={step.title}
                className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-6"
              >
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                {Array.isArray(step.description) ? (
                  <ul className="mt-2 space-y-2 text-sm leading-7 text-neutral-400">
                    {step.description.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm leading-7 text-neutral-400">{step.description}</p>
                )}
              </section>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold text-white">Tips</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-neutral-400">
            <li>• Use the latest Instagram app version if you do not see the export option.</li>
            <li>• The download can take a while, so keep an eye on your email inbox.</li>
            <li>• Choose All Time and JSON for the most complete archive and easiest upload.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
