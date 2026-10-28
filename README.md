# Garvit Mathur | Portfolio

Personal portfolio for Garvit Mathur, presenting work across AI-powered
applications, data analytics, and product-focused software development.

The site is a content-driven homepage with a dark "AI engineering lab" visual
identity (an animated system map, a conceptual workflow, and an architecture
diagram for each project), plus in-depth case studies for Verdict and AuditFlow.
Every project, credential, and profile detail is kept in typed local data files
and is checked against its source (project repositories, live demo URLs, or
original documents) before it is published.

## Technology Stack

- [Next.js](https://nextjs.org) 16 with the App Router (Cache Components enabled)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) 5
- [Tailwind CSS](https://tailwindcss.com) 4, compiled through `@tailwindcss/turbopack`
- `next/font` for self-hosted Geist, Geist Mono, and Hubot Sans fonts
- `next/image` for the project screenshots
- ESLint 9 with `eslint-config-next`
- npm for package management

There is no database, authentication, backend, or animation library. Pages are
prerendered as static content. Animation is CSS-first: the hero entrance runs on
first paint, before JavaScript loads, and a few small Client Components add
behaviour that needs the browser (see [Motion and interaction](#motion-and-interaction)).

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
| `npm test` | Run the unit tests with Node's test runner (Node 22.18 or later) |

Run `npm run lint`, `npm test`, and `npm run build` before committing changes.

`next dev` allows one dev server per checkout. To preview a production build
alongside a running dev server, use the `next-start` configuration in
`.claude/launch.json` (port 3100) after `npm run build`.

## Project Structure

```text
public/images/projects/  Authentic screenshots from the project repositories
src/
├── app/
│   ├── layout.tsx       Root layout: fonts, metadata, header, footer
│   ├── page.tsx         Homepage composition
│   ├── projects/        Case studies: /projects/verdict and /projects/auditflow
│   └── globals.css      Design tokens, Tailwind theme, base styles, reveals
├── components/          Homepage sections and shared UI
│   ├── case-study/      Case-study hero, numbered sections, decision cards, spec sheet
│   └── visuals/         System map, workflow, project diagrams, case-study figures
├── content/
│   ├── site.ts          Profile, hero copy, navigation, focus areas, contact links
│   ├── projects.ts      Projects, their architecture diagrams, and screenshots
│   ├── case-studies/    Case-study content, each claim tied to a repository file
│   ├── credentials.ts   Credentials and professional development
│   ├── workflow.ts      The conceptual workflow shown in the hero
│   └── commands.ts      Command palette entries, derived from the files above
├── lib/                 Small browser helpers
└── styles/              Component styles: interface, hero, visuals, case studies
```

## Design System

Tokens live on `:root` in `src/app/globals.css` and are mapped to Tailwind
utilities with `@theme inline` (for example `bg-surface`, `text-muted`,
`border-line`, `text-teal`). Tailwind CSS 4 is configured in CSS, so there is no
`tailwind.config.js`.

- **Surfaces:** near-black (`--bg`) lifting through charcoal to midnight blue.
- **Type:** Hubot Sans for display, Geist for body text, Geist Mono for labels.
- **Accents carry meaning.** Violet marks model-driven steps. Teal marks data,
  deterministic checks, people, and interaction. Diagrams also show each step's
  kind as text and marker shape, so colour is never the only signal.

## Motion and Interaction

- **Server first.** Sections are Server Components. They opt into behaviour with
  data attributes (`data-reveal`, `data-loop`, `data-spotlight`, `data-tilt`),
  which one Client Component, `InteractionLayer`, enhances.
- **Reveals never hide server HTML.** Content renders visible; only elements
  still below the fold after hydration are hidden and revealed on scroll.
- **Loops pause off screen.** Continuous animations (packets, pulses, the
  workflow relay) stop while their container is not visible.
- **Other client components:** the header shell (reading progress), the
  desktop navigation (current-section indicator), the mobile menu, the command
  palette (`Ctrl+K` / `Cmd+K`), the system map's pointer response, the report
  page viewer, the copy-email button, and two case-study figures: Verdict's
  rule explorer (runs the app's scoring rule on ratings the reader picks; no
  model call) and AuditFlow's ticket-scenario picker.
- **Between pages.** Cache Components keep visited pages in the DOM, hidden, so
  element IDs must be unique across the whole site. `data-scroll-behavior` on
  `<html>` lets Next.js scroll a newly opened page to its top instantly, and the
  interaction layer restores each page's scroll position on back and forward.
- **Reduced motion.** With `prefers-reduced-motion`, entrances, loops, parallax,
  and tilt are removed; all content and interactions remain.

## Editing Content

Portfolio content lives in `src/content/`. When adding or changing entries:

- Use only information that can be verified from the project's repository, a
  working demo URL, or an original document.
- Label collaborative projects and state Garvit's own contribution.
- Do not publish metrics, results, or claims that the source does not support.
- Do not add private documents, certificate identifiers, verification codes, or
  personal contact details beyond the approved public links.
- Architecture diagrams are drawn from code. Each `diagram` in `projects.ts`
  names its source files; update the diagram when the code changes.
- Screenshots must come from the project itself and are labelled as
  screenshots. Diagrams are never presented as screenshots.
- Report previews (`preview` in `projects.ts`) use the project's own screenshot
  or PDF export pages, labelled as static. Link the PDF export with `report`;
  never describe it as an interactive or hosted report, and keep large source
  files such as `.pbix` out of this repository.
- Case studies (`content/case-studies/`) cite the code they describe. Source
  links point at the commit recorded in `repository.commit`; when the project
  changes, re-check the claims, then update `commit` and `checked`. Mark each
  reason as documented (written down in the repository) or inferred, each next
  step as from the project's roadmap or proposed, and credit collaborators'
  work to them.

Contributor and agent guidelines are in [`CLAUDE.md`](CLAUDE.md) and
[`AGENTS.md`](AGENTS.md).

## Current Status

In active development on the `feature/portfolio-foundation` branch.

Implemented:

- Dark AI-engineering-lab visual system with responsive navigation, a
  current-section indicator, and an accessible mobile menu
- Hero with kinetic headline, interactive system map, and conceptual workflow
- Featured AI projects with architecture diagrams, individual and team work
  labelled
- Analytics work: the six-page India General Election 2024 Power BI report,
  shown through its own pages with the PDF export linked, and the World
  Indicators dashboard with its data pipeline
- Credentials timeline and contact section
- Command palette for quick navigation
- Case studies for Verdict and AuditFlow, linked from their project cards and
  the command palette, with architecture figures drawn from the code and every
  claim linked to the repository

Planned for later milestones:

- Case studies for other projects, once their details are verified
- Technical skills
- Professional experience
- About and education
- Resume link
- Vercel deployment

### Future possibility: "Ask My Portfolio"

An assistant that answers questions about Garvit's verified projects,
experience, skills, and credentials from curated content. It is not
implemented and no AI API is integrated. If approved later, it must use
server-side API access with credentials in environment variables (never
`NEXT_PUBLIC_`), validated inputs, rate limiting, usage controls, and cost
limits.
