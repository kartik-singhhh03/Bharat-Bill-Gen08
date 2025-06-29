export interface IPInfo {
  country: string
  countryCode: string
  currency: string
  timezone: string
}

export const detectUserLocation = async (): Promise<IPInfo | null> => {
  try {
    // Create AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    // Using ipapi.co for IP detection (free tier)
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
    })
    
    // Clear timeout if request succeeds
    clearTimeout(timeoutId)
    
    const data = await response.json()
    
    return {
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || 'US',
      currency: data.currency || 'USD',
      timezone: data.timezone || 'UTC'
    }
  } catch (error) {
    // Simplified error handling - single concise message
    console.error('Location detection failed, using default region. This may be due to network issues, browser extensions, or service unavailability.')
    return null
  }
}

export const getCountryConfig = (countryCode: string) => {
  const configs: Record<string, any> = {
    'US': {
      code: 'US',
      name: 'United States',
      currency: 'USD',
      currencySymbol: '$',
      taxLabel: 'Sales Tax',
      taxRates: [0, 5, 7.5, 10],
      invoicePrefix: 'INV-US',
      dateFormat: 'MM/DD/YYYY',
      flag: '🇺🇸'
    },
    'GB': {
      code: 'GB',
      name: 'United Kingdom',
      currency: 'GBP',
      currencySymbol: '£',
      taxLabel: 'VAT',
      taxRates: [0, 5, 20],
      invoicePrefix: 'INV-UK',
      dateFormat: 'DD/MM/YYYY',
      flag: '🇬🇧'
    },
    'CA': {
      code: 'CA',
      name: 'Canada',
      currency: 'CAD',
      currencySymbol: 'C$',
      taxLabel: 'GST/HST',
      taxRates: [0, 5, 13, 15],
      invoicePrefix: 'INV-CA',
      dateFormat: 'DD/MM/YYYY',
      flag: '🇨🇦'
    },
    'AU': {
      code: 'AU',
      name: 'Australia',
      currency: 'AUD',
      currencySymbol: 'A$',
      taxLabel: 'GST',
      taxRates: [0, 10],
      invoicePrefix: 'INV-AU',
      dateFormat: 'DD/MM/YYYY',
      flag: '🇦🇺'
    },
    'DE': {
      code: 'DE',
      name: 'Germany',
      currency: 'EUR',
      currencySymbol: '€',
      taxLabel: 'VAT',
      taxRates: [0, 7, 19],
      invoicePrefix: 'INV-DE',
      dateFormat: 'DD.MM.YYYY',
      flag: '🇩🇪'
    },
    'FR': {
      code: 'FR',
      name: 'France',
      currency: 'EUR',
      currencySymbol: '€',
      taxLabel: 'TVA',
      taxRates: [0, 5.5, 10, 20],
      invoicePrefix: 'INV-FR',
      dateFormat: 'DD/MM/YYYY',
      flag: '🇫🇷'
    },
    'NL': {
      code: 'NL',
      name: 'Netherlands',
      currency: 'EUR',
      currencySymbol: '€',
      taxLabel: 'BTW',
      taxRates: [0, 9, 21],
      invoicePrefix: 'INV-NL',
      dateFormat: 'DD-MM-YYYY',
      flag: '🇳🇱'
    },
    'SG': {
      code: 'SG',
      name: 'Singapore',
      currency: 'SGD',
      currencySymbol: 'S$',
      taxLabel: 'GST',
      taxRates: [0, 7],
      invoicePrefix: 'INV-SG',
      dateFormat: 'DD/MM/YYYY',
      flag: '🇸🇬'
    }
  }

  return configs[countryCode] || configs['US'] // Default to US
}

export const getAllCountries = () => {
  return [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'AE', name: 'UAE', flag: '🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'IL', name: 'Israel', flag: '🇮🇱' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
    { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
    { code: 'OTHER', name: 'Other Country', flag: '🌍' }
  ]
}