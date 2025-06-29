import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Upload, Globe, DollarSign } from 'lucide-react'
import { GlobalInvoice, GlobalInvoiceItem } from '../types/globalInvoice'
import { getCountryConfig, getAllCountries } from '../utils/ipDetection'

interface GlobalInvoiceFormProps {
  invoice: GlobalInvoice
  setInvoice: React.Dispatch<React.SetStateAction<GlobalInvoice>>
  addItem: () => void
  updateItem: (id: string, field: keyof GlobalInvoiceItem, value: any) => void
  removeItem: (id: string) => void
  onPreview: () => void
  isPremium: boolean
  onUnlockPremium: () => void
}

const GlobalInvoiceForm: React.FC<GlobalInvoiceFormProps> = ({
  invoice,
  setInvoice,
  addItem,
  updateItem,
  removeItem,
  onPreview,
  isPremium,
  onUnlockPremium
}) => {
  const [countryConfig, setCountryConfig] = useState(getCountryConfig('US'))
  const countries = getAllCountries()

  useEffect(() => {
    const config = getCountryConfig(invoice.country)
    setCountryConfig(config)
    setInvoice(prev => ({
      ...prev,
      currency: config.currency,
      taxLabel: config.taxLabel
    }))
  }, [invoice.country, setInvoice])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${countryConfig.invoicePrefix}-${year}-${month}-${random}`
  }

  // Handle number input properly - convert empty string to 0 for calculations
  const handleNumberInput = (id: string, field: keyof GlobalInvoiceItem, value: string) => {
    const numericValue = value === '' ? 0 : parseFloat(value)
    updateItem(id, field, numericValue)
  }

  const themes = [
    { id: 'international', name: 'International', preview: '🌍', premium: false },
    { id: 'professional', name: 'Professional', preview: '💼', premium: false },
    { id: 'modern-global', name: 'Modern Global', preview: '🚀', premium: false },
    { id: 'luxury-international', name: 'Luxury International', preview: '💎', premium: true },
    { id: 'corporate-global', name: 'Corporate Global', preview: '🏢', premium: true },
    { id: 'creative-international', name: 'Creative International', preview: '🎨', premium: true }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              🌍 International Invoice Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Create professional invoices for global clients with multi-currency support
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Invoice Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Country/Region
            </label>
            <select
              value={invoice.country}
              onChange={(e) => setInvoice(prev => ({ ...prev, country: e.target.value }))}
              className="input-field"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Currency
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={`${countryConfig.currencySymbol} ${countryConfig.currency}`}
                className="input-field pl-10 bg-gray-50 dark:bg-gray-700"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Invoice Number
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={invoice.number}
                onChange={(e) => setInvoice(prev => ({ ...prev, number: e.target.value }))}
                className="input-field flex-1"
                placeholder={`e.g., ${countryConfig.invoicePrefix}-2025-001`}
              />
              <button
                onClick={() => setInvoice(prev => ({ ...prev, number: generateInvoiceNumber() }))}
                className="btn-secondary px-3"
                title="Generate new number"
              >
                🔄
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice(prev => ({ ...prev, date: e.target.value }))}
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date (Optional)
            </label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => setInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Terms
            </label>
            <select
              value={invoice.paymentTerms}
              onChange={(e) => setInvoice(prev => ({ ...prev, paymentTerms: e.target.value }))}
              className="input-field"
            >
              <option value="Net 30">Net 30 days</option>
              <option value="Net 15">Net 15 days</option>
              <option value="Net 7">Net 7 days</option>
              <option value="Due on receipt">Due on receipt</option>
              <option value="Cash on delivery">Cash on delivery</option>
            </select>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Invoice Theme
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  if (theme.premium && !isPremium) {
                    onUnlockPremium()
                  } else {
                    setInvoice(prev => ({ ...prev, theme: theme.id }))
                  }
                }}
                className={`relative p-3 rounded-lg border-2 transition-all ${
                  invoice.theme === theme.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                } ${theme.premium && !isPremium ? 'opacity-60' : ''}`}
              >
                <div className="text-2xl mb-1">{theme.preview}</div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">{theme.name}</div>
                {theme.premium && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-yellow-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="card">
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
                onChange={handleLogoUpload}
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
              Tax ID / VAT Number
            </label>
            <input
              type="text"
              value={invoice.companyTaxId}
              onChange={(e) => setInvoice(prev => ({ ...prev, companyTaxId: e.target.value }))}
              className="input-field"
              placeholder={`${countryConfig.taxLabel} registration number`}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={invoice.companyPhone}
              onChange={(e) => setInvoice(prev => ({ ...prev, companyPhone: e.target.value }))}
              className="input-field"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={invoice.companyEmail}
              onChange={(e) => setInvoice(prev => ({ ...prev, companyEmail: e.target.value }))}
              className="input-field"
              placeholder="your@company.com"
            />
          </div>
        </div>
      </div>

      {/* Client Details */}
      <div className="card">
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
              Client Tax ID / VAT Number
            </label>
            <input
              type="text"
              value={invoice.clientTaxId}
              onChange={(e) => setInvoice(prev => ({ ...prev, clientTaxId: e.target.value }))}
              className="input-field"
              placeholder="Optional"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={invoice.clientPhone}
              onChange={(e) => setInvoice(prev => ({ ...prev, clientPhone: e.target.value }))}
              className="input-field"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={invoice.clientEmail}
              onChange={(e) => setInvoice(prev => ({ ...prev, clientEmail: e.target.value }))}
              className="input-field"
              placeholder="client@company.com"
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="card">
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
            <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Item {index + 1}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="md:col-span-2">
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
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
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
                    {countryConfig.taxLabel} %
                  </label>
                  <select
                    value={item.taxRate}
                    onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                    className="input-field text-sm"
                  >
                    {countryConfig.taxRates.map((rate) => (
                      <option key={rate} value={rate}>{rate}%</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Amount
                  </label>
                  <input
                    type="text"
                    value={`${countryConfig.currencySymbol}${item.amount.toFixed(2)}`}
                    className="input-field text-sm bg-gray-50 dark:bg-gray-700"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total
                  </label>
                  <input
                    type="text"
                    value={`${countryConfig.currencySymbol}${item.total.toFixed(2)}`}
                    className="input-field text-sm bg-gray-50 dark:bg-gray-700 font-medium"
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}

          {invoice.items.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No items added yet. Click "Add Item" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Notes</h2>
        <textarea
          value={invoice.notes}
          onChange={(e) => setInvoice(prev => ({ ...prev, notes: e.target.value }))}
          className="input-field"
          rows={3}
          placeholder="Payment instructions, thank you note, terms & conditions..."
        />
      </div>

      {/* Preview Button */}
      <div className="flex justify-center">
        <button
          onClick={onPreview}
          className="btn-primary px-8 py-3 text-lg"
        >
          Preview Invoice
        </button>
      </div>
    </div>
  )
}

export default GlobalInvoiceForm