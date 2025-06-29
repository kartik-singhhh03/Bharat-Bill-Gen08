import React from 'react'
import { FileText, Users, Download, Share2, Crown, Shield, Zap, Heart, User, Linkedin } from 'lucide-react'

const Guide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          How to Use BharatBillGen
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Create professional GST-compliant invoices in minutes. No registration required, 
          works completely offline, and keeps your data secure.
        </p>
      </div>

      {/* About the Creator */}
      <div className="card bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              👋 Hi! I'm Kartik Singh, Creator of BharatBillGen
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I built this tool to help Indian businesses, freelancers, and MSMEs create professional 
              GST-compliant invoices without any barriers. As a developer passionate about empowering 
              small businesses, I wanted to create something that's completely free, works offline, 
              and doesn't require any registration or data sharing.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect with me on LinkedIn</span>
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="mailto:contactsweatandcode@gmail.com"
                className="text-orange-600 dark:text-orange-400 hover:underline"
              >
                Send feedback
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-orange-500" />
          Step-by-Step Instructions
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fill Business Information</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter your company details including name, address, GSTIN (for GST invoices), 
                phone, and email. Upload your company logo for a professional look.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Add Client Details</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fill in your client's information including name, address, GSTIN (if applicable), 
                and contact details. Select the Place of Supply for GST calculations.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Add Items & Calculate Tax</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Add your products or services with descriptions, HSN/SAC codes, quantities, 
                rates, and tax percentages. The app automatically calculates CGST/SGST/IGST 
                based on Place of Supply logic.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
              4
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Preview Your Invoice</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Click "Preview Invoice" to see how your invoice will look. Review all details 
                and make any necessary changes before downloading.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
              5
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Download & Share</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Click "Download PDF" to save your invoice. You can then share it via email, 
                WhatsApp, or any other method. The app also offers direct WhatsApp sharing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Benefits */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Crown className="w-6 h-6 mr-2 text-yellow-500" />
          Premium Benefits
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Professional Themes</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Access 8 additional premium invoice themes: Modern, Minimal, Corporate, and more designs.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Remove Branding</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Remove "Made with BharatBillGen" footer and add your own custom footer text.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Custom Template Builder</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Build your own invoice templates with custom fields and layouts.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Priority Support</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get direct support from Kartik and priority feature requests.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="btn-primary px-8 py-3 text-lg">
            Unlock Premium Features - ₹299/year
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Is my data safe?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, absolutely! BharatBillGen works completely offline and doesn't send any data 
              to our servers. All your information stays on your device and is stored locally 
              in your browser.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do I need to create an account?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No registration required! You can start creating invoices immediately without 
              providing any personal information.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Are the invoices GST compliant?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, our invoices follow Indian GST regulations and automatically calculate 
              CGST/SGST for intra-state transactions and IGST for inter-state transactions 
              based on Place of Supply.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I use this offline?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes! BharatBillGen is a Progressive Web App (PWA) that works completely offline 
              once loaded. You can install it on your phone or computer for easy access.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How can I contact the developer?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can reach out to Kartik Singh directly via{' '}
              <a href="mailto:contactsweatandcode@gmail.com" className="text-orange-600 dark:text-orange-400 hover:underline">
                email
              </a>{' '}
              or connect on{' '}
              <a 
                href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                LinkedIn
              </a>. 
              He personally responds to all feedback and feature requests!
            </p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Need Help?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Have questions or need assistance? Kartik is here to help!
            </p>
            <a
              href="mailto:contactsweatandcode@gmail.com"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>contactsweatandcode@gmail.com</span>
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Connect on LinkedIn</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Connect with Kartik for business discussions and networking.
            </p>
            <a
              href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>Kartik Singh</span>
            </a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Important Disclaimer
        </h2>
        <div className="space-y-3 text-blue-800 dark:text-blue-200">
          <p>
            • BharatBillGen is designed to help create GST-compliant invoices, but users are 
            responsible for ensuring compliance with current tax regulations.
          </p>
          <p>
            • All data is stored locally in your browser. Clear your browser data will remove 
            all saved information.
          </p>
          <p>
            • This tool is provided as-is for general invoicing purposes. For complex tax 
            scenarios, please consult with a qualified tax professional.
          </p>
          <p>
            • We recommend keeping backups of important invoices by downloading them as PDFs.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Guide