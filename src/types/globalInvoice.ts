export interface GlobalInvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  taxRate: number
  amount: number
  taxAmount: number
  total: number
}

export interface GlobalInvoice {
  number: string
  date: string
  dueDate: string
  currency: string
  country: string
  companyName: string
  companyAddress: string
  companyTaxId: string
  companyPhone: string
  companyEmail: string
  companyLogo: string
  clientName: string
  clientAddress: string
  clientTaxId: string
  clientPhone: string
  clientEmail: string
  items: GlobalInvoiceItem[]
  notes: string
  theme: string
  taxLabel: string // VAT, GST, Sales Tax, etc.
  paymentTerms: string
}

export interface GlobalInvoiceTotals {
  subtotal: number
  tax: number
  total: number
}

export interface CountryConfig {
  code: string
  name: string
  currency: string
  currencySymbol: string
  taxLabel: string
  taxRates: number[]
  invoicePrefix: string
  dateFormat: string
  flag: string
}