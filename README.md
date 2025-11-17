# 🏠 CryptoRent - Blockchain Property Rental Platform

A revolutionary property rental platform powered by blockchain technology, enabling seamless cryptocurrency payments between property owners and tenants.

## ✨ Features

- 🏠 **Property Management** - List and manage rental properties
- 💰 **Crypto Payments** - Accept Bitcoin, Ethereum, and major cryptocurrencies
- 🔒 **Smart Contracts** - Automated, secure rental agreements
- 👤 **User Dashboard** - Complete dashboard for tenants and landlords
- 🔍 **Advanced Search** - Filter properties by location, price, type
- 📊 **Analytics** - Real-time insights and reporting
- 📱 **Responsive Design** - Mobile-first modern UI
- 🌐 **Multi-Language** - Global accessibility

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (production ready for PostgreSQL)
- **Blockchain**: Ethereum, Bitcoin, USDC, USDT support
- **AI**: z-ai-web-dev-sdk for smart contracts and receipts
- **Authentication**: NextAuth.js ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cryptorent.git
   cd cryptorent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Setup database**
   ```bash
   npm run db:push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── properties/    # Property management
│   │   ├── transactions/  # Transaction handling
│   │   ├── bookings/      # Booking management
│   │   ├── users/         # User management
│   │   └── receipts/     # Receipt generation
│   ├── dashboard/         # User dashboard
│   ├── properties/        # Property listings
│   ├── wallet/           # Wallet connection
│   └── transactions/     # Transaction history
├── components/           # Reusable UI components
│   └── ui/             # shadcn/ui components
├── lib/                 # Utility functions
│   └── db.ts           # Database connection
└── hooks/               # Custom React hooks
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Prisma Studio

## 🌍 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

## 🔐 Environment Variables

Create `.env.local` with:

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Blockchain (Optional)
ETHEREUM_RPC_URL="your-ethereum-rpc-url"
INFURA_PROJECT_ID="your-infura-id"

# AI Services
ZAI_API_KEY="your-zai-api-key"
```

## 📱 Features Overview

### For Tenants
- Browse properties with advanced filters
- Secure crypto payments with escrow protection
- Transaction history and receipts
- Smart contract rental agreements

### For Landlords
- List and manage properties
- Receive crypto payments instantly
- Track bookings and revenue
- Automated rental agreements

### Platform Features
- KYC verification integration
- Dynamic pricing optimization
- Token-based reward system
- Multi-currency support
- Real-time notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help, please:

1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/yourusername/cryptorent/issues)
3. Create a new issue if needed

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/cryptorent&type=Date)](https://star-history.com/#yourusername/cryptorent&Date)

---

**Built with ❤️ using Next.js, TypeScript, and Blockchain Technology**