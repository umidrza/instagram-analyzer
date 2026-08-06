# Instagram Analyzer

Instagram Analyzer is a privacy-first web application that helps you analyze your Instagram data export. Upload your Instagram ZIP archive to discover unfollowers, accounts you don't follow back, pending follow requests, and other relationship insights.

All processing happens locally in your browser. Your Instagram data is **never uploaded or stored on a server**.

## ✨ Features

* Analyze your Instagram data export
* View followers and following lists
* Find people who don't follow you back
* Find accounts you don't follow back
* View pending follow requests
* Fast, client-side ZIP parsing
* No account login required
* No server-side data storage

## 🔒 Privacy

Your privacy comes first.

* Your Instagram ZIP file is processed entirely in your browser.
* No personal data is uploaded to any server.
* No Instagram credentials are required.
* Nothing is stored after you close the page.

## 🛠 Tech Stack

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* fflate (ZIP extraction)

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### Build for production

```bash
npm run build
```

## 📦 Usage

1. Request and download your Instagram data from Instagram.
2. Choose the **JSON** export format when requesting your data.
3. Download the ZIP archive once Instagram has prepared it.
4. Upload the ZIP file to Instagram Analyzer.
5. Explore your follower insights.

Need help? Visit the **/how-to-export** guide inside the app.

## 📁 Project Structure

```
src/
├── app/                 # App Router pages
├── components/          # UI components
├── lib/
│   └── instagram/       # ZIP parsing and analysis logic
├── types/               # Shared TypeScript types
└── utils/               # Utility functions
```

## 💻 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to open an issue or submit a pull request.

