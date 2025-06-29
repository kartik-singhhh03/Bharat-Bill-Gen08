import React from 'react'
import { HelpCircle, Book, Mail, MessageSquare, Shield, Zap, FileText, Users } from 'lucide-react'

const SupportPage: React.FC = () => {
  const faqs = [
    {
      question: "Is my data safe and secure?",
      answer: "Yes, absolutely! BharatBillGen works completely offline and doesn't send any data to our servers. All your information stays on your device and is stored locally in your browser. We don't collect, store, or transmit any personal or business data."
    },
    {
      question: "Do I need to create an account?",
      answer: "No registration required! You can start creating invoices immediately without providing any personal information. Just open the app and begin generating professional invoices right away."
    },
    {
      question: "Are the invoices GST compliant?",
      answer: "Yes, our invoices follow Indian GST regulations and automatically calculate CGST/SGST for intra-state transactions and IGST for inter-state transactions based on Place of Supply logic. The invoices include all required GST fields and formatting."
    },
    {
      question: "Can I use this app offline?",
      answer: "Yes! BharatBillGen is a Progressive Web App (PWA) that works completely offline once loaded. You can install it on your phone or computer for easy access without an internet connection."
    },
    {
      question: "What file formats are supported for export?",
      answer: "Currently, we support PDF export which is the most widely accepted format for invoices. The PDFs are high-quality, print-ready, and can be easily shared via email or WhatsApp."
    },
    {
      question: "Can I customize the invoice design?",
      answer: "Yes! We offer multiple themes including a free Classic theme and premium themes (Modern, Minimal, Corporate) for Pro users. You can also add your company logo, custom notes, and with Premium, remove our branding."
    },
    {
      question: "How do I add my company logo?",
      answer: "Click the 'Upload Logo' button in the business details section. Your logo will be stored locally in your browser as base64 data and will appear on all your invoices. Supported formats include JPG, PNG, and SVG."
    },
    {
      question: "What's the difference between GST and Non-GST invoices?",
      answer: "GST invoices include tax calculations (CGST/SGST/IGST), GSTIN fields, HSN/SAC codes, and Place of Supply. Non-GST invoices are simpler without tax calculations, perfect for businesses below GST threshold or for non-taxable services."
    },
    {
      question: "How does the Place of Supply logic work?",
      answer: "The app automatically determines if it's an intra-state (same state) or inter-state transaction. For intra-state, it splits tax into CGST + SGST. For inter-state, it applies IGST. This is based on comparing your business state with the client's state."
    },
    {
      question: "Can I edit invoice numbers?",
      answer: "Yes, invoice numbers are fully editable. The app auto-generates sequential numbers like INV-2025-001, but you can change them to match your existing numbering system or business requirements."
    },
    {
      question: "What happens if I clear my browser data?",
      answer: "Since all data is stored locally, clearing your browser data will remove all saved information including company details, client information, and invoice history. We recommend downloading important invoices as PDFs for backup."
    },
    {
      question: "How do I get Premium features?",
      answer: "Click 'Unlock Pro' in the header to access premium features for ₹299/year. This includes additional themes, branding removal, digital stamps, and priority support. Payment is processed securely through Stripe."
    }
  ]

  const supportCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn how to create your first invoice",
      link: "/guide"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Understand how we protect your data",
      link: "#privacy"
    },
    {
      icon: Zap,
      title: "Premium Features",
      description: "Explore advanced functionality",
      link: "/themes"
    },
    {
      icon: Users,
      title: "White Label",
      description: "Custom solutions for businesses",
      link: "/white-label"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🆘 Support Center
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find answers to common questions, get help with features, and learn how to make the most of BharatBillGen.
        </p>
      </div>

      {/* Quick Help Categories */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Quick Help
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportCategories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-md transition-all"
            >
              <category.icon className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Need More Help?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Get personalized help from our support team. We typically respond within 24 hours.
              </p>
              <a
                href="mailto:contactsweatandcode@gmail.com"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Support</span>
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MessageSquare className="w-6 h-6 text-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Send Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Share your thoughts, report bugs, or suggest new features to help us improve.
              </p>
              <a
                href="/contact"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Give Feedback</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Security */}
      <div id="privacy" className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Privacy & Security
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">100% Client-Side</h3>
              <p className="text-gray-600 dark:text-gray-300">
                All processing happens in your browser. No data is ever sent to our servers.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Local Storage Only</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is stored locally in your browser using localStorage. You have full control.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">No Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We don't use cookies, analytics, or any tracking mechanisms. Your privacy is protected.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Offline Capable</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Works completely offline once loaded. No internet connection required for invoice generation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Troubleshooting
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">PDF Download Issues</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              <li>Ensure your browser allows downloads</li>
              <li>Try using Chrome or Firefox for best compatibility</li>
              <li>Check if popup blockers are preventing the download</li>
              <li>Clear browser cache and try again</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Logo Upload Problems</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              <li>Use JPG, PNG, or SVG formats only</li>
              <li>Keep file size under 2MB for best performance</li>
              <li>Ensure the image is not corrupted</li>
              <li>Try refreshing the page and uploading again</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Not Saving</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              <li>Check if localStorage is enabled in your browser</li>
              <li>Ensure you're not in incognito/private mode</li>
              <li>Clear browser data and start fresh if needed</li>
              <li>Try a different browser if issues persist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage