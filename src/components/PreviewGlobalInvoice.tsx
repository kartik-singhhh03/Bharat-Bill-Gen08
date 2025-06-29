import React, { useState } from 'react'
import { X, Download } from 'lucide-react'
import { GlobalInvoice } from '../types/globalInvoice'
import { getCountryConfig } from '../utils/ipDetection'
import ShareModal from './ShareModal'

interface PreviewGlobalInvoiceProps {
  invoice: GlobalInvoice
  visible: boolean
  onClose: () => void
  isPremium: boolean
}

const PreviewGlobalInvoice: React.FC<PreviewGlobalInvoiceProps> = ({
  invoice,
  visible,
  onClose,
  isPremium
}) => {
  const [showShareModal, setShowShareModal] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const countryConfig = getCountryConfig(invoice.country)

  const calculateTotals = () => {
    const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = invoice.items.reduce((sum, item) => sum + item.taxAmount, 0)
    const total = subtotal + tax
    
    return { subtotal, tax, total }
  }

  const totals = calculateTotals()

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const { jsPDF } = await import('jspdf')
      const html2canvas = (await import('html2canvas')).default

      const element = document.getElementById('global-invoice-content')
      if (!element) {
        throw new Error('Invoice content not found')
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${invoice.number}.pdf`)
      setShowShareModal(true)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const getThemeStyles = () => {
    switch (invoice.theme) {
      case 'professional':
        return {
          container: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
          header: 'bg-gradient-to-r from-gray-700 to-gray-800 text-white',
          accent: 'text-gray-700 dark:text-gray-300',
          border: 'border-gray-300 dark:border-gray-600'
        }
      case 'modern-global':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20',
          header: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
          accent: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-700'
        }
      case 'luxury-international':
        return {
          container: 'bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20',
          header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          accent: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-700'
        }
      case 'corporate-global':
        return {
          container: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20',
          header: 'bg-gradient-to-r from-slate-700 to-slate-800 text-white',
          accent: 'text-slate-700 dark:text-slate-400',
          border: 'border-slate-200 dark:border-slate-700'
        }
      case 'creative-international':
        return {
          container: 'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20',
          header: 'bg-gradient-to-r from-orange-600 to-red-600 text-white',
          accent: 'text-orange-600 dark:text-orange-400',
          border: 'border-orange-200 dark:border-orange-700'
        }
      default: // international
        return {
          container: 'bg-white dark:bg-gray-800',
          header: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
          accent: 'text-blue-600 dark:text-blue-400',
          border: 'border-gray-300 dark:border-gray-600'
        }
    }
  }

  const themeStyles = getThemeStyles()

  if (!visible) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              🌍 International Invoice Preview
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="btn-primary flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Generating...' : 'Download'} PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div className="overflow-auto max-h-[calc(90vh-80px)]">
            <div id="global-invoice-content" className={`invoice-preview p-8 ${themeStyles.container}`}>
              {/* Header */}
              <div className={`${themeStyles.header} p-6 rounded-lg mb-6`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {invoice.companyLogo && (
                      <img
                        src={invoice.companyLogo}
                        alt="Company Logo"
                        className="w-16 h-16 object-contain bg-white rounded-lg p-2"
                      />
                    )}
                    <div>
                      <h1 className="text-2xl font-bold">{invoice.companyName}</h1>
                      <p className="opacity-90 whitespace-pre-line">{invoice.companyAddress}</p>
                      {invoice.companyPhone && <p className="opacity-90">Phone: {invoice.companyPhone}</p>}
                      {invoice.companyEmail && <p className="opacity-90">Email: {invoice.companyEmail}</p>}
                      {invoice.companyTaxId && (
                        <p className="opacity-90">{countryConfig.taxLabel} ID: {invoice.companyTaxId}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <h2 className="text-xl font-bold mb-2">INVOICE</h2>
                    <p className="opacity-90">Invoice #: {invoice.number}</p>
                    <p className="opacity-90">Date: {new Date(invoice.date).toLocaleDateString()}</p>
                    {invoice.dueDate && (
                      <p className="opacity-90">Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                    )}
                    <p className="opacity-90">Currency: {countryConfig.currency}</p>
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div className="mb-8">
                <h3 className={`text-lg font-semibold ${themeStyles.accent} mb-3`}>Bill To:</h3>
                <div className={`bg-white dark:bg-gray-800 bg-opacity-70 p-4 rounded-lg border ${themeStyles.border}`}>
                  <p className="font-medium text-gray-900 dark:text-white">{invoice.clientName}</p>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.clientAddress}</p>
                  {invoice.clientPhone && <p className="text-gray-600 dark:text-gray-300">Phone: {invoice.clientPhone}</p>}
                  {invoice.clientEmail && <p className="text-gray-600 dark:text-gray-300">Email: {invoice.clientEmail}</p>}
                  {invoice.clientTaxId && (
                    <p className="text-gray-600 dark:text-gray-300">{countryConfig.taxLabel} ID: {invoice.clientTaxId}</p>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <div className="overflow-x-auto">
                  <table className={`w-full border-collapse border ${themeStyles.border}`}>
                    <thead>
                      <tr className={`${themeStyles.header}`}>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-left text-sm font-medium`}>#</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-left text-sm font-medium`}>Description</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Qty</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Rate</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Amount</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>{countryConfig.taxLabel} %</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Tax</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      {invoice.items.map((item, index) => (
                        <tr key={item.id}>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm`}>{index + 1}</td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm`}>{item.description}</td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>{item.quantity}</td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>
                            {countryConfig.currencySymbol}{item.rate.toFixed(2)}
                          </td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>
                            {countryConfig.currencySymbol}{item.amount.toFixed(2)}
                          </td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>{item.taxRate}%</td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>
                            {countryConfig.currencySymbol}{item.taxAmount.toFixed(2)}
                          </td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right font-medium`}>
                            {countryConfig.currencySymbol}{item.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-full max-w-sm">
                  <div className={`bg-white dark:bg-gray-800 bg-opacity-70 p-4 rounded-lg border ${themeStyles.border}`}>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                      <span className="font-medium">{countryConfig.currencySymbol}{totals.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600 dark:text-gray-300">{countryConfig.taxLabel}:</span>
                      <span className="font-medium">{countryConfig.currencySymbol}{totals.tax.toFixed(2)}</span>
                    </div>
                    
                    <div className={`border-t ${themeStyles.border} mt-2 pt-2`}>
                      <div className="flex justify-between">
                        <span className={`text-lg font-semibold ${themeStyles.accent}`}>Total:</span>
                        <span className={`text-lg font-bold ${themeStyles.accent}`}>
                          {countryConfig.currencySymbol}{totals.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Terms */}
              {invoice.paymentTerms && (
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold ${themeStyles.accent} mb-2`}>Payment Terms:</h3>
                  <div className={`bg-white dark:bg-gray-800 bg-opacity-70 p-3 rounded-lg border ${themeStyles.border}`}>
                    <p className="text-gray-600 dark:text-gray-300">{invoice.paymentTerms}</p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {invoice.notes && (
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${themeStyles.accent} mb-3`}>Notes:</h3>
                  <div className={`bg-white dark:bg-gray-800 bg-opacity-70 p-4 rounded-lg border ${themeStyles.border}`}>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.notes}</p>
                  </div>
                </div>
              )}

              {/* Footer */}
              {!isPremium && (
                <div className={`text-center pt-8 border-t ${themeStyles.border}`}>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Made with BharatBillGen - Global Invoice Generator
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        invoiceNumber={invoice.number}
      />
    </>
  )
}

export default PreviewGlobalInvoice