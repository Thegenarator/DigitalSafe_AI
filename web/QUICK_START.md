# DigiSafe AI - Quick Start Guide

## 🚀 Running the Application

### Development Mode (Recommended)
```bash
cd web
npm run dev
```
Visit: **http://localhost:3000**

### Production Build
```bash
cd web
npm run build
npm start
```

## 🔧 Setup Requirements

### 1. Environment Variables
Create `web/.env.local`:
```
OPENAI_API_KEY=sk-your-key-here
```

**Note:** The app works without an API key, but will use rule-based fallbacks instead of AI-generated recommendations.

### 2. Dependencies
All dependencies are already installed. If you need to reinstall:
```bash
cd web
npm install
```

## 🎨 Styling

The app uses **Tailwind CSS v3** with custom:
- Brand colors (purple/blue palette)
- Ink colors (gray scale)
- Safety colors (green/yellow/red for risk levels)
- Custom fonts (Space Grotesk for headings, Inter for body)

## 📱 Features

1. **Homepage** (`/`) - Landing page with project overview
2. **Quiz** (`/quiz`) - 12-question adaptive safety assessment
3. **Results** - Personalized safety score, vulnerabilities, and action plan
4. **History** - Browser-stored assessment history (localStorage)

## 🐛 Troubleshooting

### Styling Not Working?
1. Stop the dev server (Ctrl+C)
2. Delete `.next` folder: `rm -rf .next` (or `rd /s /q .next` on Windows)
3. Restart: `npm run dev`

### Build Errors?
- Ensure you're in the `web` directory
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (should be 18+)

### API Errors?
- Check `.env.local` has `OPENAI_API_KEY` set
- The app will fallback to rule-based recommendations if API is unavailable

## 📂 Project Structure

```
web/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── data/            # Questions, personas
│   ├── lib/             # Utilities, scoring, AI prompts
│   └── store/           # Zustand state management
├── public/              # Static assets
└── .env.local           # Environment variables (create this)

```

## 🎯 Testing the App

1. Visit http://localhost:3000
2. Click "Start my safety scan"
3. Answer all 12 questions
4. View your personalized Digital Safety Score
5. Review vulnerabilities and safety plan
6. Check off items in the Safety Boost checklist

## 📝 Next Steps

- Add your OpenAI API key for AI-powered recommendations
- Customize questions in `src/data/questions.ts`
- Adjust personas in `src/data/personas.ts`
- Deploy to Vercel for production

