# Instagram Analyzer

Instagram Analyzer is a modern web app for uploading your Instagram data export ZIP file and getting a clear breakdown of your follower and following relationships. It is built with Next.js, React, TypeScript, and Tailwind CSS.

## What it does

- Upload an Instagram ZIP export
- Parse follower and following data locally in the browser
- Show a dashboard with key stats and insights
- Provide a step-by-step guide for downloading your Instagram archive

> Your Instagram data is processed locally in the browser, so it does not need to be sent to a server.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- fflate for ZIP handling

## Getting started

### 1. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Run the development server

\`\`\`bash
npm run dev
\`\`\`

Then open http://localhost:3000 in your browser.

### 3. Build for production

\`\`\`bash
npm run build
\`\`\`

## How to use

1. Download your Instagram data archive from Instagram.
2. Upload the ZIP file in the app.
3. Wait for the analysis to complete.
4. Review the dashboard results.

If you need help finding the export file, use the guide page in the app.

## Project structure

- src/app - app routes and pages
- src/components - UI components such as the upload card and dashboard
- src/lib/instagram - parsing and analysis logic for Instagram exports
- src/types - shared TypeScript types

## Development notes

- The main entry page is the uploader experience.
- The export help page is available at /how-to-export.
- The app is designed to work entirely client-side for uploaded ZIP files.

## Useful commands

\`\`\`bash
npm run dev
npm run build
npm run lint
\`\`\`