# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with React, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Type-check and build for production
pnpm lint         # Run ESLint
pnpm preview      # Preview production build locally
```

## Architecture

**Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Radix UI primitives

**Path Alias:** `@/*` maps to `./src/*` (configured in `tsconfig.json` and `vite.config.ts`)

**Directory Structure:**
- `src/components/ui/` - Reusable UI primitives (shadcn/ui style with Radix + class-variance-authority)
- `src/components/sections/` - Page section components (Hero, About, Stack, Projects, Cert)
- `src/data/personal.json` - All site content (name, bio, projects, certifications, tech stack)
- `src/lib/utils.ts` - Contains `cn()` helper for merging Tailwind classes

**Content Management:** Site content is driven entirely by `src/data/personal.json`. To update any displayed information, modify this file.

**UI Components:** Use shadcn/ui patterns - components use `cva` for variants, `cn()` for class merging, and Radix primitives for accessibility. Custom variants include `cyan` and `purple` button styles.

**Styling:** Tailwind CSS with CSS variables for theming. Custom colors defined in `tailwind.config.js` include `cyan` and `purple` accent colors. Animations defined include `aurora`, `fade-in`, `scale-in`, and `shimmer`.

## Deployment

Configured for Vercel with settings in `vercel.json`. Build command: `pnpm build`, output directory: `dist`.
