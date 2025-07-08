import React, { useState, useEffect } from 'react'
import { Globe, TrendingUp, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { countries, detectUserCountry } from '../data/countries'
import { currencies, getCurrencyByCode } from '../data/currencies'
import { exchangeRateService } from '../utils/exchangeRates'

const CountrySelector = ({ 
  selectedCountry, 
  onCountryChange, 
  selectedCurrency,
  onCurrencyChange,
  className = '' 
}) => {
  const [exchangeRate, setExchangeRate] = useState(1)
  const [isLoadingRate, setIsLoadingRate] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    // Auto-detect user country on mount
    if (!selectedCountry) {
      const detectedCountry = detectUserCountry()
      onCountryChange(detectedCountry)
    }
  }, [selectedCountry, onCountryChange])

  useEffect(() => {
    // Update exchange rate when currency changes
    if (selectedCurrency && selectedCurrency !== 'INR') {
      updateExchangeRate()
    } else {
      setExchangeRate(1)
    }
  }, [selectedCurrency])

  const updateExchangeRate = async () => {
    if (!selectedCurrency || selectedCurrency === 'INR') return

    setIsLoadingRate(true)
    try {
      const rate = await exchangeRateService.getConversionRate('INR', selectedCurrency)
      setExchangeRate(rate)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to update exchange rate:', error)
    } finally {
      setIsLoadingRate(false)
    }
  }

  const handleCountryChange = (countryCode) => {
    const country = countries.find(c => c.code === countryCode)
    if (country) {
      onCountryChange(country)
      onCurrencyChange(country.currency)
    }
  }

  const formatExchangeRate = (rate) => {
    const currency = getCurrencyByCode(selectedCurrency)
    return `1 INR = ${rate.toFixed(4)} ${currency.symbol}`
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Globe className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          🌍 Country & Currency
        </h3>
      </div>

      {/* Country Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Country
          </label>
          <select
            value={selectedCountry?.code || ''}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="input-field"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Currency
          </label>
          <select
            value={selectedCurrency || ''}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="input-field"
          >
            <option value="">Select Currency</option>
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exchange Rate Display */}
      {selectedCurrency && selectedCurrency !== 'INR' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-blue-900 dark:text-blue-100">
                Exchange Rate
              </span>
            </div>
            <button
              onClick={updateExchangeRate}
              disabled={isLoadingRate}
              className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
              title="Refresh exchange rate"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingRate ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          <div className="space-y-1">
            <p className="text-blue-800 dark:text-blue-200 font-medium">
              {formatExchangeRate(exchangeRate)}
            </p>
            {lastUpdated && (
              <p className="text-xs text-blue-600 dark:text-blue-300">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Country Info */}
      {selectedCountry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
        >
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Country Information:
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-300">Country:</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedCountry.flag} {selectedCountry.name}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Default Tax Rate:</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedCountry.taxRate}%
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Currency:</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {getCurrencyByCode(selectedCountry.currency).symbol} {selectedCountry.currency}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Currency Name:</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {getCurrencyByCode(selectedCountry.currency).name}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Currency Converter */}
      {selectedCurrency && selectedCurrency !== 'INR' && exchangeRate !== 1 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">
            Quick Converter:
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-green-700 dark:text-green-300">₹100 INR =</p>
              <p className="font-medium text-green-900 dark:text-green-100">
                {getCurrencyByCode(selectedCurrency).symbol}{(100 * exchangeRate).toFixed(2)} {selectedCurrency}
              </p>
            </div>
            <div>
              <p className="text-green-700 dark:text-green-300">₹1000 INR =</p>
              <p className="font-medium text-green-900 dark:text-green-100">
                {getCurrencyByCode(selectedCurrency).symbol}{(1000 * exchangeRate).toFixed(2)} {selectedCurrency}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CountrySelector