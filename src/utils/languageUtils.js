// Language utilities for translation and multilingual support
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' }
]

class TranslationService {
  constructor() {
    this.cache = new Map()
    this.apiUrl = 'https://libretranslate.de/translate'
  }

  async translateText(text, targetLanguage, sourceLanguage = 'en') {
    if (sourceLanguage === targetLanguage || !text.trim()) {
      return text
    }

    const cacheKey = `${sourceLanguage}-${targetLanguage}-${text}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text'
        })
      })

      if (!response.ok) {
        throw new Error('Translation API failed')
      }

      const data = await response.json()
      const translatedText = data.translatedText || text

      this.cache.set(cacheKey, translatedText)
      return translatedText
    } catch (error) {
      console.error('Translation failed:', error)
      return text // Return original text on error
    }
  }

  async translateInvoiceFields(invoice, targetLanguage) {
    if (targetLanguage === 'en') {
      return invoice
    }

    try {
      const fieldsToTranslate = [
        'companyName', 'companyAddress', 'clientName', 'clientAddress',
        'notes', 'terms', 'paymentInstructions'
      ]

      const translatedInvoice = { ...invoice }

      // Translate basic fields
      for (const field of fieldsToTranslate) {
        if (invoice[field]) {
          translatedInvoice[field] = await this.translateText(
            invoice[field], 
            targetLanguage
          )
        }
      }

      // Translate items
      if (invoice.items && invoice.items.length > 0) {
        translatedInvoice.items = await Promise.all(
          invoice.items.map(async (item) => ({
            ...item,
            description: await this.translateText(item.description, targetLanguage)
          }))
        )
      }

      return translatedInvoice
    } catch (error) {
      console.error('Invoice translation failed:', error)
      return invoice
    }
  }

  getLanguageByCode(code) {
    return supportedLanguages.find(lang => lang.code === code) || supportedLanguages[0]
  }

  detectUserLanguage() {
    try {
      const browserLang = navigator.language.split('-')[0]
      return this.getLanguageByCode(browserLang)
    } catch (error) {
      return supportedLanguages[0] // Default to English
    }
  }
}

export const translationService = new TranslationService()
export default translationService