# BharatBillGen - GST Invoice Generator
live link =>  https://bharat-bill-generator.vercel.app/

A comprehensive, client-side GST invoice generator designed specifically for Indian businesses, freelancers, and MSMEs. Create professional, GST-compliant invoices without any backend, registration, or data sharing..

## 🚀 Features

### Core Functionality
- **GST Compliance**: Automatic CGST/SGST/IGST calculations based on Place of Supply logic
- **Global Support**: International invoice generator with multi-currency support
- **Dual Mode**: Toggle between GST and Non-GST invoice modes
- **Auto Invoice Numbers**: Generate sequential invoice numbers (e.g., INV-2025-001)
- **Company Branding**: Upload and store company logos locally (base64)
- **Dynamic Items**: Add unlimited line items with HSN/SAC codes, quantities, rates, and tax percentages
- **Real-time Preview**: Live invoice preview with professional formatting
- **PDF Export**: One-click PDF generation using jsPDF and html2canvas
- **WhatsApp Sharing**: Direct sharing via WhatsApp with referral messaging

### Premium Features 🔓
- **Professional Themes**: 8 additional premium themes (Modern, Minimal, Corporate, etc.)
- **White Label**: Remove "Made with BharatBillGen" branding
- **Digital Stamps**: Add digital stamps and watermarks
- **Custom Footer**: Editable footer and watermark options
- **Priority Support**: Email support for premium users

### International Features 🌍
- **Multi-Currency**: Support for 30+ currencies (USD, EUR, GBP, etc.)
- **Country-Specific**: Templates for US, UK, Canada, Australia, Germany, and more
- **Tax Systems**: VAT, GST, Sales Tax calculations based on country
- **Auto-Detection**: Automatically detects user location and suggests appropriate region

### Technical Features
- **100% Client-Side**: No backend, no data transmission
- **Offline PWA**: Works completely offline once loaded
- **Mobile-First**: Responsive design optimized for mobile devices
- **Local Storage**: All data stored locally in browser
- **No Registration**: Start creating invoices immediately
- **Multi-Language**: Support for Hindi, Marathi, Tamil, Gujarati, Bengali

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **PDF Generation**: jsPDF + html2canvas
- **PWA**: Vite PWA Plugin
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📱 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/bharat-bill-gen.git
cd bharat-bill-gen

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
No environment variables required - the app runs entirely client-side.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy with default settings
3. The app will be available at your Vercel domain

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist/ folder to any static hosting service
```

### PWA Installation
Users can install the app on their devices:
- **Mobile**: "Add to Home Screen" option in browser
- **Desktop**: Install button in address bar

## 📊 Usage Guide

### Basic Invoice Creation
1. **Choose Region**: Select India (GST) or International based on your needs
2. **Business Details**: Enter company information and upload logo
3. **Client Information**: Add client details and select Place of Supply (for GST)
4. **Add Items**: Create line items with descriptions, quantities, rates, and tax
5. **Preview**: Review the invoice in real-time
6. **Export**: Download as PDF or share via WhatsApp

### GST Calculations (India)
- **Intra-State**: Automatically splits tax into CGST + SGST
- **Inter-State**: Applies IGST based on Place of Supply
- **Non-GST**: Simple invoice without tax calculations

### International Invoices
- **Multi-Currency**: Supports 30+ currencies with proper symbols
- **Country-Specific**: Templates optimized for different countries
- **Tax Systems**: VAT, GST, Sales Tax based on selected country
- **Professional**: International business standards

### Premium Features
- Unlock with one-time payment of ₹299/year
- Access via Stripe checkout or manual unlock code
- Features persist using localStorage

## 🎨 Customization

### Themes
- **Free Themes**: Classic, Modern Blue, Elegant Green
- **Premium Themes**: Luxury Gold, Corporate Navy, Creative Purple, Minimal Gray, Vibrant Orange, Professional Teal, Executive Black
- **Custom Builder**: Create your own templates (Premium)

### Branding
- Upload company logos (stored as base64)
- Custom footer text (Premium)
- Remove app branding (Premium)

## 💼 Monetization Strategy

### Revenue Streams
1. **Premium Subscriptions**: ₹299/year for advanced features
2. **Affiliate Commissions**: Partner referrals for business services
3. **Digital Products**: Template packs and design resources
4. **White Label**: Custom apps for agencies and businesses (₹999+)
5. **Referral Program**: Growth through WhatsApp sharing

### Conversion Funnel
1. **Free Users**: Core invoice generation
2. **Premium Upgrade**: Professional themes and branding removal
3. **Affiliate Clicks**: Business service referrals
4. **White Label**: Custom solutions for enterprises

## 🔒 Privacy & Security

- **No Data Collection**: Zero user data stored on servers
- **Local Storage Only**: All data remains in user's browser
- **No Registration**: No personal information required
- **Offline Capable**: Works without internet connection
- **GDPR Compliant**: No cookies or tracking

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2 seconds on 3G
- **PWA Ready**: Installable and offline-capable

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Free Support
- GitHub Issues for bug reports
- Community discussions

### Premium Support
- Email: contactsweatandcode@gmail.com
- Priority response for premium users
- Custom feature requests

### Business Inquiries
- White label solutions: contactsweatandcode@gmail.com
- Partnership opportunities
- Custom development

## 🗺 Roadmap

### Phase 2 (Q2 2025)
- [ ] Multi-language support (Hindi, Marathi, Tamil)
- [ ] Advanced reporting and analytics
- [ ] Client portal for invoice management
- [ ] Payment gateway integration
- [ ] Recurring invoice templates

### Phase 3 (Q3 2025)
- [ ] Mobile app (React Native)
- [ ] Advanced customization options
- [ ] Integration with accounting software
- [ ] Bulk invoice generation
- [ ] Advanced tax calculations

## 📊 Analytics & Metrics

### Key Performance Indicators
- Monthly Active Users (MAU)
- Premium Conversion Rate
- Affiliate Click-through Rate
- WhatsApp Referral Shares
- PWA Installation Rate

### Success Metrics
- 10,000+ monthly active users
- 5% premium conversion rate
- 15% affiliate click-through rate
- 25% referral share rate

## 🏆 Acknowledgments

- Indian GST regulations and compliance requirements
- React and Vite communities
- Tailwind CSS for styling framework
- jsPDF and html2canvas for PDF generation
- Lucide React for beautiful icons

## 👨‍💻 Creator

**Kartik Singh**
- LinkedIn: [Kartik Singh](https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D)
- Email: contactsweatandcode@gmail.com

---

**Made with ❤️ for Indian businesses and global entrepreneurs**

*BharatBillGen - Empowering MSMEs with professional invoicing*