# Contributing to the Trusti Design System

## Overview

The system is split across two repos that must sit side by side on your machine:

```
~/                          ← or any parent folder you choose
├── Design-system/          ← component source (vic-rep/Design-system)
└── real-ui/
    └── trusti-ds/          ← preview app (vic-rep/ds)
```

The preview app imports components directly from `Design-system/src` via a path alias. The folder names and the sibling relationship **must match** — otherwise the preview won't start.

---

## Prerequisites

- **Node.js 20+** — install via [Homebrew](https://brew.sh): `brew install node@20`
- **Git**
- **GitHub account** — ask Victor to be added as a collaborator on both repos

---

## 1. Clone both repos

```bash
# Clone the component source
git clone https://github.com/vic-rep/Design-system.git

# Clone the preview app (into real-ui/ so the relative path works)
mkdir real-ui && cd real-ui
git clone https://github.com/vic-rep/ds.git trusti-ds
cd ..
```

Your folder structure should now look exactly like the diagram at the top.

---

## 2. Install dependencies

The preview app is the only project with its own `node_modules`. The Design-system repo has no build step — its source is consumed directly.

```bash
cd real-ui/trusti-ds
npm install
```

---

## 3. Start the preview app

```bash
cd real-ui/trusti-ds
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Any change you save in either repo hot-reloads instantly.

---

## 4. Making changes

### Always work on a branch — never commit directly to `main`

```bash
# In whichever repo you're changing (or both)
git checkout -b feat/your-feature-name
```

Branch naming convention:
- `feat/` — new component or feature
- `fix/` — bug or visual correction
- `chore/` — registry entry, docs, copy changes

### Typical workflows

| Task | Which repo |
|---|---|
| Add or modify a component | `Design-system` |
| Add a new registry entry or variant | `trusti-ds` |
| Fix a CSS or layout issue | whichever repo owns the file |
| Update component notes or props table | `trusti-ds/src/registry/index.ts` |

---

## 5. Committing

Write short, descriptive commit messages:

```bash
git add src/components/templates/MyComponent/index.tsx
git commit -m "feat(MyComponent): add dark variant"
```

---

## 6. Opening a Pull Request

```bash
git push origin feat/your-feature-name
```

Then go to the repo on GitHub and open a Pull Request against `main`. Fill in:
- **What changed** — one or two sentences
- **Screenshots or preview URL** — required for visual changes
- **Which Figma node** — link the frame if you're implementing a design

PRs are **not merged without review**. Tag **@victorstoyanov** as reviewer. Do not click "Merge" yourself.

---

## 7. After your PR is merged

Pull the latest `main` before starting your next branch:

```bash
git checkout main
git pull origin main
```

---

## Questions

Ping Victor on Slack or leave a comment directly on the PR.
