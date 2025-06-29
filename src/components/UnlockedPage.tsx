import React, { useEffect } from 'react'
import { Crown, Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const UnlockedPage: React.FC = () => {
  useEffect(() => {
    // Set premium status
    localStorage.setItem('pro_user', 'true')
  }, [])

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="card">
        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Crown className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎉 Welcome to Premium!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Your premium features have been unlocked successfully. You now have access to 
          all professional invoice themes and advanced features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Premium Themes Unlocked</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Branding Removed</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Digital Stamps Available</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Priority Support</span>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="btn-primary inline-flex items-center space-x-2 px-8 py-3"
          >
            <span>Start Creating Invoices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <div className="text-center">
            <Link
              to="/themes"
              className="text-orange-600 hover:text-orange-700 underline"
            >
              Explore Premium Themes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnlockedPage