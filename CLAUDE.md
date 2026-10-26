# Garvit Mathur Portfolio

## Project Goal

Build a polished, technically focused personal portfolio for Garvit Mathur.

The portfolio should demonstrate work across:
- AI engineering and AI-powered applications
- Data analytics and visualization
- Product thinking and software development

Present Garvit's professional background accurately. Do not exaggerate professional experience or imply ownership of work completed by collaborators.

## Technology Stack

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS 4
- npm
- Vercel for deployment

Use the existing dependencies unless a concrete requirement justifies adding another package.

## Documentation Requirements

- Read AGENTS.md before implementing changes.
- Consult the installed Next.js documentation under node_modules/next/dist/docs/ when working with Next.js APIs.
- Follow the conventions supported by the installed dependency versions.
- Do not assume Tailwind CSS 3 configuration patterns apply to this Tailwind CSS 4 project.

## Design Direction

Create a distinctive engineering portfolio with a clean, editorial visual style.

Use:
- Clear typography and a strong visual hierarchy
- Generous spacing and carefully aligned layouts
- A restrained color palette with a distinctive accent color
- Refined project cards and useful technical details
- Subtle, purposeful interactions
- Responsive layouts for mobile, tablet, and desktop

Avoid:
- Excessive neon effects and glowing cards
- Decorative animations that distract from the content
- Generic AI-generated-looking dashboard layouts
- Fake terminal windows or meaningless metrics
- Unnecessary visual effects and dependencies

Prefer a light, neutral visual foundation with dark typography and restrained teal or blue accents. Keep the design consistent throughout the application.

Respect reduced-motion preferences and accessibility requirements.

## Content Accuracy

Do not invent:
- Professional achievements or performance metrics
- Employment history or certification details
- Project results, accuracy scores, or business impact
- Project URLs, live demos, or repository links
- Technologies that have not been verified

Use verified information from the supplied content and project repositories.

If information needs verification, mark it for review rather than presenting it as fact.

Clearly distinguish personal contributions from collaborative work.

Do not publish a phone number, residential address, private information, or credentials by default.

## Architecture

- Keep the application simple and maintainable.
- Use reusable React components where they provide clear value.
- Use TypeScript for application code and structured project data.
- Prefer Server Components by default.
- Use Client Components only when browser-side interactivity is needed.
- Keep portfolio content in typed local data files or appropriate content files.
- Use semantic HTML and accessible interactive elements.
- Keep images and other stable assets in the public directory.
- Do not introduce a database, authentication system, or backend without a demonstrated need.
- Keep secrets out of source code and never expose server credentials to the browser.

## Initial Website Sections

Plan for:
1. Homepage and introduction
2. Featured projects
3. Detailed project case studies
4. Technical skills
5. Professional experience
6. About
7. Education and verified certifications
8. Contact and resume links

Implement the site incrementally. Do not build every section in one oversized change.

## Project Case Studies

Candidate projects include AuditFlow, WriteWise, the Delhi air-quality companion, MindStack, and selected analytics dashboards.

These are candidates, not automatically approved portfolio entries.

Before featuring a project, verify its repository, implementation, technologies, current status, available demo, and Garvit's contribution.

Case studies should explain the problem, approach, architecture, implementation, trade-offs, and verified outcomes.

## Development Workflow

- Inspect the existing code before modifying it.
- Make focused, understandable changes.
- Avoid overwriting working configuration unnecessarily.
- Run npm run lint and npm run build after meaningful implementation changes.
- Fix errors introduced by the changes.
- Check responsive behavior, accessibility, navigation, and external links.
- Do not claim a test passed unless it was actually executed.
- Do not commit or push changes unless explicitly requested.

## Current Milestone

Completed:
- Homepage foundation: design tokens, responsive navigation with an accessible mobile menu, hero, and calls to action
- Featured AI projects (Verdict, AuditFlow, WriteWise, AirWise AI), with individual and team work labelled
- Analytics work (World Indicators Dashboard)
- Credentials and professional development section, linked from the navigation
- Project README

Next, one milestone at a time:
- Detailed project case studies
- Technical skills
- Professional experience, only after Garvit confirms the unresolved employment dates, internship details, and resume metrics
- About, education, and resume link
- Vercel deployment

Keep unconfirmed internships, recommendation letters, and unverified metrics out of the public site until Garvit confirms them.
