const EXCHANGE_API_KEY = '#'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

class ExchangeRateService {
  constructor() {
    this.cache = new Map()
    this.baseCurrency = 'USD'
  }

  async getExchangeRates(baseCurrency = 'USD') {
    const cacheKey = `rates_${baseCurrency}`
    const cached = this.cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.rates
    }

    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${baseCurrency}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates')
      }
      
      const data = await response.json()
      
      if (data.result === 'success') {
        this.cache.set(cacheKey, {
          rates: data.conversion_rates,
          timestamp: Date.now()
        })
        return data.conversion_rates
      } else {
        throw new Error('Invalid API response')
      }
    } catch (error) {
      console.error('Exchange rate fetch failed:', error)
      
      // Fallback to cached data if available
      if (cached) {
        return cached.rates
      }
      
      // Ultimate fallback - return basic rates
      return this.getFallbackRates(baseCurrency)
    }
  }

  getFallbackRates(baseCurrency) {
    const fallbackRates = {
      USD: { INR: 83.12, EUR: 0.85, GBP: 0.73, JPY: 110.0, CNY: 6.45 },
      INR: { USD: 0.012, EUR: 0.010, GBP: 0.009, JPY: 1.32, CNY: 0.078 },
      EUR: { USD: 1.18, INR: 98.5, GBP: 0.86, JPY: 129.5, CNY: 7.6 }
    }
    
    return fallbackRates[baseCurrency] || fallbackRates.USD
  }

  async convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      return amount
    }

    try {
      const rates = await this.getExchangeRates(fromCurrency)
      const rate = rates[toCurrency]
      
      if (!rate) {
        throw new Error(`Exchange rate not found for ${toCurrency}`)
      }
      
      return amount * rate
    } catch (error) {
      console.error('Currency conversion failed:', error)
      return amount // Return original amount on error
    }
  }

  async getConversionRate(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
      return 1
    }

    try {
      const rates = await this.getExchangeRates(fromCurrency)
      return rates[toCurrency] || 1
    } catch (error) {
      console.error('Failed to get conversion rate:', error)
      return 1
    }
  }

  // Get formatted currency display
  formatCurrency(amount, currencyCode, locale = 'en-US') {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount)
    } catch (error) {
      // Fallback formatting
      const currency = this.getCurrencySymbol(currencyCode)
      return `${currency}${amount.toFixed(2)}`
    }
  }

  getCurrencySymbol(currencyCode) {
    const symbols = {
      USD: '$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥',
      INR: '₹', AUD: 'A$', CAD: 'C$', CHF: 'CHF', SGD: 'S$',
      HKD: 'HK$', NZD: 'NZ$', SEK: 'kr', NOK: 'kr', DKK: 'kr'
    }
    return symbols[currencyCode] || currencyCode
  }
}

export const exchangeRateService = new ExchangeRateService()
export default exchangeRateService
