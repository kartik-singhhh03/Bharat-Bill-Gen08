import { GlobalInvoice, GlobalInvoiceItem } from '../types/globalInvoice'
import { getCountryConfig } from './ipDetection'

export const generateGlobalInvoiceNumber = (countryCode: string): string => {
  const config = getCountryConfig(countryCode)
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${config.invoicePrefix}-${year}-${month}-${random}`
}

export const calculateGlobalTotals = (invoice: GlobalInvoice) => {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0)
  const tax = invoice.items.reduce((sum, item) => sum + item.taxAmount, 0)
  const total = subtotal + tax
  
  return { subtotal, tax, total }
}

export const createGlobalInvoiceItem = (): GlobalInvoiceItem => {
  return {
    id: Date.now().toString(),
    description: '',
    quantity: 1,
    rate: 0,
    taxRate: 0,
    amount: 0,
    taxAmount: 0,
    total: 0
  }
}

export const updateGlobalInvoiceItem = (
  item: GlobalInvoiceItem,
  field: keyof GlobalInvoiceItem,
  value: any
): GlobalInvoiceItem => {
  const updatedItem = { ...item, [field]: value }
  
  // Recalculate amounts
  updatedItem.amount = updatedItem.quantity * updatedItem.rate
  updatedItem.taxAmount = (updatedItem.amount * updatedItem.taxRate) / 100
  updatedItem.total = updatedItem.amount + updatedItem.taxAmount
  
  return updatedItem
}

export const shareGlobalInvoiceViaWhatsApp = (invoiceNumber?: string): void => {
  const message = encodeURIComponent(
    `Check out this amazing international invoice generator! 🌍\n\n` +
    `✅ Multi-currency support\n` +
    `✅ Country-specific templates\n` +
    `✅ Works offline\n` +
    `✅ No registration needed\n` +
    `✅ Professional designs\n\n` +
    `Perfect for freelancers and businesses worldwide!\n\n` +
    `https://bharatbillgen.vercel.app`
  )
  window.open(`https://wa.me/?text=${message}`, '_blank')
}