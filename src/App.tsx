import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import InvoiceForm from './components/InvoiceForm'
import PreviewInvoice from './components/PreviewInvoice'
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
import { generateInvoiceNumber } from './utils/invoiceUtils'
import { generateGlobalInvoiceNumber, createGlobalInvoiceItem, updateGlobalInvoiceItem } from './utils/globalInvoiceUtils'
import { detectUserLocation, getCountryConfig } from './utils/ipDetection'
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
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header 
            isPremium={isPremium} 
            onUnlockPremium={handleUnlockPremium}
          />
          
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={
                <div className="space-y-6">
                  {/* Hero Section */}
                  <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Create GST-Compliant Invoices for India — Now Supporting Global Invoices Too!
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                      Professional invoice generator for Indian businesses with GST compliance, 
                      plus international invoicing for global freelancers and businesses.
                    </p>
                  </div>

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
                        <InvoiceForm
                          invoice={invoice}
                          setInvoice={setInvoice}
                          addItem={addItem}
                          updateItem={updateItem}
                          removeItem={removeItem}
                          onPreview={() => setShowPreview(true)}
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
                        <PreviewInvoice
                          invoice={invoice}
                          visible={showPreview}
                          onClose={() => setShowPreview(false)}
                          isPremium={isPremium}
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
                </div>
              } />
              
              <Route path="/guide" element={<Guide />} />
              <Route path="/themes" element={<ThemeStore isPremium={isPremium} onUnlockPremium={handleUnlockPremium} />} />
              <Route path="/custom-builder" element={<CustomTemplateBuilder isPremium={isPremium} onUnlockPremium={handleUnlockPremium} />} />
              <Route path="/white-label" element={<WhiteLabelForm />} />
              <Route path="/unlocked" element={<UnlockedPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/features" element={<FeaturesPage />} />
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