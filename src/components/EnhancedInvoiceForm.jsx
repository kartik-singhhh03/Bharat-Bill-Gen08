import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Upload, Mic, Camera, Globe, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import OCRUpload from './OCRUpload'
import VoiceInput from './VoiceInput'
import AIDescriptionGenerator from './AIDescriptionGenerator'
import CountrySelector from './CountrySelector'
import TranslateInvoice from './TranslateInvoice'
import { countries, detectUserCountry } from '../data/countries'
import { getCurrencyByCode } from '../data/currencies'
import { exchangeRateService } from '../utils/exchangeRates'

const EnhancedInvoiceForm = ({
  invoice,
  setInvoice,
  addItem,
  updateItem,
  removeItem,
  onPreview,
  isPremium,
  onUnlockPremium
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState('INR')
  const [showAIFeatures, setShowAIFeatures] = useState(false)
  const [activeItemId, setActiveItemId] = useState(null)
  const [exchangeRate, setExchangeRate] = useState(1)

  useEffect(() => {
    // Auto-detect country on mount
    const detectedCountry = detectUserCountry()
    setSelectedCountry(detectedCountry)
    setSelectedCurrency(detectedCountry.currency)
  }, [])

  useEffect(() => {
    // Update exchange rate when currency changes
    if (selectedCurrency !== 'INR') {
      updateExchangeRate()
    } else {
      setExchangeRate(1)
    }
  }, [selectedCurrency])

  const updateExchangeRate = async () => {
    try {
      const rate = await exchangeRateService.getConversionRate('INR', selectedCurrency)
      setExchangeRate(rate)
    } catch (error) {
      console.error('Failed to update exchange rate:', error)
    }
  }

  const handleOCRData = (ocrData) => {
    if (ocrData.items && ocrData.items.length > 0) {
      ocrData.items.forEach(item => {
        const newItem = {
          id: Date.now().toString() + Math.random(),
          description: item.description,
          hsnSac: '',
          quantity: item.quantity || 1,
          rate: item.rate || 0,
          taxRate: 18,
          amount: item.amount || 0,
          taxAmount: 0,
          total: item.amount || 0
        }
        
        // Recalculate amounts
        newItem.amount = newItem.quantity * newItem.rate
        newItem.taxAmount = (newItem.amount * newItem.taxRate) / 100
        newItem.total = newItem.amount + newItem.taxAmount
        
        setInvoice(prev => ({
          ...prev,
          items: [...prev.items, newItem]
        }))
      })
    }

    // Auto-fill other extracted data
    if (ocrData.phone && !invoice.clientPhone) {
      setInvoice(prev => ({ ...prev, clientPhone: ocrData.phone }))
    }
    if (ocrData.email && !invoice.clientEmail) {
      setInvoice(prev => ({ ...prev, clientEmail: ocrData.email }))
    }
    if (ocrData.gstin && !invoice.clientGSTIN) {
      setInvoice(prev => ({ ...prev, clientGSTIN: ocrData.gstin }))
    }
  }

  const handleVoiceInput = (transcript) => {
    // Parse voice commands
    const lowerTranscript = transcript.toLowerCase()
    
    if (lowerTranscript.includes('add item')) {
      // Extract item details from voice
      const itemMatch = lowerTranscript.match(/add item (.+?) price (\d+)/i)
      if (itemMatch) {
        const description = itemMatch[1]
        const price = parseFloat(itemMatch[2])
        
        const newItem = {
          id: Date.now().toString(),
          description: description,
          hsnSac: '',
          quantity: 1,
          rate: price,
          taxRate: 18,
          amount: price,
          taxAmount: (price * 18) / 100,
          total: price + (price * 18) / 100
        }
        
        setInvoice(prev => ({
          ...prev,
          items: [...prev.items, newItem]
        }))
      }
    } else if (lowerTranscript.includes('client name')) {
      const nameMatch = lowerTranscript.match(/client name (.+)/i)
      if (nameMatch) {
        setInvoice(prev => ({ ...prev, clientName: nameMatch[1] }))
      }
    } else if (lowerTranscript.includes('company name')) {
      const nameMatch = lowerTranscript.match(/company name (.+)/i)
      if (nameMatch) {
        setInvoice(prev => ({ ...prev, companyName: nameMatch[1] }))
      }
    } else if (lowerTranscript.includes('notes')) {
      const notesMatch = lowerTranscript.match(/notes (.+)/i)
      if (notesMatch) {
        setInvoice(prev => ({ ...prev, notes: notesMatch[1] }))
      }
    }
  }

  const handleAIDescription = (description) => {
    if (activeItemId) {
      updateItem(activeItemId, 'description', description)
      setActiveItemId(null)
    }
  }

  const convertCurrency = (amount, fromCurrency = 'INR', toCurrency = selectedCurrency) => {
    if (fromCurrency === toCurrency) return amount
    
    if (fromCurrency === 'INR' && toCurrency === selectedCurrency) {
      return amount * exchangeRate
    } else if (fromCurrency === selectedCurrency && toCurrency === 'INR') {
      return amount / exchangeRate
    }
    
    return amount
  }

  const formatCurrency = (amount) => {
    const currency = getCurrencyByCode(selectedCurrency)
    return `${currency.symbol}${amount.toFixed(2)}`
  }

  const handleNumberInput = (id, field, value) => {
    const numericValue = value === '' ? 0 : parseFloat(value)
    updateItem(id, field, numericValue)
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with AI Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🚀 Enhanced Invoice Generator
          </h1>
          <button
            onClick={() => setShowAIFeatures(!showAIFeatures)}
            className={`btn-primary flex items-center space-x-2 ${showAIFeatures ? 'bg-green-500 hover:bg-green-600' : ''}`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{showAIFeatures ? 'Hide AI Features' : 'Show AI Features'}</span>
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300">
          Create professional invoices with AI-powered features, OCR scanning, voice input, and international support.
        </p>
      </motion.div>

      {/* AI Features Panel */}
      <AnimatePresence>
        {showAIFeatures && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {/* OCR Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <OCRUpload onDataExtracted={handleOCRData} />
            </motion.div>

            {/* Voice Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <VoiceInput onVoiceResult={handleVoiceInput} />
            </motion.div>

            {/* Country & Currency Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <CountrySelector
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
            </motion.div>

            {/* AI Description Generator */}
            {activeItemId && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card lg:col-span-2"
              >
                <AIDescriptionGenerator
                  productName={invoice.items.find(item => item.id === activeItemId)?.description || ''}
                  onDescriptionGenerated={handleAIDescription}
                />
              </motion.div>
            )}

            {/* Translation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <TranslateInvoice invoice={invoice} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Original Invoice Form with Enhancements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          {/* Invoice Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Invoice Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Invoice Number *
                </label>
                <input
                  type="text"
                  value={invoice.number}
                  onChange={(e) => setInvoice(prev => ({ ...prev, number: e.target.value }))}
                  className="input-field"
                  placeholder="INV-2025-001"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Invoice Date *
                </label>
                <input
                  type="date"
                  value={invoice.date}
                  onChange={(e) => setInvoice(prev => ({ ...prev, date: e.target.value }))}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Currency Display */}
            {selectedCurrency !== 'INR' && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Currency:</strong> {getCurrencyByCode(selectedCurrency).name} ({selectedCurrency})
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  Exchange Rate: 1 INR = {exchangeRate.toFixed(4)} {selectedCurrency}
                </p>
              </div>
            )}
          </motion.div>

          {/* Company Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Business Details</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Logo
              </label>
              <div className="flex items-center space-x-4">
                {invoice.companyLogo && (
                  <img
                    src={invoice.companyLogo}
                    alt="Company Logo"
                    className="w-16 h-16 object-contain border border-gray-200 dark:border-gray-600 rounded-lg"
                  />
                )}
                <label className="btn-secondary cursor-pointer flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          setInvoice(prev => ({
                            ...prev,
                            companyLogo: event.target?.result as string
                          }))
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={invoice.companyName}
                  onChange={(e) => setInvoice(prev => ({ ...prev, companyName: e.target.value }))}
                  className="input-field"
                  placeholder="Your Company Name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={invoice.companyPhone}
                  onChange={(e) => setInvoice(prev => ({ ...prev, companyPhone: e.target.value }))}
                  className="input-field"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Address *
              </label>
              <textarea
                value={invoice.companyAddress}
                onChange={(e) => setInvoice(prev => ({ ...prev, companyAddress: e.target.value }))}
                className="input-field"
                rows={3}
                placeholder="Your complete business address"
                required
              />
            </div>
          </motion.div>

          {/* Client Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={invoice.clientName}
                  onChange={(e) => setInvoice(prev => ({ ...prev, clientName: e.target.value }))}
                  className="input-field"
                  placeholder="Client Company Name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={invoice.clientPhone}
                  onChange={(e) => setInvoice(prev => ({ ...prev, clientPhone: e.target.value }))}
                  className="input-field"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Address *
              </label>
              <textarea
                value={invoice.clientAddress}
                onChange={(e) => setInvoice(prev => ({ ...prev, clientAddress: e.target.value }))}
                className="input-field"
                rows={3}
                placeholder="Client's complete address"
                required
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column - Items */}
        <div className="space-y-6">
          {/* Items Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Items & Services</h2>
              <button
                onClick={addItem}
                className="btn-primary flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-4">
              {invoice.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Item {index + 1}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setActiveItemId(activeItemId === item.id ? null : item.id)}
                        className="p-1 text-orange-500 hover:text-orange-700 transition-colors"
                        title="Generate AI description"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Description *
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="input-field text-sm"
                        placeholder="Product/Service description"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Qty *
                        </label>
                        <input
                          type="number"
                          value={item.quantity || ''}
                          onChange={(e) => handleNumberInput(item.id, 'quantity', e.target.value)}
                          className="input-field text-sm"
                          min="0"
                          step="0.01"
                          placeholder="1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Rate *
                        </label>
                        <input
                          type="number"
                          value={item.rate || ''}
                          onChange={(e) => handleNumberInput(item.id, 'rate', e.target.value)}
                          className="input-field text-sm"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Tax %
                        </label>
                        <select
                          value={item.taxRate}
                          onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                          className="input-field text-sm"
                        >
                          <option value={0}>0%</option>
                          <option value={5}>5%</option>
                          <option value={12}>12%</option>
                          <option value={18}>18%</option>
                          <option value={28}>28%</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          Total
                        </label>
                        <input
                          type="text"
                          value={formatCurrency(convertCurrency(item.total))}
                          className="input-field text-sm bg-gray-50 dark:bg-gray-700 font-medium"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {invoice.items.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No items added yet.</p>
                  <p className="text-sm">Use OCR scan, voice input, or click "Add Item" to get started.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Notes Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Notes</h2>
            <textarea
              value={invoice.notes}
              onChange={(e) => setInvoice(prev => ({ ...prev, notes: e.target.value }))}
              className="input-field"
              rows={3}
              placeholder="Payment instructions, thank you note, terms & conditions..."
            />
          </motion.div>

          {/* Preview Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <button
              onClick={onPreview}
              className="btn-primary px-8 py-3 text-lg flex items-center space-x-2"
            >
              <Globe className="w-5 h-5" />
              <span>Preview Enhanced Invoice</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedInvoiceForm