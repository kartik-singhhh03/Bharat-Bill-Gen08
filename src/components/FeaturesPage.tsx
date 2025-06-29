import React from 'react'
import { 
  Shield, 
  Wifi, 
  UserX, 
  Palette, 
  Share2, 
  FileText, 
  Calculator, 
  Smartphone, 
  Download, 
  Crown,
  Zap,
  Heart,
  Globe,
  Lock,
  Printer
} from 'lucide-react'

const FeaturesPage: React.FC = () => {
  const coreFeatures = [
    {
      icon: Calculator,
      title: "GST Compliance",
      description: "Automatic CGST/SGST/IGST calculations based on Place of Supply logic. Fully compliant with Indian GST regulations.",
      benefits: ["Automatic tax calculations", "Place of Supply detection", "HSN/SAC code support", "GST-compliant formatting"]
    },
    {
      icon: Wifi,
      title: "Offline Support",
      description: "Works completely offline once loaded. Generate invoices without internet connection using PWA technology.",
      benefits: ["No internet required", "PWA installation", "Local data storage", "Always accessible"]
    },
    {
      icon: UserX,
      title: "No Registration",
      description: "Start creating invoices immediately without any signup, login, or personal information required.",
      benefits: ["Instant access", "No personal data needed", "No email verification", "Privacy focused"]
    },
    {
      icon: Palette,
      title: "Professional Themes",
      description: "Choose from multiple invoice themes including Classic (free) and premium designs for professional appearance.",
      benefits: ["Classic theme (free)", "Modern theme (premium)", "Minimal theme (premium)", "Corporate theme (premium)"]
    },
    {
      icon: Share2,
      title: "WhatsApp Sharing",
      description: "Share invoices directly via WhatsApp with built-in referral messaging to grow your network.",
      benefits: ["Direct WhatsApp integration", "Referral messaging", "Easy client sharing", "Viral growth potential"]
    }
  ]

  const technicalFeatures = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Fully responsive design optimized for mobile devices, tablets, and desktops.",
      benefits: ["Touch-friendly interface", "Responsive layouts", "Mobile optimization", "Cross-device sync"]
    },
    {
      icon: Download,
      title: "PDF Export",
      description: "High-quality PDF generation using advanced libraries for professional invoice output.",
      benefits: ["Print-ready PDFs", "High resolution", "Professional formatting", "Universal compatibility"]
    },
    {
      icon: FileText,
      title: "Dynamic Invoice Creation",
      description: "Add unlimited items, customize details, and generate sequential invoice numbers automatically.",
      benefits: ["Unlimited line items", "Auto invoice numbering", "Custom notes", "Flexible formatting"]
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "100% client-side processing with no data transmission to servers. Your data stays on your device.",
      benefits: ["No server storage", "Local browser storage", "Complete privacy", "GDPR compliant"]
    }
  ]

  const premiumFeatures = [
    {
      icon: Crown,
      title: "Premium Themes",
      description: "Access to 3 additional professional invoice themes with modern designs and corporate styling.",
      price: "₹299/year"
    },
    {
      icon: Zap,
      title: "Remove Branding",
      description: "Remove 'Made with BharatBillGen' footer and add your own custom footer text.",
      price: "₹299/year"
    },
    {
      icon: Printer,
      title: "Digital Stamps",
      description: "Add digital stamps and watermarks to your invoices for enhanced authenticity.",
      price: "₹299/year"
    },
    {
      icon: Heart,
      title: "Priority Support",
      description: "Get priority email support and feature requests for your business needs.",
      price: "₹299/year"
    }
  ]

  const businessFeatures = [
    {
      icon: Globe,
      title: "White Label Solutions",
      description: "Get your own branded invoice application with custom domain and hosting.",
      price: "Starting ₹999"
    },
    {
      icon: Lock,
      title: "Custom Development",
      description: "Tailored features and integrations for enterprise clients and agencies.",
      price: "Custom Quote"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🚀 Features Overview
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover all the powerful features that make BharatBillGen the perfect invoice solution 
          for Indian businesses, freelancers, and MSMEs.
        </p>
      </div>

      {/* Core Features */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Core Features (Free)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, index) => (
            <div key={index} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Features */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Technical Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicalFeatures.map((feature, index) => (
            <div key={index} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Features */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Premium Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {premiumFeatures.map((feature, index) => (
            <div key={index} className="card border-2 border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                </div>
                <span className="premium-badge text-xs">{feature.price}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/themes" className="btn-primary px-8 py-3 text-lg">
            Unlock Premium Features
          </a>
        </div>
      </section>

      {/* Business Solutions */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Business Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businessFeatures.map((feature, index) => (
            <div key={index} className="card border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                </div>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">
                  {feature.price}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/white-label" className="btn-secondary px-8 py-3 text-lg mr-4">
            White Label Solutions
          </a>
          <a href="/contact" className="btn-primary px-8 py-3 text-lg">
            Contact for Custom Quote
          </a>
        </div>
      </section>

      {/* Comparison Table */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Feature Comparison
        </h2>
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                <th className="text-center py-4 px-4 font-semibold text-green-600">Free</th>
                <th className="text-center py-4 px-4 font-semibold text-yellow-600">Premium</th>
                <th className="text-center py-4 px-4 font-semibold text-purple-600">Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">GST Compliance</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">Offline Support</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">Basic Theme</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">Premium Themes</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">Remove Branding</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">Digital Stamps</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">Priority Support</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">Custom Domain</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-900 dark:text-white">White Label</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-gray-400">✗</td>
                <td className="py-3 px-4 text-center text-green-600">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Call to Action */}
      <section className="card bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-yellow-900 border-orange-200 dark:border-orange-800 text-center py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of Indian businesses already using BharatBillGen to create 
          professional GST-compliant invoices.
        </p>
        <div className="space-x-4">
          <a href="/" className="btn-primary px-8 py-3 text-lg">
            Start Creating Invoices
          </a>
          <a href="/guide" className="btn-secondary px-8 py-3 text-lg">
            View User Guide
          </a>
        </div>
      </section>
    </div>
  )
}

export default FeaturesPage