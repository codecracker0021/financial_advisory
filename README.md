# CompliSense AI - Interactive Prototype

## 🎯 Overview

This is a fully functional static HTML prototype demonstrating CompliSense AI's core capabilities for AIA Singapore's financial advisory compliance platform. The prototype showcases real-time MoneySense guideline validation, AI-powered product recommendations, and intelligent supervisor workflows.

## 📱 Screens Included

### 1. **FHR Form with Real-Time Validation** (`index.html`)
**The Core Agent Experience**

- **Left Panel**: Complete Financial Health Review form with:
  - Client information (age, income, expenses, emergency fund, etc.)
  - Product recommendation details
  - Advisory justification text area
  - Progress tracking and form completion status

- **Right Panel**: Live CompliSense AI Dashboard showing:
  - MoneySense Compliance Score (0-100)
  - 6 real-time validation checks:
    - Insurance Spending (max 15% of income)
    - Death/TPD Coverage (9x annual income)
    - Critical Illness Coverage (4x annual income)
    - Emergency Fund (3-6 months expenses)
    - Retirement Savings (min 10% of income)
    - Life Stage Alignment
  - Specific suggestions for fixing compliance issues
  - MoneySense reference guide

**Demo Scenario**: Pre-filled with Tan Wei Ming (35 years old, 2 children) with intentional compliance issues showing score of 67/100.

**Try This**:
- Change monthly premium from 800 to 675 → Watch score improve
- Increase emergency fund from 8000 to 15000 → See validation turn green
- Modify any field → Instant real-time validation

---

### 2. **AI Copilot Chat Interface** (`copilot.html`)
**Conversational Compliance Assistant**

- Full-featured chat interface with AI assistant
- 4 predefined question templates for quick testing:
  - "Can I recommend ILP to a 68-year-old?"
  - "What is the max affordable premium for $4,500/month income?"
  - "How much emergency fund should my client have?"
  - "What critical illness coverage do I need for $60,000 annual income?"

- Each response includes:
  - Detailed AI answer with calculations
  - MoneySense guideline citations
  - Source references (AIA Advisory Manual, MoneySense guides)
  - Actionable recommendations

**Try This**:
- Click any suggestion chip to see instant AI response
- Type your own question about compliance or MoneySense rules
- Notice the "thinking" indicator animation before responses

---

### 3. **Product Recommendation Engine** (`products.html`)
**AI-Powered Product Matching**

- Client profile summary card with key metrics
- 3 AI-recommended products ranked by suitability:
  - **Best Match (94%)**: Family Protect Plus - $650/month
  - **Good Fit (87%)**: Prime Protect - $675/month
  - **Alternative (79%)**: Essential Term - $350/month

- Each product card shows:
  - Suitability match score with color-coded indicator
  - "Why CompliSense AI Recommends This" explanation
  - Complete feature list
  - MoneySense compliance checklist (✓/⚠️/✗)
  - Premium affordability breakdown
  - "Apply to FHR Form" button

- Comparison table showing side-by-side analysis

**Try This**:
- Click "Apply to FHR Form" to see product auto-fill simulation
- Compare compliance scores across products
- Review AI reasoning for each recommendation

---

### 4. **Supervisor Dashboard** (`supervisor.html`)
**Bulk Review & Risk Prioritization**

- Statistics overview:
  - 50 total proposals pending
  - 3 high-risk (urgent attention)
  - 12 medium-risk
  - 35 low-risk (ready for bulk approval)

- **High-Risk Proposals Section**:
  - Tan Wei Ming: 67/100 score, premium too high + emergency fund issues
  - Lim Siew Hong: 52/100 score, ILP not suitable for age 68
  - Kumar Rajesh: 61/100 score, sandwich generation risk

- Each proposal shows:
  - Risk indicator (red/yellow/green)
  - Client details and compliance score
  - AI recommendation (Approve/Reject/Request Revision)
  - Specific issues with explanations
  - Suggested supervisor actions

- **Bulk Approval Feature**: 35 low-risk proposals ready for one-click approval

**Try This**:
- Click "Review Details" to see detailed proposal review simulation
- Click "Approve All 35 Proposals" to see bulk action demo
- Observe AI confidence levels (68%-92%) and reasoning

---

## 🎨 Design System

### Color Palette (AIA-Branded)
```css
Primary Red: #C5193B (AIA brand color)
Background: #F5F5F5
Cards: #FFFFFF
Success: #10B981
Warning: #F59E0B
Error: #EF4444
```

### Typography
- Font: System sans-serif (Helvetica Neue, Segoe UI, Arial)
- Sizes: 12px - 48px scale
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components
- Cards with rounded corners (8-16px radius)
- Subtle shadows for depth
- Color-coded validation badges
- Touch-friendly buttons (min 44px height)
- Responsive grid layouts

---

## 📊 Demo Data & Scenarios

### Scenario 1: High Premium Issue (Default on index.html)
```
Client: Tan Wei Ming, 35 years, $4,500/month income
Issue: $800/month premium = 17.8% (exceeds 15% MoneySense limit)
Score: 67/100
Fix: Reduce premium to $675 or build emergency fund
```

### Scenario 2: Age-Inappropriate Product (supervisor.html)
```
Client: Lim Siew Hong, 68 years
Issue: Investment-Linked Policy not suitable for seniors (65+)
Score: 52/100
Recommendation: Reject, suggest RetireSecure Plus instead
```

### Scenario 3: Perfect Compliance
```
Client: Chen Wei Ling, 29 years
Premium: $550/month (13.75% of income) ✓
Emergency Fund: 5.6 months ✓
Coverage: 9.2x income ✓
Score: 98/100
```

---

## 🚀 How to Demo

### Quick Start (5-Minute Demo)
1. Open `index.html` - Show real-time validation
2. Change premium from 800 to 675 - Show instant compliance improvement
3. Click "Ask AI Copilot" - Show conversational AI
4. Click "View Product Alternatives" - Show product recommendations
5. Navigate to `supervisor.html` - Show supervisor efficiency

### Full Demo (15-Minute Walkthrough)
1. **Agent Workflow** (`index.html`):
   - Explain the problem: Manual compliance checks are slow and error-prone
   - Show real-time validation as agent types
   - Highlight specific MoneySense rule violations
   - Demonstrate actionable suggestions

2. **AI Assistant** (`copilot.html`):
   - Click "ILP for seniors?" question
   - Show AI response with citations
   - Explain how this saves agents 20% of their time

3. **Product Intelligence** (`products.html`):
   - Show 247 products → 3 best matches in seconds
   - Explain 94% suitability score calculation
   - Highlight MoneySense pre-validation

4. **Supervisor Scale** (`supervisor.html`):
   - Show 50 proposals → 3 high-risk prioritized
   - Demonstrate bulk approval (35 proposals in 2 seconds)
   - Explain 8.75 hours saved vs manual review

5. **Business Impact**:
   - Advisory review time: 2 days → 30 minutes
   - Compliance errors: ↓ 80%
   - Agent onboarding: ↓ 60%
   - Approval rate: ↑ from 65% to 90%

---

## 💡 Key Value Propositions to Highlight

### For Agents
- ✅ Real-time guidance prevents submission errors
- ✅ AI copilot answers compliance questions instantly
- ✅ Product recommendations pre-validated against MoneySense
- ✅ Less time on paperwork, more time with clients

### For Supervisors
- ✅ AI-prioritized queue (high/medium/low risk)
- ✅ Bulk approve 35 low-risk proposals in 2 seconds
- ✅ 8.75 hours saved per day on manual reviews
- ✅ Clear audit trails with AI reasoning

### For AIA Compliance
- ✅ Every recommendation validated against MoneySense guidelines
- ✅ Automated documentation of compliance checks
- ✅ Regulatory audit trails with version control
- ✅ Industry-leading compliance score (90%+ approval rate)

### For Customers
- ✅ Government-backed MoneySense standards enforced
- ✅ Clear suitability reports explaining "why this product"
- ✅ Confidence score showing recommendation strength
- ✅ Transparent pricing and affordability breakdowns

---

## 🔗 Navigation Flow

```
index.html (FHR Form)
├── Click "Ask AI Copilot" → copilot.html
├── Click "View Product Alternatives" → products.html
├── Click floating 🤖 button → copilot.html
└── Top nav "Supervisor" → supervisor.html

copilot.html (AI Chat)
├── Type questions → Get AI responses
└── Top nav "FHR Form" → index.html

products.html (Recommendations)
├── Click "Apply to FHR Form" → index.html (with data)
└── Click "Back to FHR Form" → index.html

supervisor.html (Dashboard)
├── Click "Review Details" → Detailed proposal view (simulated)
├── Click "Approve All 35" → Bulk approval confirmation
└── Top nav "FHR Form" → index.html
```

---

## 📱 iPad Optimization

- Viewport: 1024×768 (landscape) or 768×1024 (portrait)
- Touch-friendly: All buttons ≥44px tap targets
- Responsive: Two-column layout collapses to single column on smaller screens
- No hover states: Tap-based interactions only
- Fixed navigation: Sticky navbar for easy access

---

## 🛠 Technical Stack

- **HTML5**: Semantic markup, accessibility attributes
- **CSS3**: Custom properties (CSS variables), Grid, Flexbox
- **JavaScript**: Vanilla ES6+ (no frameworks)
- **Architecture**: Component-based CSS, modular validation engine

### File Structure
```
prototype/
├── index.html              # FHR Form + Live Validation
├── copilot.html            # AI Chat Interface
├── products.html           # Product Recommendations
├── supervisor.html         # Supervisor Dashboard
├── styles/
│   ├── aia-theme.css      # Color system, typography, base styles
│   └── components.css     # Reusable UI components
├── scripts/
│   └── validation.js      # MoneySense validation engine
└── README.md              # This file
```

---

## 🎯 Next Steps (If Approved)

1. **Client Suitability Report Generator** (PDF export)
2. **Analytics Dashboard** (compliance trends, agent performance)
3. **Mobile App Version** (iOS/Android)
4. **API Integration** (LeadMate, iPoS, MAS regulatory feeds)
5. **Multi-Language Support** (Mandarin, Malay, Tamil)

---

## 📞 Contact & Questions

For technical questions or demo support, refer to the main project README at:
`/Users/kartik/Documents/Work/Projects/Cursor_Projects/FinancialAdvisory/README.md`

---

**Last Updated**: December 15, 2025
**Prototype Version**: 1.0
**Created By**: Mahadevan Kartik with Claude Code
