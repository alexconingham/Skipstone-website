# Skipstone Studio — Claude Code Instructions

## UI/UX Skill (REQUIRED)

The `ui-ux-pro-max` skill is installed globally and **must be invoked for every UI task** — no exceptions.

**Trigger it whenever the task involves:**
- Designing or modifying any page or layout
- Creating or refactoring components (buttons, modals, cards, navbars, forms, etc.)
- Choosing colors, typography, spacing, or animation
- Reviewing UI code for quality, accessibility, or visual consistency
- Any change that affects how something looks, feels, moves, or is interacted with

Use `/ui-ux-pro-max` to invoke the skill before implementing UI changes.

## Visual Style

This site uses a dark, atmospheric aesthetic. Preserve and respect:
- Grain overlay + particle effects
- Animated dividers
- Glass-morphism cards
- Scroll progress indicator
- Glitch effects on video frames

## Stack

- Next.js 16, React 18, TypeScript, Tailwind CSS
- Supabase (DB/auth), Resend (email), Vercel Analytics + Speed Insights
- Deployed to Vercel

## Asset Pipeline

Run `npm run copy:backgrounds` before builds to copy background assets to public/. This runs automatically as `prebuild`.

## Nano Banana MCP

The nano banana MCP is available for use in this project.
