# 🚀 GitHub Repository Setup Guide

Follow these steps to create the GitHub repository and add collaborators.

## Step 1: Initialize Git (if not already done)

```bash
cd "/Users/mahmoudkassem/Academics/Cursor Hackathon"
git init
git add .
git commit -m "Initial commit: VoucherFinder MVP with AI-powered discount suggestions"
```

## Step 2: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if you haven't (macOS)
brew install gh

# Login to GitHub
gh auth login

# Create repository
gh repo create VoucherFinder --public --source=. --remote=origin

# Push code
git push -u origin main
```

### Option B: Using GitHub Website

1. Go to https://github.com/new
2. Repository name: `VoucherFinder`
3. Description: "AI-powered discount code aggregator that finds codes from YouTube and coupon sites"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we have these)
6. Click "Create repository"

Then in terminal:
```bash
cd "/Users/mahmoudkassem/Academics/Cursor Hackathon"
git remote add origin https://github.com/YOUR_USERNAME/VoucherFinder.git
git branch -M main
git push -u origin main
```

## Step 3: Add Collaborators

### Option A: Using GitHub CLI

```bash
# Add collaborators with admin access
gh repo add-collaborator VoucherFinder shehabomar --permission admin
gh repo add-collaborator VoucherFinder alhussni-aa --permission admin
gh repo add-collaborator VoucherFinder FadyJohn10 --permission admin
```

### Option B: Using GitHub Website

1. Go to your repository: https://github.com/YOUR_USERNAME/VoucherFinder
2. Click "Settings" tab
3. Click "Collaborators" in left sidebar
4. Click "Add people"
5. Add each person:
   - `shehabomar`
   - `alhussni-aa`
   - `FadyJohn10`
6. Choose permission level: **Admin** (recommended) or **Write**

They will receive an email invitation to join the repository.

## Step 4: Verify Everything

```bash
# Check remote
git remote -v

# Check status
git status

# View collaborators (if using gh CLI)
gh repo view --web
```

## Quick One-Liner Setup

If you have GitHub CLI installed:

```bash
cd "/Users/mahmoudkassem/Academics/Cursor Hackathon" && \
git init && \
git add . && \
git commit -m "Initial commit: VoucherFinder MVP" && \
gh repo create VoucherFinder --public --source=. --remote=origin --push && \
gh repo add-collaborator VoucherFinder shehabomar --permission admin && \
gh repo add-collaborator VoucherFinder alhussni-aa --permission admin && \
gh repo add-collaborator VoucherFinder FadyJohn10 --permission admin
```

## What's Already Prepared

✅ `.gitignore` - Already exists (excludes node_modules, .env, etc.)
✅ `backend/.env.example` - Template for backend environment variables
✅ `frontend/.env.example` - Template for frontend environment variables
✅ All documentation files (README.md, SETUP_GUIDE.md, etc.)

## Important Notes

⚠️ **Before Pushing:**
- Make sure `backend/.env` is NOT committed (contains API keys)
- Check `.gitignore` includes `.env` (already done ✅)
- Remove any sensitive data from code

✅ **Safe to Commit:**
- All `.md` documentation files
- All source code files
- `.env.example` files (no real keys)
- Configuration files (package.json, tsconfig.json, etc.)

## Repository Description (for GitHub)

**Short description:**
```
AI-powered discount code aggregator - finds working codes from YouTube & coupon sites, plus smart AI suggestions
```

**Topics/Tags:**
```
discount-codes
coupon-aggregator
openai
youtube-scraper
flask
react
typescript
tailwindcss
web-scraping
hackathon
```

## README Badge (Optional)

After creating repo, add this to top of README.md:

```markdown
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/VoucherFinder?style=social)](https://github.com/YOUR_USERNAME/VoucherFinder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

## Troubleshooting

### "fatal: not a git repository"
```bash
cd "/Users/mahmoudkassem/Academics/Cursor Hackathon"
git init
```

### "gh: command not found"
```bash
brew install gh
gh auth login
```

### "Permission denied"
- Make sure you're logged into GitHub CLI: `gh auth login`
- Or check your SSH keys: `ssh -T git@github.com`

### Collaborators not receiving invites
- Check they have correct GitHub usernames
- They need to check their email and accept the invitation
- Check Settings → Collaborators in your repo

---

**Ready to create the repo? Run the commands above!** 🚀

