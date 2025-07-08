import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ResponsivePreviewModal from './ResponsivePreviewModal'
import { calculateTotals, exportToPDF } from '../utils/invoiceUtils'
import { getCurrencyByCode } from '../data/currencies'
import { exchangeRateService } from '../utils/exchangeRates'

const EnhancedPreviewInvoice = ({ 
  invoice, 
  visible, 
  onClose, 
  isPremium,
  selectedCurrency = 'INR',
  exchangeRate = 1 
}) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const totals = calculateTotals(invoice)
  const currency = getCurrencyByCode(selectedCurrency)

  const convertAmount = (amount) => {
    return selectedCurrency === 'INR' ? amount : amount * exchangeRate
  }

  const formatCurrency = (amount) => {
    const convertedAmount = convertAmount(amount)
    return `${currency.symbol}${convertedAmount.toFixed(2)}`
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await exportToPDF(invoice, isPremium)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

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
      default:
        return {
          container: 'bg-white dark:bg-gray-800',
          header: 'bg-gradient-to-r from-gray-800 to-gray-900 text-white',
          accent: 'text-gray-900 dark:text-white',
          border: 'border-gray-300 dark:border-gray-600'
        }
    }
  }

  const themeStyles = getThemeStyles()

  return (
    <ResponsivePreviewModal
      isOpen={visible}
      onClose={onClose}
      title="🚀 Enhanced Invoice Preview"
      invoice={invoice}
      onDownload={handleDownload}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        id="invoice-content"
        className={`invoice-preview ${themeStyles.container} rounded-lg overflow-hidden`}
      >
        {/* Glassmorphism Header */}
        <div className={`${themeStyles.header} p-8 relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                {invoice.companyLogo && (
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    src={invoice.companyLogo}
                    alt="Company Logo"
                    className="w-20 h-20 object-contain bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30"
                  />
                )}
                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold mb-2"
                  >
                    {invoice.companyName}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-1 opacity-90"
                  >
                    <p className="whitespace-pre-line">{invoice.companyAddress}</p>
                    {invoice.companyPhone && <p>📞 {invoice.companyPhone}</p>}
                    {invoice.companyEmail && <p>📧 {invoice.companyEmail}</p>}
                    {invoice.isGST && invoice.companyGSTIN && <p>🏛️ GSTIN: {invoice.companyGSTIN}</p>}
                  </motion.div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-right bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30"
              >
                <h2 className="text-2xl font-bold mb-3">
                  {invoice.isGST ? 'TAX INVOICE' : 'INVOICE'}
                </h2>
                <div className="space-y-1 text-sm">
                  <p><strong>Invoice #:</strong> {invoice.number}</p>
                  <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
                  {invoice.dueDate && (
                    <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
                  )}
                  {selectedCurrency !== 'INR' && (
                    <p><strong>Currency:</strong> {currency.name}</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-8"
        >
          <h3 className={`text-xl font-semibold ${themeStyles.accent} mb-4`}>Bill To:</h3>
          <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border ${themeStyles.border} shadow-lg`}>
            <p className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{invoice.clientName}</p>
            <div className="space-y-1 text-gray-600 dark:text-gray-300">
              <p className="whitespace-pre-line">{invoice.clientAddress}</p>
              {invoice.clientPhone && <p>📞 {invoice.clientPhone}</p>}
              {invoice.clientEmail && <p>📧 {invoice.clientEmail}</p>}
              {invoice.isGST && invoice.clientGSTIN && <p>🏛️ GSTIN: {invoice.clientGSTIN}</p>}
              {invoice.isGST && invoice.placeOfSupply && <p>📍 Place of Supply: {invoice.placeOfSupply}</p>}
            </div>
          </div>
        </motion.div>

        {/* Items Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="px-8 pb-8"
        >
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse border-2 ${themeStyles.border} rounded-xl overflow-hidden shadow-lg`}>
              <thead>
                <tr className={`${themeStyles.header}`}>
                  <th className={`border ${themeStyles.border} px-4 py-4 text-left text-sm font-semibold`}>#</th>
                  <th className={`border ${themeStyles.border} px-4 py-4 text-left text-sm font-semibold`}>Description</th>
                  {invoice.isGST && (
                    <th className={`border ${themeStyles.border} px-4 py-4 text-left text-sm font-semibold`}>HSN/SAC</th>
                  )}
                  <th className={`border ${themeStyles.border} px-4 py-4 text-right text-sm font-semibold`}>Qty</th>
                  <th className={`border ${themeStyles.border} px-4 py-4 text-right text-sm font-semibold`}>Rate</th>
                  <th className={`border ${themeStyles.border} px-4 py-4 text-right text-sm font-semibold`}>Amount</th>
                  {invoice.isGST && (
                    <>
                      <th className={`border ${themeStyles.border} px-4 py-4 text-right text-sm font-semibold`}>Tax %</th>
                      <th className={`border ${themeStyles.border} px-4 py-4 text-right text-sm font-semibold`}>Tax</th>
                    </>
                  )}
                  <th className={`border ${themeStyles.border} px-4 py-4 text-right text-sm font-semibold`}>Total</th>
                </tr>
              </thead>
              <tbody className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                {invoice.items.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className={`border ${themeStyles.border} px-4 py-3 text-sm`}>{index + 1}</td>
                    <td className={`border ${themeStyles.border} px-4 py-3 text-sm font-medium`}>{item.description}</td>
                    {invoice.isGST && (
                      <td className={`border ${themeStyles.border} px-4 py-3 text-sm`}>{item.hsnSac}</td>
                    )}
                    <td className={`border ${themeStyles.border} px-4 py-3 text-sm text-right`}>{item.quantity}</td>
                    <td className={`border ${themeStyles.border} px-4 py-3 text-sm text-right`}>{formatCurrency(item.rate)}</td>
                    <td className={`border ${themeStyles.border} px-4 py-3 text-sm text-right`}>{formatCurrency(item.amount)}</td>
                    {invoice.isGST && (
                      <>
                        <td className={`border ${themeStyles.border} px-4 py-3 text-sm text-right`}>{item.taxRate}%</td>
                        <td className={`border ${themeStyles.border} px-4 py-3 text-sm text-right`}>{formatCurrency(item.taxAmount)}</td>
                      </>
                    )}
                    <td className={`border ${themeStyles.border} px-4 py-3 text-sm text-right font-semibold`}>{formatCurrency(item.total)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Totals Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="px-8 pb-8"
        >
          <div className="flex justify-end">
            <div className="w-full max-w-md">
              <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border ${themeStyles.border} shadow-lg`}>
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                    <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
                  </div>
                  
                  {invoice.isGST && (
                    <>
                      {totals.cgst > 0 && (
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600 dark:text-gray-300">CGST:</span>
                          <span className="font-medium">{formatCurrency(totals.cgst)}</span>
                        </div>
                      )}
                      {totals.sgst > 0 && (
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600 dark:text-gray-300">SGST:</span>
                          <span className="font-medium">{formatCurrency(totals.sgst)}</span>
                        </div>
                      )}
                      {totals.igst > 0 && (
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600 dark:text-gray-300">IGST:</span>
                          <span className="font-medium">{formatCurrency(totals.igst)}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className={`border-t ${themeStyles.border} pt-3 mt-3`}>
                    <div className="flex justify-between">
                      <span className={`text-xl font-bold ${themeStyles.accent}`}>Total Amount:</span>
                      <span className={`text-xl font-bold ${themeStyles.accent}`}>{formatCurrency(totals.total)}</span>
                    </div>
                    {selectedCurrency !== 'INR' && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
                        Exchange Rate: 1 INR = {exchangeRate.toFixed(4)} {selectedCurrency}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Sections */}
        {(invoice.paymentInstructions || invoice.terms || invoice.notes) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="px-8 pb-8 space-y-6"
          >
            {invoice.paymentInstructions && (
              <div>
                <h3 className={`text-lg font-semibold ${themeStyles.accent} mb-3`}>Payment Instructions:</h3>
                <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border ${themeStyles.border}`}>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.paymentInstructions}</p>
                </div>
              </div>
            )}

            {invoice.terms && (
              <div>
                <h3 className={`text-lg font-semibold ${themeStyles.accent} mb-3`}>Terms & Conditions:</h3>
                <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border ${themeStyles.border}`}>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.terms}</p>
                </div>
              </div>
            )}

            {invoice.notes && (
              <div>
                <h3 className={`text-lg font-semibold ${themeStyles.accent} mb-3`}>Notes:</h3>
                <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border ${themeStyles.border}`}>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{invoice.notes}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Footer */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={`text-center py-6 border-t ${themeStyles.border} bg-gray-50/50 dark:bg-gray-900/50`}
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Made with ❤️ using BharatBillGen - Enhanced AI Invoice Generator
            </p>
          </motion.div>
        )}
      </motion.div>
    </ResponsivePreviewModal>
  )
}

export default EnhancedPreviewInvoice