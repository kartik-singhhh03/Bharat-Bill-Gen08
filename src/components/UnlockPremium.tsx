import React from 'react'
import { X, Crown, Check, Zap, Shield, FileText, Heart } from 'lucide-react'

interface UnlockPremiumProps {
  onClose: () => void
}

const UnlockPremium: React.FC<UnlockPremiumProps> = ({ onClose }) => {
  const features = [
    {
      icon: Zap,
      title: '3 Premium Themes',
      description: 'Modern, Minimal, and Corporate invoice designs'
    },
    {
      icon: Shield,
      title: 'Remove Branding',
      description: 'Remove "Made with BharatBillGen" footer'
    },
    {
      icon: FileText,
      title: 'Digital Stamps',
      description: 'Add digital stamps and watermarks'
    },
    {
      icon: Heart,
      title: 'Priority Support',
      description: 'Get help when you need it most'
    }
  ]

  const handleUpgrade = () => {
    // Show alert about demo payment
    alert('Demo Mode: This would redirect to Stripe payment. For demo purposes, use unlock code "PREMIUM2025" below.')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Unlock Premium</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">₹299/year</div>
            <p className="text-gray-600 dark:text-gray-300">Unlock all premium features</p>
          </div>

          <div className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleUpgrade}
              className="w-full btn-primary py-3 text-lg"
            >
              Upgrade Now (Demo)
            </button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Demo Mode: Use code "PREMIUM2025" to unlock features
              </p>
              <button
                onClick={() => {
                  const code = prompt('Enter unlock code:')
                  if (code === 'PREMIUM2025') {
                    localStorage.setItem('pro_user', 'true')
                    window.location.reload()
                  } else if (code) {
                    alert('Invalid code. Try "PREMIUM2025"')
                  }
                }}
                className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline"
              >
                Have an unlock code?
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-xl">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Check className="w-3 h-3 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="w-3 h-3 text-green-500" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center space-x-1">
              <Check className="w-3 h-3 text-green-500" />
              <span>No Subscription</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnlockPremium