import React, { useState } from 'react'
import { Sparkles, Loader, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const AIDescriptionGenerator = ({ productName, onDescriptionGenerated, className = '' }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDescriptions, setGeneratedDescriptions] = useState([])
  const [error, setError] = useState(null)

  const generateDescription = async () => {
    if (!productName.trim()) {
      setError('Please enter a product name first')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Using Hugging Face Inference API (free tier)
      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: `Generate a professional business description for: ${productName}`,
            parameters: {
              max_length: 100,
              temperature: 0.7,
              do_sample: true,
              top_p: 0.9
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error('AI service temporarily unavailable')
      }

      const data = await response.json()
      
      // Fallback descriptions if AI fails
      const fallbackDescriptions = generateFallbackDescriptions(productName)
      
      let descriptions = []
      if (data && data[0] && data[0].generated_text) {
        descriptions = [data[0].generated_text.trim()]
      } else {
        descriptions = fallbackDescriptions
      }

      // Add some variety with fallback descriptions
      descriptions = [...descriptions, ...fallbackDescriptions.slice(0, 2)]
      
      setGeneratedDescriptions(descriptions.slice(0, 3))
    } catch (err) {
      console.error('AI generation failed:', err)
      // Use fallback descriptions
      const fallbackDescriptions = generateFallbackDescriptions(productName)
      setGeneratedDescriptions(fallbackDescriptions)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateFallbackDescriptions = (product) => {
    const templates = [
      `Professional ${product.toLowerCase()} service with high-quality delivery and customer satisfaction guarantee.`,
      `Premium ${product.toLowerCase()} solution designed to meet your business needs with expert consultation.`,
      `Comprehensive ${product.toLowerCase()} package including consultation, implementation, and ongoing support.`,
      `Custom ${product.toLowerCase()} service tailored to your specific requirements with timely delivery.`,
      `Expert ${product.toLowerCase()} with industry best practices and proven methodologies.`
    ]
    
    return templates.slice(0, 3)
  }

  const selectDescription = (description) => {
    if (onDescriptionGenerated) {
      onDescriptionGenerated(description)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          🤖 AI Description Generator
        </h3>
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={generateDescription}
        disabled={isGenerating || !productName.trim()}
        className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isGenerating ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate Smart Description</span>
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

      {/* Generated Descriptions */}
      <AnimatePresence>
        {generatedDescriptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Generated Descriptions:
              </h4>
              <button
                onClick={generateDescription}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Generate new descriptions"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {generatedDescriptions.map((description, index) => (
                <motion.button
                  key={index}
                  onClick={() => selectDescription(description)}
                  className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <p className="text-gray-900 dark:text-white text-sm">
                    {description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Click to use this description
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          AI Features:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Generates professional business descriptions</li>
          <li>• Multiple variations for each product</li>
          <li>• Powered by Hugging Face AI models</li>
          <li>• Fallback templates for reliability</li>
          <li>• One-click integration with invoice items</li>
        </ul>
      </div>
    </div>
  )
}

export default AIDescriptionGenerator