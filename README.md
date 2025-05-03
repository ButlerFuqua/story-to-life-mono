# 🧠 story-to-life-mono

A monorepo for an AI-powered app that ingests a story (short or long) and transforms it into a text-based adventure game. This project is designed to be modular, scalable, and a template for future infrastructure-as-code full-stack apps.

---

## 🚀 Tech Stack

- **Monorepo:** `pnpm workspaces`
- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend:** Planned: Express + Prisma + OpenAI integration
- **Database:** Supabase (PostgreSQL)
- **Infrastructure (planned):** Terraform on GCP (Firebase Auth, Cloud Run, Secret Manager)
- **CI/CD (planned):** GitHub Actions

---

## 📁 Directory Structure

story-to-life-mono/
├── apps/
│ ├── web/ # Next.js frontend (working)
│ └── parser-api/ # Express + Prisma backend (placeholder)
├── packages/
│ └── shared/ # Shared types, utils (planned)
├── infra/ # Terraform modules (planned)
├── .github/workflows/ # CI/CD pipelines (planned)


---

## 🧰 Setup Instructions

### Prerequisites

- Node.js (LTS)
- `pnpm` (install via `npm install -g pnpm`)
- Git

### Clone and Start Dev
```bash
cd story-to-life-mono
pnpm install
pnpm --filter web dev
