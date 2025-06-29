import React from 'react'
import { Plus, Trash2, Upload, ToggleLeft, ToggleRight, Crown, Palette } from 'lucide-react'
import { Invoice, InvoiceItem } from '../types/invoice'

interface InvoiceFormProps {
  invoice: Invoice
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>
  addItem: () => void
  updateItem: (id: string, field: keyof InvoiceItem, value: any) => void
  removeItem: (id: string) => void
  onPreview: () => void
  isPremium: boolean
  onUnlockPremium: () => void
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  setInvoice,
  addItem,
  updateItem,
  removeItem,
  onPreview,
  isPremium,
  onUnlockPremium
}) => {
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

  const generateNewInvoiceNumber = () => {
    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `INV-${year}-${month}-${random}`
  }

  // Handle number input properly - convert empty string to 0 for calculations
  const handleNumberInput = (id: string, field: keyof InvoiceItem, value: string) => {
    const numericValue = value === '' ? 0 : parseFloat(value)
    updateItem(id, field, numericValue)
  }

  const themes = [
    // Free Themes
    { 
      id: 'classic', 
      name: 'Classic', 
      premium: false, 
      description: 'Traditional professional design',
      preview: '📄'
    },
    { 
      id: 'modern-blue', 
      name: 'Modern Blue', 
      premium: false, 
      description: 'Contemporary blue accent design',
      preview: '🔷'
    },
    { 
      id: 'elegant-green', 
      name: 'Elegant Green', 
      premium: false, 
      description: 'Sophisticated green theme',
      preview: '🟢'
    },
    
    // Premium Themes
    { 
      id: 'luxury-gold', 
      name: 'Luxury Gold', 
      premium: true, 
      description: 'Premium gold accents with elegant typography',
      preview: '🏆'
    },
    { 
      id: 'corporate-navy', 
      name: 'Corporate Navy', 
      premium: true, 
      description: 'Professional navy blue corporate design',
      preview: '🏢'
    },
    { 
      id: 'creative-purple', 
      name: 'Creative Purple', 
      premium: true, 
      description: 'Modern purple gradient design',
      preview: '🎨'
    },
    { 
      id: 'minimal-gray', 
      name: 'Minimal Gray', 
      premium: true, 
      description: 'Clean minimalist gray design',
      preview: '⚪'
    },
    { 
      id: 'vibrant-orange', 
      name: 'Vibrant Orange', 
      premium: true, 
      description: 'Energetic orange theme with modern layout',
      preview: '🟠'
    },
    { 
      id: 'professional-teal', 
      name: 'Professional Teal', 
      premium: true, 
      description: 'Sophisticated teal with premium styling',
      preview: '🔹'
    },
    { 
      id: 'executive-black', 
      name: 'Executive Black', 
      premium: true, 
      description: 'Premium black and white executive design',
      preview: '⚫'
    },
    { 
      id: 'custom', 
      name: 'Custom Builder', 
      premium: true, 
      description: 'Build your own template',
      preview: '🛠️'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Invoice Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Invoice Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Invoice Number *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={invoice.number}
                onChange={(e) => setInvoice(prev => ({ ...prev, number: e.target.value }))}
                className="input-field flex-1"
                placeholder="e.g., INV-2025-001"
                required
              />
              <button
                onClick={() => setInvoice(prev => ({ ...prev, number: generateNewInvoiceNumber() }))}
                className="btn-secondary px-3"
                title="Generate new invoice number"
              >
                🔄
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Format: INV-YYYY-MM-XXX (auto-generated or custom)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Invoice Date *
            </label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice(prev => ({ ...prev, date: e.target.value }))}
              className="input-field"
              required
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
              GST Invoice
            </label>
            <button
              onClick={() => setInvoice(prev => ({ ...prev, isGST: !prev.isGST }))}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {invoice.isGST ? (
                <ToggleRight className="w-6 h-6 text-green-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-400" />
              )}
              <span className={invoice.isGST ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                {invoice.isGST ? 'GST Enabled' : 'Non-GST'}
              </span>
            </button>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Palette className="w-5 h-5 text-orange-500" />
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Choose Invoice Theme
            </label>
          </div>
          
          {/* Free Themes */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Free Themes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {themes.filter(theme => !theme.premium).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setInvoice(prev => ({ ...prev, theme: theme.id }))}
                  className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                    invoice.theme === theme.id
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{theme.preview}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{theme.name}</div>
                      <div className="text-xs text-green-600 dark:text-green-400 font-medium">FREE</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{theme.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Themes */}
          <div>
            <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-2 flex items-center">
              <Crown className="w-4 h-4 mr-2" />
              Premium Themes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {themes.filter(theme => theme.premium).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    if (!isPremium) {
                      onUnlockPremium()
                    } else {
                      setInvoice(prev => ({ ...prev, theme: theme.id }))
                    }
                  }}
                  className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                    invoice.theme === theme.id && isPremium
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  } ${!isPremium ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{theme.preview}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{theme.name}</div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium flex items-center">
                        <Crown className="w-3 h-3 mr-1" />
                        PREMIUM
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{theme.description}</p>
                  
                  {!isPremium && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                      <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Unlock Pro
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {!isPremium && (
            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-gray-900 dark:text-white">Unlock 8 Premium Themes</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Get access to professional themes, custom template builder, and remove branding for just ₹299/year.
              </p>
              <button
                onClick={onUnlockPremium}
                className="btn-primary text-sm px-4 py-2"
              >
                Upgrade Now
              </button>
            </div>
          )}
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
          
          {invoice.isGST && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                GSTIN
              </label>
              <input
                type="text"
                value={invoice.companyGSTIN}
                onChange={(e) => setInvoice(prev => ({ ...prev, companyGSTIN: e.target.value }))}
                className="input-field"
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
          )}
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
              Phone *
            </label>
            <input
              type="tel"
              value={invoice.companyPhone}
              onChange={(e) => setInvoice(prev => ({ ...prev, companyPhone: e.target.value }))}
              className="input-field"
              placeholder="+91 98765 43210"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={invoice.companyEmail}
              onChange={(e) => setInvoice(prev => ({ ...prev, companyEmail: e.target.value }))}
              className="input-field"
              placeholder="your@company.com"
              required
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
          
          {invoice.isGST && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client GSTIN
              </label>
              <input
                type="text"
                value={invoice.clientGSTIN}
                onChange={(e) => setInvoice(prev => ({ ...prev, clientGSTIN: e.target.value }))}
                className="input-field"
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
          )}
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
              Phone *
            </label>
            <input
              type="tel"
              value={invoice.clientPhone}
              onChange={(e) => setInvoice(prev => ({ ...prev, clientPhone: e.target.value }))}
              className="input-field"
              placeholder="+91 98765 43210"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={invoice.clientEmail}
              onChange={(e) => setInvoice(prev => ({ ...prev, clientEmail: e.target.value }))}
              className="input-field"
              placeholder="client@company.com"
              required
            />
          </div>
        </div>

        {invoice.isGST && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Place of Supply *
            </label>
            <select
              value={invoice.placeOfSupply}
              onChange={(e) => setInvoice(prev => ({ ...prev, placeOfSupply: e.target.value }))}
              className="input-field"
              required
            >
              <option value="">Select State</option>
              <option value="01-Jammu and Kashmir">01-Jammu and Kashmir</option>
              <option value="02-Himachal Pradesh">02-Himachal Pradesh</option>
              <option value="03-Punjab">03-Punjab</option>
              <option value="04-Chandigarh">04-Chandigarh</option>
              <option value="05-Uttarakhand">05-Uttarakhand</option>
              <option value="06-Haryana">06-Haryana</option>
              <option value="07-Delhi">07-Delhi</option>
              <option value="08-Rajasthan">08-Rajasthan</option>
              <option value="09-Uttar Pradesh">09-Uttar Pradesh</option>
              <option value="10-Bihar">10-Bihar</option>
              <option value="11-Sikkim">11-Sikkim</option>
              <option value="12-Arunachal Pradesh">12-Arunachal Pradesh</option>
              <option value="13-Nagaland">13-Nagaland</option>
              <option value="14-Manipur">14-Manipur</option>
              <option value="15-Mizoram">15-Mizoram</option>
              <option value="16-Tripura">16-Tripura</option>
              <option value="17-Meghalaya">17-Meghalaya</option>
              <option value="18-Assam">18-Assam</option>
              <option value="19-West Bengal">19-West Bengal</option>
              <option value="20-Jharkhand">20-Jharkhand</option>
              <option value="21-Odisha">21-Odisha</option>
              <option value="22-Chhattisgarh">22-Chhattisgarh</option>
              <option value="23-Madhya Pradesh">23-Madhya Pradesh</option>
              <option value="24-Gujarat">24-Gujarat</option>
              <option value="25-Daman and Diu">25-Daman and Diu</option>
              <option value="26-Dadra and Nagar Haveli">26-Dadra and Nagar Haveli</option>
              <option value="27-Maharashtra">27-Maharashtra</option>
              <option value="28-Andhra Pradesh">28-Andhra Pradesh</option>
              <option value="29-Karnataka">29-Karnataka</option>
              <option value="30-Goa">30-Goa</option>
              <option value="31-Lakshadweep">31-Lakshadweep</option>
              <option value="32-Kerala">32-Kerala</option>
              <option value="33-Tamil Nadu">33-Tamil Nadu</option>
              <option value="34-Puducherry">34-Puducherry</option>
              <option value="35-Andaman and Nicobar Islands">35-Andaman and Nicobar Islands</option>
              <option value="36-Telangana">36-Telangana</option>
              <option value="37-Andhra Pradesh (New)">37-Andhra Pradesh (New)</option>
            </select>
          </div>
        )}
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
                <div>
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
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    HSN/SAC Code
                  </label>
                  <input
                    type="text"
                    value={item.hsnSac}
                    onChange={(e) => updateItem(item.id, 'hsnSac', e.target.value)}
                    className="input-field text-sm"
                    placeholder="HSN/SAC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                
                {invoice.isGST && (
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Tax %
                    </label>
                    <select
                      value={item.taxRate}
                      onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                      className="input-field text-sm"
                    >
                      <option value={0}>0%</option>
                      <option value={5}>5%</option>
                      <option value={12}>12%</option>
                      <option value={18}>18%</option>
                      <option value={28}>28%</option>
                    </select>
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Total
                  </label>
                  <input
                    type="text"
                    value={`₹${item.total.toFixed(2)}`}
                    className="input-field text-sm bg-gray-50 dark:bg-gray-700"
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

      {/* Payment Instructions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Instructions</h2>
        <textarea
          value={invoice.paymentInstructions || ''}
          onChange={(e) => setInvoice(prev => ({ ...prev, paymentInstructions: e.target.value }))}
          className="input-field"
          rows={3}
          placeholder="Bank details, payment methods, UPI ID, etc."
        />
      </div>

      {/* Terms & Conditions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Terms & Conditions</h2>
        <textarea
          value={invoice.terms || ''}
          onChange={(e) => setInvoice(prev => ({ ...prev, terms: e.target.value }))}
          className="input-field"
          rows={4}
          placeholder="1. Payment due within 30 days&#10;2. Late payment charges may apply&#10;3. Goods once sold will not be taken back&#10;4. Subject to local jurisdiction"
        />
      </div>

      {/* Additional Notes */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Notes</h2>
        <textarea
          value={invoice.notes}
          onChange={(e) => setInvoice(prev => ({ ...prev, notes: e.target.value }))}
          className="input-field"
          rows={3}
          placeholder="Thank you for your business! Any additional notes or special instructions..."
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

export default InvoiceForm