import React, { useState } from 'react'
import { Mail, Send, Loader, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import html2pdf from 'html2pdf.js'

const EmailInvoice = ({ invoice, className = '' }) => {
  const [emailData, setEmailData] = useState({
    to: invoice?.clientEmail || '',
    subject: `Invoice ${invoice?.number || ''} from ${invoice?.companyName || 'Your Company'}`,
    message: `Dear ${invoice?.clientName || 'Valued Client'},\n\nPlease find attached your invoice.\n\nThank you for your business!\n\nBest regards,\n${invoice?.companyName || 'Your Company'}`
  })
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  // EmailJS configuration (you'll need to set these up)
  const EMAILJS_SERVICE_ID = 'your_service_id'
  const EMAILJS_TEMPLATE_ID = 'your_template_id'
  const EMAILJS_PUBLIC_KEY = 'your_public_key'

  const generatePDFBlob = async () => {
    const element = document.getElementById('invoice-content')
    if (!element) {
      throw new Error('Invoice content not found')
    }

    const opt = {
      margin: 1,
      filename: `invoice_${invoice.number}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    return await html2pdf().set(opt).from(element).outputPdf('blob')
  }

  const sendEmail = async () => {
    if (!emailData.to.trim()) {
      setError('Please enter recipient email address')
      return
    }

    setIsSending(true)
    setError(null)

    try {
      // Generate PDF
      const pdfBlob = await generatePDFBlob()
      
      // Convert blob to base64 for EmailJS
      const reader = new FileReader()
      reader.readAsDataURL(pdfBlob)
      
      reader.onload = async () => {
        const base64PDF = reader.result.split(',')[1]
        
        const templateParams = {
          to_email: emailData.to,
          subject: emailData.subject,
          message: emailData.message,
          from_name: invoice.companyName,
          invoice_number: invoice.number,
          attachment: base64PDF,
          attachment_name: `invoice_${invoice.number}.pdf`
        }

        try {
          await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
          )
          
          setSent(true)
          
          // Save to sent history
          const sentHistory = JSON.parse(localStorage.getItem('sent_invoices') || '[]')
          sentHistory.push({
            invoiceNumber: invoice.number,
            sentTo: emailData.to,
            sentAt: new Date().toISOString(),
            subject: emailData.subject
          })
          localStorage.setItem('sent_invoices', JSON.stringify(sentHistory))
          
        } catch (emailError) {
          console.error('EmailJS error:', emailError)
          // Fallback to mailto
          const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.message)}`
          window.open(mailtoLink, '_blank')
          setSent(true)
        }
      }
      
      reader.onerror = () => {
        throw new Error('Failed to process PDF for email')
      }
      
    } catch (err) {
      console.error('Email sending failed:', err)
      setError('Failed to send email. Please try again or use the download option.')
    } finally {
      setIsSending(false)
    }
  }

  const resetForm = () => {
    setSent(false)
    setError(null)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-8 ${className}`}
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Email Sent Successfully!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Invoice has been sent to {emailData.to}
        </p>
        <button
          onClick={resetForm}
          className="btn-secondary"
        >
          Send Another Email
        </button>
      </motion.div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Mail className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          📧 Email Invoice
        </h3>
      </div>

      {/* Email Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Recipient Email *
          </label>
          <input
            type="email"
            value={emailData.to}
            onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
            className="input-field"
            placeholder="client@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={emailData.subject}
            onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <textarea
            value={emailData.message}
            onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
            className="input-field"
            rows={5}
            placeholder="Enter your message to the client..."
          />
        </div>
      </div>

      {/* Send Button */}
      <motion.button
        onClick={sendEmail}
        disabled={isSending || !emailData.to.trim()}
        className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSending ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Sending Email...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Send Invoice via Email</span>
          </>
        )}
      </motion.button>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Email Features:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Automatically attaches PDF invoice</li>
          <li>• Professional email templates</li>
          <li>• Tracks sent invoice history</li>
          <li>• Fallback to default email client</li>
          <li>• Customizable subject and message</li>
        </ul>
      </div>
    </div>
  )
}

export default EmailInvoice