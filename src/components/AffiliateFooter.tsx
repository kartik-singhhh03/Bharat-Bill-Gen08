import React from 'react'
import { ExternalLink, Heart, Linkedin, User } from 'lucide-react'
import { Link } from 'react-router-dom'

interface AffiliateFooterProps {
  isPremium: boolean
}

const AffiliateFooter: React.FC<AffiliateFooterProps> = ({ isPremium }) => {
  const affiliateLinks = [
    {
      name: 'Zoho Books',
      description: 'Complete accounting software',
      url: 'https://zoho.com/books',
      offer: '30% off first year'
    },
    {
      name: 'Razorpay',
      description: 'Payment gateway for businesses',
      url: 'https://razorpay.com',
      offer: 'Zero setup fee'
    },
    {
      name: 'VakilSearch',
      description: 'Legal & compliance services',
      url: 'https://vakilsearch.com',
      offer: '10% off GST registration'
    }
  ]

  const handleReferralShare = () => {
    const message = encodeURIComponent(
      "Check out this free GST invoice generator for Indian businesses! 🇮🇳\n\n" +
      "✅ GST compliant invoices\n" +
      "✅ Works offline\n" +
      "✅ No registration needed\n" +
      "✅ Professional templates\n\n" +
      "https://bharatbillgen.vercel.app"
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors">
      {/* Affiliate Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              📌 Need GST Help? Get 10% off with our partners
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Trusted by thousands of Indian businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {affiliateLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{link.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{link.description}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{link.offer}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-orange-50 dark:bg-orange-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            💡 Liked this tool? Share with your business friends!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Help other entrepreneurs discover this free GST invoice generator
          </p>
          <button
            onClick={handleReferralShare}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Share via WhatsApp</span>
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Founder Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Built by Kartik Singh</h3>
                <p className="text-gray-600 dark:text-gray-300">Founder & Developer</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
              Passionate about empowering Indian businesses with free, accessible tools. 
              BharatBillGen was created to help MSMEs and freelancers generate professional 
              GST-compliant invoices without any barriers.
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <a
                href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
              <a
                href="mailto:contactsweatandcode@gmail.com"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">BharatBillGen</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Free, offline GST invoice generator for Indian businesses. Create professional 
              invoices without registration or data sharing. Built with ❤️ by Kartik Singh.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:contactsweatandcode@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Support
              </a>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Contact
              </Link>
              <a 
                href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Features</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><Link to="/features" className="hover:text-gray-900 dark:hover:text-white">GST Compliance</Link></li>
              <li><Link to="/features" className="hover:text-gray-900 dark:hover:text-white">Offline Support</Link></li>
              <li><Link to="/features" className="hover:text-gray-900 dark:hover:text-white">No Registration</Link></li>
              <li><Link to="/themes" className="hover:text-gray-900 dark:hover:text-white">Professional Themes</Link></li>
              <li><Link to="/features" className="hover:text-gray-900 dark:hover:text-white">WhatsApp Sharing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><Link to="/guide" className="hover:text-gray-900 dark:hover:text-white">User Guide</Link></li>
              <li><Link to="/themes" className="hover:text-gray-900 dark:hover:text-white">Themes</Link></li>
              <li><Link to="/white-label" className="hover:text-gray-900 dark:hover:text-white">White Label</Link></li>
              <li><Link to="/support" className="hover:text-gray-900 dark:hover:text-white">Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
          <p>
            © 2025 BharatBillGen. Made with ❤️ for Indian businesses by{' '}
            <a 
              href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 dark:text-orange-400 hover:underline font-medium"
            >
              Kartik Singh
            </a>
            {!isPremium && (
              <span className="block mt-2 text-sm">
                Powered by BharatBillGen - Free GST Invoice Generator
              </span>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default AffiliateFooter