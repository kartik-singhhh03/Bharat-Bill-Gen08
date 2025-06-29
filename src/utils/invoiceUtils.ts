import { Invoice, InvoiceTotals } from '../types/invoice'

export const generateInvoiceNumber = (): string => {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `INV-${year}-${month}-${random}`
}

export const calculateTotals = (invoice: Invoice): InvoiceTotals => {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0)
  
  if (!invoice.isGST) {
    return {
      subtotal,
      cgst: 0,
      sgst: 0,
      igst: 0,
      total: subtotal
    }
  }

  // Determine if it's inter-state or intra-state
  const companyState = invoice.companyGSTIN?.substring(0, 2)
  const clientState = invoice.clientGSTIN?.substring(0, 2) || invoice.placeOfSupply?.substring(0, 2)
  const isInterState = companyState !== clientState

  let cgst = 0
  let sgst = 0
  let igst = 0

  if (isInterState) {
    // Inter-state: IGST
    igst = invoice.items.reduce((sum, item) => sum + item.taxAmount, 0)
  } else {
    // Intra-state: CGST + SGST
    const totalTax = invoice.items.reduce((sum, item) => sum + item.taxAmount, 0)
    cgst = totalTax / 2
    sgst = totalTax / 2
  }

  return {
    subtotal,
    cgst,
    sgst,
    igst,
    total: subtotal + cgst + sgst + igst
  }
}

export const exportToPDF = async (invoice: Invoice, isPremium: boolean): Promise<void> => {
  try {
    const { jsPDF } = await import('jspdf')
    const html2canvas = (await import('html2canvas')).default

    const element = document.getElementById('invoice-content')
    if (!element) {
      throw new Error('Invoice content not found')
    }

    const canvas = await html2canvas(element, {
      scale: 3, // Increased scale for higher quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 0,
      removeContainer: true,
      windowWidth: 1200, // Force desktop-like viewport width
      windowHeight: 10000 // Large height to prevent premature wrapping
    })

    const imgData = canvas.toDataURL('image/png', 1.0) // Maximum quality
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pageHeight
    }

    pdf.save(`${invoice.number}.pdf`)
    
    // Return success to trigger share modal
    return Promise.resolve()
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF. Please try again.')
    throw error
  }
}

// DOCX Export Function (Free Alternative)
export const exportToDocx = async (invoice: Invoice, isPremium: boolean): Promise<void> => {
  try {
    const totals = calculateTotals(invoice)
    
    // Create HTML content for DOCX
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice ${invoice.number}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .company-info { margin-bottom: 20px; }
        .client-info { margin-bottom: 20px; }
        .invoice-details { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        th { background-color: #f0f0f0; }
        .totals { text-align: right; }
        .terms { margin-top: 20px; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${invoice.isGST ? 'TAX INVOICE' : 'INVOICE'}</h1>
        <h2>Invoice #: ${invoice.number}</h2>
        <p>Date: ${new Date(invoice.date).toLocaleDateString('en-IN')}</p>
        ${invoice.dueDate ? `<p>Due Date: ${new Date(invoice.dueDate).toLocaleDateString('en-IN')}</p>` : ''}
    </div>

    <div class="company-info">
        <h3>From:</h3>
        <p><strong>${invoice.companyName}</strong></p>
        <p>${invoice.companyAddress.replace(/\n/g, '<br>')}</p>
        ${invoice.companyPhone ? `<p>Phone: ${invoice.companyPhone}</p>` : ''}
        ${invoice.companyEmail ? `<p>Email: ${invoice.companyEmail}</p>` : ''}
        ${invoice.isGST && invoice.companyGSTIN ? `<p>GSTIN: ${invoice.companyGSTIN}</p>` : ''}
    </div>

    <div class="client-info">
        <h3>Bill To:</h3>
        <p><strong>${invoice.clientName}</strong></p>
        <p>${invoice.clientAddress.replace(/\n/g, '<br>')}</p>
        ${invoice.clientPhone ? `<p>Phone: ${invoice.clientPhone}</p>` : ''}
        ${invoice.clientEmail ? `<p>Email: ${invoice.clientEmail}</p>` : ''}
        ${invoice.isGST && invoice.clientGSTIN ? `<p>GSTIN: ${invoice.clientGSTIN}</p>` : ''}
        ${invoice.isGST && invoice.placeOfSupply ? `<p>Place of Supply: ${invoice.placeOfSupply}</p>` : ''}
    </div>

    <table>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Description</th>
                ${invoice.isGST ? '<th>HSN/SAC</th>' : ''}
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
                ${invoice.isGST ? '<th>Tax %</th>' : ''}
                ${invoice.isGST ? '<th>Tax Amount</th>' : ''}
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${invoice.items.map((item, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.description}</td>
                    ${invoice.isGST ? `<td>${item.hsnSac}</td>` : ''}
                    <td>${item.quantity}</td>
                    <td>₹${item.rate.toFixed(2)}</td>
                    <td>₹${item.amount.toFixed(2)}</td>
                    ${invoice.isGST ? `<td>${item.taxRate}%</td>` : ''}
                    ${invoice.isGST ? `<td>₹${item.taxAmount.toFixed(2)}</td>` : ''}
                    <td>₹${item.total.toFixed(2)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="totals">
        <p>Subtotal: ₹${totals.subtotal.toFixed(2)}</p>
        ${invoice.isGST && totals.cgst > 0 ? `<p>CGST: ₹${totals.cgst.toFixed(2)}</p>` : ''}
        ${invoice.isGST && totals.sgst > 0 ? `<p>SGST: ₹${totals.sgst.toFixed(2)}</p>` : ''}
        ${invoice.isGST && totals.igst > 0 ? `<p>IGST: ₹${totals.igst.toFixed(2)}</p>` : ''}
        <h3>Total: ₹${totals.total.toFixed(2)}</h3>
    </div>

    ${invoice.paymentInstructions ? `
        <div class="payment-instructions">
            <h3>Payment Instructions:</h3>
            <p>${invoice.paymentInstructions.replace(/\n/g, '<br>')}</p>
        </div>
    ` : ''}

    ${invoice.terms ? `
        <div class="terms">
            <h3>Terms & Conditions:</h3>
            <p>${invoice.terms.replace(/\n/g, '<br>')}</p>
        </div>
    ` : ''}

    ${invoice.notes ? `
        <div class="notes">
            <h3>Notes:</h3>
            <p>${invoice.notes.replace(/\n/g, '<br>')}</p>
        </div>
    ` : ''}

    ${!isPremium ? `
        <div class="footer">
            <p>Made with BharatBillGen - Free GST Invoice Generator</p>
        </div>
    ` : ''}
</body>
</html>
    `

    // Create and download the HTML file (which can be opened in Word)
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${invoice.number}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Show instructions to user
    alert('HTML file downloaded! You can:\n1. Open it in Microsoft Word\n2. Save as DOCX from Word\n3. Or use it as-is for web viewing')
    
    return Promise.resolve()
  } catch (error) {
    console.error('Error generating DOCX:', error)
    alert('Error generating document. Please try again.')
    throw error
  }
}

export const shareViaWhatsApp = (invoiceNumber?: string): void => {
  const message = encodeURIComponent(
    `Check out this free GST invoice generator for Indian businesses! 🇮🇳\n\n` +
    `✅ GST compliant invoices\n` +
    `✅ Works offline\n` +
    `✅ No registration needed\n` +
    `✅ Professional templates\n\n` +
    `https://bharatbillgen.vercel.app`
  )
  window.open(`https://wa.me/?text=${message}`, '_blank')
}