import React, { useState } from 'react'
import { X, Download, FileText } from 'lucide-react'
import { Invoice } from '../types/invoice'
import { calculateTotals, exportToPDF, exportToDocx } from '../utils/invoiceUtils'
import { useLanguage } from '../contexts/LanguageContext'
import ShareModal from './ShareModal'

interface PreviewInvoiceProps {
  invoice: Invoice
  visible: boolean
  onClose: () => void
  isPremium: boolean
}

const PreviewInvoice: React.FC<PreviewInvoiceProps> = ({
  invoice,
  visible,
  onClose,
  isPremium
}) => {
  const { t } = useLanguage()
  const [showShareModal, setShowShareModal] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const totals = calculateTotals(invoice)

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      await exportToPDF(invoice, isPremium)
      setShowShareModal(true)
    } catch (error) {
      console.error('PDF download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleDownloadDocx = async () => {
    setIsDownloading(true)
    try {
      await exportToDocx(invoice, isPremium)
      setShowShareModal(true)
    } catch (error) {
      console.error('DOCX download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!visible) return null

  const getThemeStyles = () => {
    switch (invoice.theme) {
      case 'modern-blue':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
          header: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
          accent: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-700'
        }
      case 'elegant-green':
        return {
          container: 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20',
          header: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
          accent: 'text-green-600 dark:text-green-400',
          border: 'border-green-200 dark:border-green-700'
        }
      case 'luxury-gold':
        return {
          container: 'bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-800/20',
          header: 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white',
          accent: 'text-yellow-600 dark:text-yellow-400',
          border: 'border-yellow-200 dark:border-yellow-700'
        }
      case 'corporate-navy':
        return {
          container: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20',
          header: 'bg-gradient-to-r from-slate-700 to-slate-800 text-white',
          accent: 'text-slate-700 dark:text-slate-400',
          border: 'border-slate-200 dark:border-slate-700'
        }
      case 'creative-purple':
        return {
          container: 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20',
          header: 'bg-gradient-to-r from-purple-600 to-violet-600 text-white',
          accent: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-200 dark:border-purple-700'
        }
      case 'minimal-gray':
        return {
          container: 'bg-gray-50 dark:bg-gray-900/20',
          header: 'bg-gray-800 text-white',
          accent: 'text-gray-700 dark:text-gray-400',
          border: 'border-gray-200 dark:border-gray-700'
        }
      case 'vibrant-orange':
        return {
          container: 'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20',
          header: 'bg-gradient-to-r from-orange-600 to-red-600 text-white',
          accent: 'text-orange-600 dark:text-orange-400',
          border: 'border-orange-200 dark:border-orange-700'
        }
      case 'professional-teal':
        return {
          container: 'bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-800/20',
          header: 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white',
          accent: 'text-teal-600 dark:text-teal-400',
          border: 'border-teal-200 dark:border-teal-700'
        }
      case 'executive-black':
        return {
          container: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
          header: 'bg-black text-white',
          accent: 'text-black dark:text-white',
          border: 'border-gray-300 dark:border-gray-600'
        }
      default: // classic
        return {
          container: 'bg-white dark:bg-gray-800',
          header: 'bg-gray-800 text-white',
          accent: 'text-gray-900 dark:text-white',
          border: 'border-gray-300 dark:border-gray-600'
        }
    }
  }

  const themeStyles = getThemeStyles()

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('invoice.previewInvoice')}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="btn-primary flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Generating...' : 'Download'} PDF</span>
              </button>
              <button
                onClick={handleDownloadDocx}
                disabled={isDownloading}
                className="btn-secondary flex items-center space-x-1"
                title="Download as HTML (can be opened in Word)"
              >
                <FileText className="w-4 h-4" />
                <span>Word/HTML</span>
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
            <div id="invoice-content" className={`invoice-preview p-8 ${themeStyles.container}`}>
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
                      {invoice.isGST && invoice.companyGSTIN && (
                        <p className="opacity-90">GSTIN: {invoice.companyGSTIN}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <h2 className="text-xl font-bold mb-2">
                      {invoice.isGST ? 'TAX INVOICE' : 'INVOICE'}
                    </h2>
                    <p className="opacity-90">Invoice #: {invoice.number}</p>
                    <p className="opacity-90">Date: {new Date(invoice.date).toLocaleDateString('en-IN')}</p>
                    {invoice.dueDate && (
                      <p className="opacity-90">Due Date: {new Date(invoice.dueDate).toLocaleDateString('en-IN')}</p>
                    )}
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
                  {invoice.isGST && invoice.clientGSTIN && (
                    <p className="text-gray-600 dark:text-gray-300">GSTIN: {invoice.clientGSTIN}</p>
                  )}
                  {invoice.isGST && invoice.placeOfSupply && (
                    <p className="text-gray-600 dark:text-gray-300">Place of Supply: {invoice.placeOfSupply}</p>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <div className="overflow-x-auto">
                  <table className={`w-full border-collapse border ${themeStyles.border}`}>
                    <thead>
                      <tr className={`${themeStyles.header}`}>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-left text-sm font-medium`}>S.No</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-left text-sm font-medium`}>Description</th>
                        {invoice.isGST && (
                          <th className={`border ${themeStyles.border} px-3 py-3 text-left text-sm font-medium`}>HSN/SAC</th>
                        )}
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Qty</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Rate</th>
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Amount</th>
                        {invoice.isGST && (
                          <>
                            <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Tax %</th>
                            <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Tax Amount</th>
                          </>
                        )}
                        <th className={`border ${themeStyles.border} px-3 py-3 text-right text-sm font-medium`}>Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      {invoice.items.map((item, index) => (
                        <tr key={item.id}>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm`}>{index + 1}</td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm`}>{item.description}</td>
                          {invoice.isGST && (
                            <td className={`border ${themeStyles.border} px-3 py-2 text-sm`}>{item.hsnSac}</td>
                          )}
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>{item.quantity}</td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>₹{item.rate.toFixed(2)}</td>
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>₹{item.amount.toFixed(2)}</td>
                          {invoice.isGST && (
                            <>
                              <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>{item.taxRate}%</td>
                              <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right`}>₹{item.taxAmount.toFixed(2)}</td>
                            </>
                          )}
                          <td className={`border ${themeStyles.border} px-3 py-2 text-sm text-right font-medium`}>₹{item.total.toFixed(2)}</td>
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
                      <span className="font-medium">₹{totals.subtotal.toFixed(2)}</span>
                    </div>
                    
                    {invoice.isGST && (
                      <>
                        {totals.cgst > 0 && (
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600 dark:text-gray-300">CGST:</span>
                            <span className="font-medium">₹{totals.cgst.toFixed(2)}</span>
                          </div>
                        )}
                        {totals.sgst > 0 && (
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600 dark:text-gray-300">SGST:</span>
                            <span className="font-medium">₹{totals.sgst.toFixed(2)}</span>
                          </div>
                        )}
                        {totals.igst > 0 && (
                          <div className="flex justify-between py-1">
                            <span className="text-gray-600 dark:text-gray-300">IGST:</span>
                            <span className="font-medium">₹{totals.igst.toFixed(2)}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className={`border-t ${themeStyles.border} mt-2 pt-2`}>
                      <div className="flex justify-between">
                        <span className={`text-lg font-semibold ${themeStyles.accent}`}>Total Amount:</span>
                        <span className={`text-lg font-bold ${themeStyles.accent}`}>₹{totals.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              {invoice.paymentInstructions && (
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${themeStyles.accent} mb-3`}>Payment Instructions:</h3>
                  <div className={`bg-white dark:bg-gray-800 bg-opacity-70 p-4 rounded-lg border ${themeStyles.border}`}>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.paymentInstructions}</p>
                  </div>
                </div>
              )}

              {/* Terms & Conditions */}
              {invoice.terms && (
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${themeStyles.accent} mb-3`}>Terms & Conditions:</h3>
                  <div className={`bg-white dark:bg-gray-800 bg-opacity-70 p-4 rounded-lg border ${themeStyles.border}`}>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.terms}</p>
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">Made with BharatBillGen</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        invoiceNumber={invoice.number}
      />
    </>
  )
}

export default PreviewInvoice