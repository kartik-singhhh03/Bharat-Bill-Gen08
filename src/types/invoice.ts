export interface InvoiceItem {
  id: string
  description: string
  hsnSac: string
  quantity: number
  rate: number
  taxRate: number
  amount: number
  taxAmount: number
  total: number
}

export interface Invoice {
  number: string
  date: string
  dueDate: string
  isGST: boolean
  companyName: string
  companyAddress: string
  companyGSTIN: string
  companyPhone: string
  companyEmail: string
  companyLogo: string
  clientName: string
  clientAddress: string
  clientGSTIN: string
  clientPhone: string
  clientEmail: string
  placeOfSupply: string
  items: InvoiceItem[]
  notes: string
  terms: string // Added terms & conditions
  theme: string
  paymentInstructions: string // Added payment instructions
  balanceDue: number // Added balance due tracking
}

export interface InvoiceTotals {
  subtotal: number
  cgst: number
  sgst: number
  igst: number
  total: number
}