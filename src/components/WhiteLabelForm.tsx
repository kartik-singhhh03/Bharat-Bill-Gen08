import React, { useState } from 'react'
import { Building, Mail, User, Phone, Linkedin } from 'lucide-react'

const WhiteLabelForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: '',
    requirements: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create email template
    const emailBody = `
New White Label Inquiry:

Name: ${formData.name}
Email: ${formData.email}
Business: ${formData.businessName}
Phone: ${formData.phone}

Requirements:
${formData.requirements}
    `.trim()

    // Open email client
    const mailtoLink = `mailto:contactsweatandcode@gmail.com?subject=White Label Invoice App Inquiry&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your inquiry has been sent to Kartik Singh. He'll get back to you within 24 hours with 
            a custom quote and timeline for your white-label invoice application.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setSubmitted(false)}
              className="btn-secondary"
            >
              Submit Another Inquiry
            </button>
            <a
              href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          👨‍💼 Create Your Own Billing App
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get a custom-branded invoice application for your business. Kartik Singh will help you 
          host your own invoice site with your branding and domain.
        </p>
      </div>

      {/* About the Developer */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Meet Your Developer - Kartik Singh
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              As the creator of BharatBillGen, I understand the unique needs of Indian businesses. 
              I offer personalized white-label solutions that can be customized to match your brand 
              and specific requirements. Each project gets my personal attention and ongoing support.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Linkedin className="w-4 h-4" />
                <span>View LinkedIn Profile</span>
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="mailto:contactsweatandcode@gmail.com"
                className="text-orange-600 dark:text-orange-400 hover:underline"
              >
                Email directly
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Get Your Custom Quote
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Special Requirements
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                className="input-field"
                rows={4}
                placeholder="Tell Kartik about any specific features, integrations, or customizations you need..."
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 text-lg"
            >
              Send Inquiry to Kartik
            </button>
          </form>
        </div>

        {/* Features & Pricing */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              What You Get
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">Complete white-label invoice application</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">Your branding, colors, and logo</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">Custom domain setup</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">SSL certificate and hosting</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">Mobile app (PWA) installation</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">1 year of hosting included</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <span className="text-gray-600 dark:text-gray-300">Personal support from Kartik</span>
              </li>
            </ul>
          </div>

          <div className="card bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Starting at ₹999
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Complete setup and deployment of your custom invoice application by Kartik Singh. 
              Perfect for agencies, accountants, and businesses who want their own 
              branded solution with personal developer support.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              * Additional customizations and integrations available at extra cost
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Popular Add-ons
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Custom invoice templates - ₹299</li>
              <li>• Payment gateway integration - ₹499</li>
              <li>• Client portal - ₹799</li>
              <li>• Multi-language support - ₹399</li>
              <li>• Advanced reporting - ₹599</li>
              <li>• Ongoing maintenance (monthly) - ₹199</li>
            </ul>
          </div>

          <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Why Choose Kartik?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Creator of BharatBillGen with proven expertise</li>
              <li>• Personal attention to every project</li>
              <li>• Deep understanding of Indian business needs</li>
              <li>• Ongoing support and maintenance</li>
              <li>• Quick turnaround time (7-14 days)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhiteLabelForm