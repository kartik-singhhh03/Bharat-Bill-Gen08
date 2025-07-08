import React, { useState, useCallback } from 'react'
import { Upload, Camera, FileImage, Loader, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Tesseract from 'tesseract.js'

const OCRUpload = ({ onDataExtracted, className = '' }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const processImage = useCallback(async (file) => {
    setIsProcessing(true)
    setProgress(0)
    setError(null)
    setResult(null)

    try {
      const { data: { text } } = await Tesseract.recognize(
        file,
        'eng+hin', // Support English and Hindi
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100))
            }
          }
        }
      )

      // Extract structured data from OCR text
      const extractedData = extractInvoiceData(text)
      setResult(extractedData)
      
      if (onDataExtracted) {
        onDataExtracted(extractedData)
      }
    } catch (err) {
      setError('Failed to process image. Please try again.')
      console.error('OCR Error:', err)
    } finally {
      setIsProcessing(false)
    }
  }, [onDataExtracted])

  const extractInvoiceData = (text) => {
    const lines = text.split('\n').filter(line => line.trim())
    const items = []
    
    // Simple pattern matching for common invoice formats
    const pricePattern = /₹?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/g
    const itemPattern = /^(.+?)\s+.*?₹?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)$/

    lines.forEach(line => {
      const match = line.match(itemPattern)
      if (match) {
        const description = match[1].trim()
        const price = parseFloat(match[2].replace(/,/g, ''))
        
        if (description.length > 3 && price > 0) {
          items.push({
            description,
            rate: price,
            quantity: 1,
            amount: price
          })
        }
      }
    })

    // Extract other relevant information
    const phonePattern = /(\+91|91)?[\s-]?[6-9]\d{9}/
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    const gstinPattern = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/

    const phone = text.match(phonePattern)?.[0]
    const email = text.match(emailPattern)?.[0]
    const gstin = text.match(gstinPattern)?.[0]

    return {
      items,
      extractedText: text,
      phone,
      email,
      gstin,
      confidence: items.length > 0 ? 'high' : 'low'
    }
  }

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      processImage(files[0])
    }
  }, [processImage])

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files
    if (files && files[0]) {
      processImage(files[0])
    }
  }, [processImage])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Camera className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          📸 OCR Bill Scanner
        </h3>
      </div>

      {/* Upload Area */}
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500'
        } ${isProcessing ? 'pointer-events-none opacity-60' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="space-y-4">
          {isProcessing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <Loader className="w-12 h-12 text-orange-500 mx-auto animate-spin" />
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">Processing image...</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{progress}%</p>
              </div>
            </motion.div>
          ) : (
            <>
              <FileImage className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Upload Bill Image
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Drag & drop or click to select an image
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Supports JPG, PNG • Max 10MB
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-green-700 dark:text-green-300">
                Extracted {result.items.length} items from image
              </p>
            </div>

            {result.items.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Extracted Items:
                </h4>
                <div className="space-y-2">
                  {result.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded border"
                    >
                      <span className="text-gray-900 dark:text-white">
                        {item.description}
                      </span>
                      <span className="font-medium text-orange-600 dark:text-orange-400">
                        ₹{item.rate.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(result.phone || result.email || result.gstin) && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Additional Information:
                </h4>
                <div className="space-y-1 text-sm">
                  {result.phone && (
                    <p className="text-gray-600 dark:text-gray-300">
                      Phone: {result.phone}
                    </p>
                  )}
                  {result.email && (
                    <p className="text-gray-600 dark:text-gray-300">
                      Email: {result.email}
                    </p>
                  )}
                  {result.gstin && (
                    <p className="text-gray-600 dark:text-gray-300">
                      GSTIN: {result.gstin}
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OCRUpload