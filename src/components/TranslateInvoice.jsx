import React, { useState } from 'react'
import { Languages, Download, Loader } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supportedLanguages, translationService } from '../utils/languageUtils'

const TranslateInvoice = ({ invoice, onTranslatedInvoice, className = '' }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('hi')
  const [isTranslating, setIsTranslating] = useState(false)
  const [translatedInvoice, setTranslatedInvoice] = useState(null)
  const [error, setError] = useState(null)

  const handleTranslate = async () => {
    if (!invoice || !selectedLanguage) return

    setIsTranslating(true)
    setError(null)

    try {
      const translated = await translationService.translateInvoiceFields(
        invoice,
        selectedLanguage
      )
      
      setTranslatedInvoice(translated)
      
      if (onTranslatedInvoice) {
        onTranslatedInvoice(translated, selectedLanguage)
      }
    } catch (err) {
      setError('Translation failed. Please try again.')
      console.error('Translation error:', err)
    } finally {
      setIsTranslating(false)
    }
  }

  const downloadTranslatedInvoice = () => {
    if (!translatedInvoice) return

    const dataStr = JSON.stringify(translatedInvoice, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `invoice_${selectedLanguage}_${translatedInvoice.number || 'translated'}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Languages className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          🌐 Translate Invoice
        </h3>
      </div>

      {/* Language Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Target Language:
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="input-field"
          disabled={isTranslating}
        >
          {supportedLanguages.filter(lang => lang.code !== 'en').map((language) => (
            <option key={language.code} value={language.code}>
              {language.nativeName} ({language.name})
            </option>
          ))}
        </select>
      </div>

      {/* Translate Button */}
      <motion.button
        onClick={handleTranslate}
        disabled={isTranslating || !invoice}
        className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isTranslating ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Translating...</span>
          </>
        ) : (
          <>
            <Languages className="w-5 h-5" />
            <span>Translate Invoice</span>
          </>
        )}
      </motion.button>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Translation Result */}
      <AnimatePresence>
        {translatedInvoice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">
                Translation Complete!
              </h4>
              
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Original:</p>
                    <p className="text-gray-600 dark:text-gray-400">{invoice.companyName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Translated:</p>
                    <p className="text-gray-600 dark:text-gray-400">{translatedInvoice.companyName}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={downloadTranslatedInvoice}
                  className="btn-secondary flex items-center space-x-1 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download JSON</span>
                </button>
              </div>
            </div>

            {/* Preview of translated fields */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Translation Preview:
              </h4>
              
              <div className="space-y-3 text-sm">
                {translatedInvoice.items && translatedInvoice.items.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Translated Items:
                    </p>
                    <div className="space-y-1">
                      {translatedInvoice.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded border">
                          <span className="text-gray-900 dark:text-white">
                            {item.description}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300">
                            ₹{item.rate?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                      ))}
                      {translatedInvoice.items.length > 3 && (
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          +{translatedInvoice.items.length - 3} more items...
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {translatedInvoice.notes && (
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Notes:</p>
                    <p className="text-gray-600 dark:text-gray-400">{translatedInvoice.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Translation Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Translation Features:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Translates company and client information</li>
          <li>• Converts item descriptions</li>
          <li>• Preserves numbers and formatting</li>
          <li>• Supports 9 Indian languages</li>
          <li>• Uses LibreTranslate API</li>
        </ul>
      </div>
    </div>
  )
}

export default TranslateInvoice