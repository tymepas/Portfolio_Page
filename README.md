# Garvit Mathur | Portfolio

Personal portfolio for Garvit Mathur, presenting work across AI-powered
applications, data analytics, and product-focused software development.

The site is built as a single, content-driven homepage. Every project,
credential, and profile detail is kept in typed local data files and is checked
against its source (project repositories, live demo URLs, or original
documents) before it is published.

## Technology Stack

- [Next.js](https://nextjs.org) 16 with the App Router (Cache Components enabled)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) 5
- [Tailwind CSS](https://tailwindcss.com) 4, compiled through `@tailwindcss/turbopack`
- `next/font` for self-hosted Geist, Geist Mono, and Newsreader fonts
- ESLint 9 with `eslint-config-next`
- npm for package management

There is no database, authentication, or backend. Pages are server-rendered and
prerendered as static content; the only client-side component is the mobile
navigation menu.

## Getting Started

### Prerequisites

- Node.js 20.9 or later (required by Next.js 16)
- npm

### Run locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reloading |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build (run `npm run build` first) |
| `npm run lint` | Run ESLint across the project |

Run `npm run lint` and `npm run build` before committing changes.

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx       Root layout: fonts, metadata, header, footer
│   ├── page.tsx         Homepage composition
│   └── globals.css      Tailwind CSS 4 theme tokens and base styles
├── components/          Reusable UI and homepage sections
└── content/
    ├── site.ts          Profile, navigation, focus areas, contact links
    ├── projects.ts      Featured AI projects and analytics work
    └── credentials.ts   Credentials and professional development
```

Design tokens (colors and font families) are defined in the `@theme` block of
`src/app/globals.css`. Tailwind CSS 4 is configured in CSS, so there is no
`tailwind.config.js`.

## Editing Content

Portfolio content lives in `src/content/`. When adding or changing entries:

- Use only information that can be verified from the project's repository, a
  working demo URL, or an original document.
- Label collaborative projects and state Garvit's own contribution.
- Do not publish metrics, results, or claims that the source does not support.
- Do not add private documents, certificate identifiers, verification codes, or
  personal contact details beyond the approved public links.

Contributor and agent guidelines are in [`CLAUDE.md`](CLAUDE.md) and
[`AGENTS.md`](AGENTS.md).

## Current Status

In active development on the `feature/portfolio-foundation` branch.

Implemented:

- Responsive navigation with an accessible mobile menu
- Introduction and areas of focus
- Featured AI projects, with individual and team work labelled
- Analytics work
- Credentials and professional development
- Contact links

Planned for later milestones:

- Detailed project case studies
- Technical skills
- Professional experience
- About and education
- Resume link

Deployment to Vercel is planned and has not been set up yet.
