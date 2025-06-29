import React, { useState, useEffect } from 'react'
import { X, Share2, MessageCircle, Copy, Check, Heart, Sparkles, Linkedin } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  invoiceNumber: string
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, invoiceNumber }) => {
  const [copied, setCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [isOpen])

  const shareMessage = `Check out this amazing free GST invoice generator for Indian businesses! 🇮🇳

✅ GST compliant invoices
✅ Works offline  
✅ No registration needed
✅ Professional templates
✅ Created by Kartik Singh

https://bharatbillgen.vercel.app

#GST #Invoice #IndianBusiness #Free #BharatBillGen`

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(shareMessage)
    window.open(`https://wa.me/?text=${message}`, '_blank')
    onClose()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://bharatbillgen.vercel.app')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = 'https://bharatbillgen.vercel.app'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleLinkedInShare = () => {
    const linkedInMessage = encodeURIComponent(
      `Just discovered this amazing free GST invoice generator for Indian businesses! 🇮🇳\n\n` +
      `Created by Kartik Singh, it's completely free, works offline, and requires no registration.\n\n` +
      `Perfect for MSMEs and freelancers! Check it out: https://bharatbillgen.vercel.app\n\n` +
      `#GST #Invoice #IndianBusiness #MSME #Freelancer #BharatBillGen`
    )
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://bharatbillgen.vercel.app&summary=${linkedInMessage}`, '_blank')
    onClose()
  }

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
      return () => document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  // Handle click outside modal to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform animate-slide-up">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
            ))}
          </div>
        )}

        {/* Header with prominent close button */}
        <div className="relative p-6 text-center border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors group"
            title="Close (ESC)"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
          </button>
          
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Check className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            🎉 Invoice Generated!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Invoice {invoiceNumber} has been downloaded successfully
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Loved this tool?
              </span>
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Help other entrepreneurs discover this free GST invoice generator created by Kartik Singh!
            </p>
          </div>

          {/* Share Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleWhatsAppShare}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Share via WhatsApp</span>
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleLinkedInShare}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Linkedin className="w-5 h-5" />
              <span>Share on LinkedIn</span>
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">
              Why share BharatBillGen?
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Help fellow entrepreneurs save time</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Support Kartik's free tool for Indian businesses</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Spread awareness about GST compliance</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Connect with the developer on LinkedIn</span>
              </li>
            </ul>
          </div>

          {/* Developer Credit */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Made with ❤️ by{' '}
              <a
                href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Kartik Singh
              </a>
            </p>
          </div>
        </div>

        {/* Footer with Skip Option */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 py-2 text-sm transition-colors border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Skip for now (ESC)
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareModal