import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import EnhancedInvoiceForm from './components/EnhancedInvoiceForm'
import EnhancedPreviewInvoice from './components/EnhancedPreviewInvoice'
import ChartsDashboard from './components/ChartsDashboard'
import GlobalInvoiceForm from './components/GlobalInvoiceForm'
import PreviewGlobalInvoice from './components/PreviewGlobalInvoice'
import RegionSwitcher from './components/RegionSwitcher'
import Guide from './components/Guide'
import ThemeStore from './components/ThemeStore'
import UnlockPremium from './components/UnlockPremium'
import WhiteLabelForm from './components/WhiteLabelForm'
import UnlockedPage from './components/UnlockedPage'
import AffiliateFooter from './components/AffiliateFooter'
import ContactPage from './components/ContactPage'
import SupportPage from './components/SupportPage'
import FeaturesPage from './components/FeaturesPage'
import CustomTemplateBuilder from './components/CustomTemplateBuilder'
import { Invoice, InvoiceItem } from './types/invoice'
import { GlobalInvoice, GlobalInvoiceItem } from './types/globalInvoice'
import { generateInvoiceNumber, exportToPDF } from './utils/invoiceUtils'
import { generateGlobalInvoiceNumber, createGlobalInvoiceItem, updateGlobalInvoiceItem } from './utils/globalInvoiceUtils'
import { detectUserLocation, getCountryConfig } from './utils/ipDetection'
import { detectUserCountry } from './data/countries'
import { exchangeRateService } from './utils/exchangeRates'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import ReactGA from 'react-ga4'

// Replace with your actual ID:
ReactGA.initialize("G-9LVK9DJ1RX")
ReactGA.send("pageview")

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [currentRegion, setCurrentRegion] = useState<'india' | 'global'>('india')
  const [detectedCountry, setDetectedCountry] = useState<string>('')
  
  // Indian Invoice State
  const [invoice, setInvoice] = useState<Invoice>({
    number: '', // Start with empty string
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    isGST: true,
    companyName: '',
    companyAddress: '',
    companyGSTIN: '',
    companyPhone: '',
    companyEmail: '',
    companyLogo: '',
    clientName: '',
    clientAddress: '',
    clientGSTIN: '',
    clientPhone: '',
    clientEmail: '',
    placeOfSupply: '',
    items: [],
    notes: '',
    terms: '', // Added terms & conditions
    theme: 'classic',
    paymentInstructions: '', // Added payment instructions
    balanceDue: 0 // Added balance due tracking
  })

  // Global Invoice State
  const [globalInvoice, setGlobalInvoice] = useState<GlobalInvoice>({
    number: '', // Start with empty string
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: 'USD',
    country: 'US',
    companyName: '',
    companyAddress: '',
    companyTaxId: '',
    companyPhone: '',
    companyEmail: '',
    companyLogo: '',
    clientName: '',
    clientAddress: '',
    clientTaxId: '',
    clientPhone: '',
    clientEmail: '',
    items: [],
    notes: '',
    theme: 'international',
    taxLabel: 'Sales Tax',
    paymentTerms: 'Net 30'
  })

  const [showPreview, setShowPreview] = useState(false)
  const [showGlobalPreview, setShowGlobalPreview] = useState(false)
  const [showUnlockModal, setShowUnlockModal] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState('INR')
  const [exchangeRate, setExchangeRate] = useState(1)
  const [showDashboard, setShowDashboard] = useState(false)

  // Auto-detect user location on first load
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const locationInfo = await detectUserLocation()
        if (locationInfo) {
          setDetectedCountry(locationInfo.country)
          
          // Auto-switch to global if not from India
          if (locationInfo.countryCode !== 'IN') {
            setCurrentRegion('global')
            const config = getCountryConfig(locationInfo.countryCode)
            setGlobalInvoice(prev => ({
              ...prev,
              country: locationInfo.countryCode,
              currency: config.currency,
              taxLabel: config.taxLabel,
              number: '' // Keep empty initially
            }))
          }
        }
      } catch (error) {
        console.error('Failed to detect location:', error)
      }
    }

    detectLocation()
  }, [])

  // Initialize country and currency
  useEffect(() => {
    const detectedCountry = detectUserCountry()
    setSelectedCountry(detectedCountry)
    setSelectedCurrency(detectedCountry.currency)
  }, [])

  // Update exchange rate when currency changes
  useEffect(() => {
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    // Check premium status
    const proStatus = localStorage.getItem('pro_user')
    setIsPremium(proStatus === 'true')

    // Load saved invoice data
    const savedInvoice = localStorage.getItem('current_invoice')
    const savedGlobalInvoice = localStorage.getItem('current_global_invoice')
    
    if (savedInvoice) {
      try {
        const parsed = JSON.parse(savedInvoice)
        setInvoice(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Error loading saved invoice:', error)
      }
    }

    if (savedGlobalInvoice) {
      try {
        const parsed = JSON.parse(savedGlobalInvoice)
        setGlobalInvoice(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Error loading saved global invoice:', error)
      }
    }

    // Check if coming from unlock page
    if (location.pathname === '/unlocked') {
      localStorage.setItem('pro_user', 'true')
      setIsPremium(true)
    }
  }, [location])

  useEffect(() => {
    // Auto-save invoice data
    localStorage.setItem('current_invoice', JSON.stringify(invoice))
  }, [invoice])

  useEffect(() => {
    // Auto-save global invoice data
    localStorage.setItem('current_global_invoice', JSON.stringify(globalInvoice))
  }, [globalInvoice])

  // Indian Invoice Functions
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      hsnSac: '',
      quantity: 1,
      rate: 0,
      taxRate: 18,
      amount: 0,
      taxAmount: 0,
      total: 0
    }
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          
          // Recalculate amounts
          updatedItem.amount = updatedItem.quantity * updatedItem.rate
          updatedItem.taxAmount = (updatedItem.amount * updatedItem.taxRate) / 100
          updatedItem.total = updatedItem.amount + updatedItem.taxAmount
          
          return updatedItem
        }
        return item
      })
    }))
  }

  const removeItem = (id: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  // Global Invoice Functions
  const addGlobalItem = () => {
    const newItem = createGlobalInvoiceItem()
    setGlobalInvoice(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const updateGlobalItem = (id: string, field: keyof GlobalInvoiceItem, value: any) => {
    setGlobalInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          return updateGlobalInvoiceItem(item, field, value)
        }
        return item
      })
    }))
  }

  const removeGlobalItem = (id: string) => {
    setGlobalInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const handleUnlockPremium = () => {
    setShowUnlockModal(true)
  }

  const handleRegionChange = (region: 'india' | 'global') => {
    setCurrentRegion(region)
    setShowPreview(false)
    setShowGlobalPreview(false)
    setShowDashboard(false)
  }

  const handlePreviewInvoice = async () => {
    // Auto-generate invoice number if empty
    if (!invoice.number) {
      setInvoice(prev => ({ ...prev, number: generateInvoiceNumber() }))
    }
    
    // Save invoice to history
    const invoiceHistory = JSON.parse(localStorage.getItem('invoice_history') || '[]')
    const invoiceWithId = { ...invoice, id: Date.now().toString() }
    invoiceHistory.push(invoiceWithId)
    localStorage.setItem('invoice_history', JSON.stringify(invoiceHistory))
    
    setShowPreview(true)
  }

  const handleDownloadPDF = async () => {
    try {
      await exportToPDF(invoice, isPremium)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header 
            isPremium={isPremium} 
            onUnlockPremium={handleUnlockPremium}
          />
          
          <main className="container mx-auto px-4 py-6 relative">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Hero Section */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl border border-orange-200 dark:border-orange-800"
                  >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                      🚀 AI-Powered Invoice Generator
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-6">
                      Create professional invoices with OCR scanning, voice input, AI descriptions, 
                      multi-currency support, and real-time translation. Built for Indian businesses and global freelancers.
                    </p>
                    
                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                      {['📸 OCR Scan', '🎙️ Voice Input', '🤖 AI Descriptions', '🌍 Multi-Currency', '📊 Analytics'].map((feature, index) => (
                        <motion.span
                          key={feature}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                          className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                      <button
                        onClick={() => setShowDashboard(!showDashboard)}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <span>📊</span>
                        <span>{showDashboard ? 'Hide Dashboard' : 'View Analytics'}</span>
                      </button>
                    </div>
                  </motion.div>

                  {/* Dashboard */}
                  <AnimatePresence>
                    {showDashboard && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <ChartsDashboard />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Region Switcher */}
                  <RegionSwitcher
                    currentRegion={currentRegion}
                    onRegionChange={handleRegionChange}
                    detectedCountry={detectedCountry}
                  />

                  {/* Invoice Forms */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      {currentRegion === 'india' ? (
                        <EnhancedInvoiceForm
                          invoice={invoice}
                          setInvoice={setInvoice}
                          addItem={addItem}
                          updateItem={updateItem}
                          removeItem={removeItem}
                          onPreview={handlePreviewInvoice}
                          isPremium={isPremium}
                          onUnlockPremium={handleUnlockPremium}
                        />
                      ) : (
                        <GlobalInvoiceForm
                          invoice={globalInvoice}
                          setInvoice={setGlobalInvoice}
                          addItem={addGlobalItem}
                          updateItem={updateGlobalItem}
                          removeItem={removeGlobalItem}
                          onPreview={() => setShowGlobalPreview(true)}
                          isPremium={isPremium}
                          onUnlockPremium={handleUnlockPremium}
                        />
                      )}
                    </div>
                    
                    <div className="lg:sticky lg:top-6">
                      {currentRegion === 'india' ? (
                        <EnhancedPreviewInvoice
                          invoice={invoice}
                          visible={showPreview}
                          onClose={() => setShowPreview(false)}
                          isPremium={isPremium}
                          selectedCurrency={selectedCurrency}
                          exchangeRate={exchangeRate}
                        />
                      ) : (
                        <PreviewGlobalInvoice
                          invoice={globalInvoice}
                          visible={showGlobalPreview}
                          onClose={() => setShowGlobalPreview(false)}
                          isPremium={isPremium}
                        />
                      )}
                    </div>
                  </div>

                  {/* International Users Banner */}
                  {currentRegion === 'global' && (
                    <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        🌍 International users can now generate beautiful, professional invoices in one click — no login, 100% free.
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Multi-currency support, country-specific templates, and professional designs 
                        for freelancers and businesses worldwide.
                      </p>
                    </div>
                  )}
                </motion.div>
              } />
              
              <Route path="/guide" element={<Guide />} />
              <Route path="/themes" element={<ThemeStore isPremium={isPremium} onUnlockPremium={handleUnlockPremium} />} />
              <Route path="/custom-builder" element={<CustomTemplateBuilder isPremium={isPremium} onUnlockPremium={handleUnlockPremium} />} />
              <Route path="/white-label" element={<WhiteLabelForm />} />
              <Route path="/unlocked" element={<UnlockedPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/dashboard" element={<ChartsDashboard />} />
            </Routes>
          </main>

          <AffiliateFooter isPremium={isPremium} />

          {showUnlockModal && (
            <UnlockPremium onClose={() => setShowUnlockModal(false)} />
          )}
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App