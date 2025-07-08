import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Volume2, Square } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const VoiceInput = ({ onVoiceResult, language = 'en-IN', className = '' }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [recognition, setRecognition] = useState(null)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition) {
      setIsSupported(true)
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = language
      
      recognitionInstance.onstart = () => {
        setIsListening(true)
        setError(null)
      }
      
      recognitionInstance.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }
        
        const fullTranscript = finalTranscript || interimTranscript
        setTranscript(fullTranscript)
        
        if (finalTranscript && onVoiceResult) {
          onVoiceResult(finalTranscript)
        }
      }
      
      recognitionInstance.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`)
        setIsListening(false)
      }
      
      recognitionInstance.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognitionInstance)
    } else {
      setIsSupported(false)
    }
  }, [language, onVoiceResult])

  const startListening = () => {
    if (recognition && !isListening) {
      setTranscript('')
      setError(null)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
    }
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!isSupported) {
    return (
      <div className={`p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg ${className}`}>
        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
          Voice input is not supported in your browser. Please use Chrome or Edge for voice features.
        </p>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Volume2 className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          🎙️ Voice Input
        </h3>
      </div>

      {/* Voice Control Button */}
      <div className="flex items-center justify-center">
        <motion.button
          onClick={toggleListening}
          className={`relative p-6 rounded-full transition-all duration-300 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!isSupported}
        >
          {isListening ? (
            <Square className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
          
          {/* Pulse animation when listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.3, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {isListening ? 'Listening... Click to stop' : 'Click to start voice input'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Language: {language === 'en-IN' ? 'English (India)' : 'Hindi'}
        </p>
      </div>

      {/* Live Transcript */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          >
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Live Transcript:
            </h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {transcript}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Voice Commands Help */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
          Voice Commands:
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• "Add item [description] price [amount]"</li>
          <li>• "Client name [name]"</li>
          <li>• "Company name [name]"</li>
          <li>• "Notes [your notes]"</li>
        </ul>
      </div>
    </div>
  )
}

export default VoiceInput