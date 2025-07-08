import React, { useState } from 'react'
import { X, Download, Mail, Share2, Maximize2, Minimize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import EmailInvoice from './EmailInvoice'

const ResponsivePreviewModal = ({ 
  isOpen, 
  onClose, 
  children, 
  title = "Invoice Preview",
  invoice,
  onDownload,
  className = '' 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)

  if (!isOpen) return null

  const modalClasses = isFullscreen 
    ? "fixed inset-0 z-50" 
    : "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"

  const contentClasses = isFullscreen
    ? "w-full h-full bg-white dark:bg-gray-800"
    : "bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden"

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      >
        <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`${contentClasses} ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
              
              <div className="flex items-center space-x-2">
                {/* Action Buttons */}
                <button
                  onClick={onDownload}
                  className="btn-primary flex items-center space-x-1 text-sm px-3 py-2"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                
                <button
                  onClick={() => setShowEmailForm(!showEmailForm)}
                  className="btn-secondary flex items-center space-x-1 text-sm px-3 py-2"
                  title="Email Invoice"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Email</span>
                </button>
                
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Close (ESC)"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col lg:flex-row h-full">
              {/* Main Content */}
              <div className={`flex-1 overflow-auto ${showEmailForm ? 'lg:w-2/3' : 'w-full'}`}>
                <div className="p-4 lg:p-6">
                  {children}
                </div>
              </div>

              {/* Email Sidebar */}
              <AnimatePresence>
                {showEmailForm && (
                  <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                  >
                    <div className="p-4 lg:p-6 h-full overflow-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Email Invoice
                        </h3>
                        <button
                          onClick={() => setShowEmailForm(false)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors lg:hidden"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <EmailInvoice invoice={invoice} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Bottom Actions */}
            <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={onDownload}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2 py-3"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                
                <button
                  onClick={() => setShowEmailForm(!showEmailForm)}
                  className={`flex-1 btn-secondary flex items-center justify-center space-x-2 py-3 ${
                    showEmailForm ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ResponsivePreviewModal