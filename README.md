# 🎉 VoucherFinder - AI-Powered Discount Code Aggregator

A modern web application that finds working discount codes from multiple sources (YouTube, coupon sites) and provides AI-powered saving strategies that go beyond traditional coupon codes.

## 🌟 Key Features

### 1. **Multi-Source Code Aggregation**
- 🎥 **YouTube Integration**: Scrapes discount codes from video descriptions
- 🏪 **Coupon Sites**: Aggregates codes from RetailMeNot, CouponDB, and more
- 📊 **Source Attribution**: Credits creators ethically (unlike Honey)

### 2. **AI-Powered Smart Suggestions** ⭐
- 🤖 Uses OpenAI GPT to suggest alternative discount strategies
- 💡 Discovers non-obvious ways to save (free trials, student discounts, account stacking)
- ✅ Community-verified suggestions with confidence scores
- 🔒 Safety-validated to ensure only legal, ethical strategies

### 3. **Beautiful Modern UI**
- 🎨 Built with React, TypeScript, and Tailwind CSS
- 🌓 Dark mode support
- 📱 Fully responsive design
- ⚡ Fast, smooth animations

### 4. **Verification System**
- ✓ Verified/Unverified/Expired status for each code
- 👥 Track usage counts and user verifications
- 📈 Confidence scores for AI suggestions

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ 
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Add your API keys to `.env`:**
```env
YOUTUBE_API_KEY=your_youtube_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
FLASK_ENV=development
DATABASE_URL=sqlite:///codes.db
FLASK_PORT=5000
```

**Getting API Keys:**
- **YouTube API**: Get from [Google Cloud Console](https://console.cloud.google.com) (free tier: 10k queries/day)
- **OpenAI API**: Get from [platform.openai.com](https://platform.openai.com)

5. **Run the backend:**
```bash
python app.py
```

Backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 📖 Usage

1. **Search for a brand**: Enter any brand name (e.g., "Amazon Prime", "NordVPN", "Spotify")

2. **View AI Suggestions**: See smart alternative saving strategies at the top of results

3. **Browse Discount Codes**: Scroll down to see traditional coupon codes from multiple sources

4. **Copy Codes**: Click "Copy Code" to copy to clipboard

5. **Verify Suggestions**: Click "This Worked!" to help others by verifying AI suggestions

## 🏗️ Architecture

```
voucher-scraper/
├── backend/                  # Flask API
│   ├── app.py               # Main Flask application
│   ├── config.py            # Configuration settings
│   ├── requirements.txt     # Python dependencies
│   ├── models/              # Database models
│   │   ├── code.py         # Discount code model
│   │   └── suggestion.py   # AI suggestion model
│   ├── scrapers/           # Web scraping modules
│   │   ├── youtube_scraper.py
│   │   ├── coupon_scraper.py
│   │   └── code_extractor.py
│   ├── ai/                 # AI suggestion engine
│   │   ├── suggester.py    # OpenAI integration
│   │   └── validator.py    # Safety validation
│   └── routes/             # API endpoints
│       ├── search.py       # Code search
│       ├── scrape.py       # Scraping trigger
│       └── suggestions.py  # AI suggestions
│
└── frontend/               # React application
    ├── src/
    │   ├── components/     # React components
    │   │   ├── SearchBar.tsx
    │   │   ├── CodeCard.tsx
    │   │   ├── AISuggestionsCard.tsx
    │   │   ├── CodeGrid.tsx
    │   │   ├── LoadingSkeletons.tsx
    │   │   └── EmptyState.tsx
    │   ├── services/       # API integration
    │   │   └── api.ts
    │   ├── types/          # TypeScript types
    │   │   └── index.ts
    │   ├── App.tsx         # Main app component
    │   └── index.css       # Tailwind styles
    └── package.json
```

## 🔌 API Endpoints

### Search Codes
```
GET /api/codes/search?brand=<brand_name>
```
Returns existing codes from database.

### Scrape New Codes
```
GET /api/scrape?brand=<brand_name>
```
Triggers scraping from YouTube and coupon sites.

### Get AI Suggestions
```
GET /api/suggestions?brand=<brand_name>
```
Returns AI-powered discount strategies.

### Track Code Copy
```
POST /api/codes/copy
Body: { "code_id": 123 }
```
Tracks when users copy a code.

### Verify Suggestion
```
POST /api/suggestions/verify
Body: { "suggestion_id": 456, "worked": true }
```
Records user verification of AI suggestions.

## 💾 Database Schema

### `codes` Table
- `id`: Primary key
- `brand`: Brand name
- `code`: Discount code (unique)
- `discount_percentage`: Discount %
- `discount_description`: Description
- `source`: Source (YouTube, RetailMeNot, etc.)
- `source_url`: Link to source
- `source_creator`: Creator name
- `status`: verified/unverified/expired
- `date_found`: When discovered
- `uses_count`: Number of times copied

### `ai_suggestions` Table
- `id`: Primary key
- `brand`: Brand name
- `suggestion_type`: Type of suggestion
- `title`: Suggestion title
- `description`: How it works
- `estimated_savings`: $ amount saved
- `conditions`: Requirements
- `pro_tip`: Additional advice
- `confidence_score`: 0-100 score
- `verification_count`: User verifications
- `risk_level`: safe/medium/high

## 🎯 MVP Demo Highlights

### For Judges:

1. **Value Proposition**: 
   - Finds codes faster than Honey/RetailMeNot
   - AI suggests alternatives traditional tools miss
   - Credits creators ethically

2. **Technical Innovation**:
   - Multi-source aggregation (YouTube is underserved)
   - AI-powered alternative strategies
   - Community verification system

3. **Market Opportunity**:
   - $2.2B coupon industry
   - Honey sold for $4B
   - Differentiation: Ethics + AI suggestions

4. **Revenue Model**:
   - Affiliate commissions (0.5-10% per purchase)
   - Premium subscriptions ($4.99-9.99/month)
   - B2B analytics for brands

## 🚀 Deployment

### Local Demo (Recommended for Hackathon)
1. Run backend: `python backend/app.py`
2. Run frontend: `cd frontend && npm run dev`
3. Use ngrok for sharing: `ngrok http 3000`

### Production Deployment
- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Railway or Heroku
- **Database**: Use PostgreSQL for production

## 🔧 Development

### Run Tests
```bash
# Backend
cd backend
python -m pytest

# Frontend
cd frontend
npm test
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build
```

## 📝 Environment Variables

### Backend `.env`
```env
YOUTUBE_API_KEY=your_key
OPENAI_API_KEY=your_key
FLASK_ENV=development
DATABASE_URL=sqlite:///codes.db
FLASK_PORT=5000
```

## 🤝 Contributing

This is a hackathon MVP. Contributions welcome!

## 📄 License

MIT License

## 🎓 Hackathon Context

**Built for**: 7-hour MVP Hackathon  
**Goal**: Demonstrate core value proposition with working prototype  
**Status**: ✅ MVP Complete

## 🌟 Future Enhancements

- [ ] Browser extension (Chrome/Firefox)
- [ ] Code validation (actually test codes)
- [ ] Reddit/Twitter scraping
- [ ] Email alerts for new codes
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Influencer partnership program

## 📧 Contact

Built with ❤️ for the hackathon

---

**One-Liner Pitch**: 
"We scrape discount codes from YouTube, influencers, and coupon sites - PLUS AI suggests smarter strategies like free trials and account stacking - finding better savings faster than Honey, ethically crediting creators."

