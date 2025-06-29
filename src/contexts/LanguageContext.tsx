import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'gu' | 'bn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    'header.generator': 'Generator',
    'header.guide': 'Guide',
    'header.themes': 'Themes',
    'header.features': 'Features',
    'header.whiteLabel': 'White Label',
    'header.support': 'Support',
    'header.unlockPro': 'Unlock Pro',
    'header.premiumActive': 'Premium Active',
    'header.darkMode': 'Dark Mode',
    'header.lightMode': 'Light Mode',
    
    // Invoice Form
    'invoice.settings': 'Invoice Settings',
    'invoice.number': 'Invoice Number',
    'invoice.date': 'Date',
    'invoice.dueDate': 'Due Date (Optional)',
    'invoice.gstInvoice': 'GST Invoice',
    'invoice.gstEnabled': 'GST Enabled',
    'invoice.nonGst': 'Non-GST',
    'invoice.theme': 'Invoice Theme',
    'invoice.businessDetails': 'Your Business Details',
    'invoice.companyLogo': 'Company Logo',
    'invoice.uploadLogo': 'Upload Logo',
    'invoice.companyName': 'Company Name',
    'invoice.gstin': 'GSTIN',
    'invoice.address': 'Address',
    'invoice.phone': 'Phone',
    'invoice.email': 'Email',
    'invoice.clientDetails': 'Client Details',
    'invoice.clientName': 'Client Name',
    'invoice.clientGstin': 'Client GSTIN',
    'invoice.clientAddress': 'Client Address',
    'invoice.placeOfSupply': 'Place of Supply',
    'invoice.items': 'Items',
    'invoice.addItem': 'Add Item',
    'invoice.description': 'Description',
    'invoice.hsnSac': 'HSN/SAC Code',
    'invoice.quantity': 'Qty',
    'invoice.rate': 'Rate',
    'invoice.taxPercent': 'Tax %',
    'invoice.total': 'Total',
    'invoice.notes': 'Additional Notes',
    'invoice.previewInvoice': 'Preview Invoice',
    
    // Common
    'common.required': 'Required',
    'common.optional': 'Optional',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.download': 'Download',
    'common.share': 'Share',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.yes': 'Yes',
    'common.no': 'No',
    
    // Share Modal
    'share.title': 'Invoice Generated!',
    'share.subtitle': 'has been downloaded successfully',
    'share.lovedTool': 'Loved this tool?',
    'share.helpOthers': 'Help other entrepreneurs discover this free GST invoice generator!',
    'share.whatsapp': 'Share via WhatsApp',
    'share.copyLink': 'Copy Link',
    'share.linkCopied': 'Link Copied!',
    'share.whyShare': 'Why share BharatBillGen?',
    'share.reason1': 'Help fellow entrepreneurs save time',
    'share.reason2': 'Support free tools for Indian businesses',
    'share.reason3': 'Spread awareness about GST compliance',
    'share.maybeLater': 'Maybe later',
    
    // Language Selector
    'language.select': 'Select Language',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
    'language.tamil': 'தமிழ்',
    'language.gujarati': 'ગુજરાતી',
    'language.bengali': 'বাংলা'
  },
  hi: {
    // Header
    'header.generator': 'जेनरेटर',
    'header.guide': 'गाइड',
    'header.themes': 'थीम',
    'header.features': 'फीचर्स',
    'header.whiteLabel': 'व्हाइट लेबल',
    'header.support': 'सहायता',
    'header.unlockPro': 'प्रो अनलॉक करें',
    'header.premiumActive': 'प्रीमियम सक्रिय',
    'header.darkMode': 'डार्क मोड',
    'header.lightMode': 'लाइट मोड',
    
    // Invoice Form
    'invoice.settings': 'इनवॉइस सेटिंग्स',
    'invoice.number': 'इनवॉइस नंबर',
    'invoice.date': 'दिनांक',
    'invoice.dueDate': 'देय तिथि (वैकल्पिक)',
    'invoice.gstInvoice': 'जीएसटी इनवॉइस',
    'invoice.gstEnabled': 'जीएसटी सक्षम',
    'invoice.nonGst': 'गैर-जीएसटी',
    'invoice.theme': 'इनवॉइस थीम',
    'invoice.businessDetails': 'आपके व्यवसाय का विवरण',
    'invoice.companyLogo': 'कंपनी लोगो',
    'invoice.uploadLogo': 'लोगो अपलोड करें',
    'invoice.companyName': 'कंपनी का नाम',
    'invoice.gstin': 'जीएसटीआईएन',
    'invoice.address': 'पता',
    'invoice.phone': 'फोन',
    'invoice.email': 'ईमेल',
    'invoice.clientDetails': 'ग्राहक विवरण',
    'invoice.clientName': 'ग्राहक का नाम',
    'invoice.clientGstin': 'ग्राहक जीएसटीआईएन',
    'invoice.clientAddress': 'ग्राहक का पता',
    'invoice.placeOfSupply': 'आपूर्ति का स्थान',
    'invoice.items': 'आइटम',
    'invoice.addItem': 'आइटम जोड़ें',
    'invoice.description': 'विवरण',
    'invoice.hsnSac': 'एचएसएन/एसएसी कोड',
    'invoice.quantity': 'मात्रा',
    'invoice.rate': 'दर',
    'invoice.taxPercent': 'कर %',
    'invoice.total': 'कुल',
    'invoice.notes': 'अतिरिक्त नोट्स',
    'invoice.previewInvoice': 'इनवॉइस पूर्वावलोकन',
    
    // Share Modal
    'share.title': 'इनवॉइस तैयार!',
    'share.subtitle': 'सफलतापूर्वक डाउनलोड हो गया है',
    'share.lovedTool': 'यह टूल पसंद आया?',
    'share.helpOthers': 'अन्य उद्यमियों को इस मुफ्त जीएसटी इनवॉइस जेनरेटर की खोज में मदद करें!',
    'share.whatsapp': 'व्हाट्सऐप के माध्यम से साझा करें',
    'share.copyLink': 'लिंक कॉपी करें',
    'share.linkCopied': 'लिंक कॉपी हो गया!',
    'share.whyShare': 'BharatBillGen को क्यों साझा करें?',
    'share.reason1': 'साथी उद्यमियों का समय बचाने में मदद करें',
    'share.reason2': 'भारतीय व्यवसायों के लिए मुफ्त टूल्स का समर्थन करें',
    'share.reason3': 'जीएसटी अनुपालन के बारे में जागरूकता फैलाएं',
    'share.maybeLater': 'शायद बाद में',
    
    // Language Selector
    'language.select': 'भाषा चुनें',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
    'language.tamil': 'தமிழ்',
    'language.gujarati': 'ગુજરાતી',
    'language.bengali': 'বাংলা'
  },
  mr: {
    // Header
    'header.generator': 'जनरेटर',
    'header.guide': 'मार्गदर्शक',
    'header.themes': 'थीम',
    'header.features': 'वैशिष्ट्ये',
    'header.whiteLabel': 'व्हाइट लेबल',
    'header.support': 'सहाय्य',
    'header.unlockPro': 'प्रो अनलॉक करा',
    'header.premiumActive': 'प्रीमियम सक्रिय',
    
    // Invoice Form
    'invoice.settings': 'इनव्हॉइस सेटिंग्ज',
    'invoice.number': 'इनव्हॉइस क्रमांक',
    'invoice.date': 'दिनांक',
    'invoice.dueDate': 'देय दिनांक (पर्यायी)',
    'invoice.gstInvoice': 'जीएसटी इनव्हॉइस',
    'invoice.gstEnabled': 'जीएसटी सक्षम',
    'invoice.nonGst': 'गैर-जीएसटी',
    'invoice.businessDetails': 'तुमच्या व्यवसायाचे तपशील',
    'invoice.companyName': 'कंपनीचे नाव',
    'invoice.clientDetails': 'ग्राहक तपशील',
    'invoice.clientName': 'ग्राहकाचे नाव',
    'invoice.items': 'वस्तू',
    'invoice.addItem': 'वस्तू जोडा',
    'invoice.previewInvoice': 'इनव्हॉइस पूर्वावलोकन',
    
    // Language Selector
    'language.select': 'भाषा निवडा',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
    'language.tamil': 'தமிழ்',
    'language.gujarati': 'ગુજરાતી',
    'language.bengali': 'বাংলা'
  },
  ta: {
    // Header
    'header.generator': 'ஜெனரேட்டர்',
    'header.guide': 'வழிகாட்டி',
    'header.themes': 'தீம்கள்',
    'header.features': 'அம்சங்கள்',
    'header.whiteLabel': 'வைட் லேபல்',
    'header.support': 'ஆதரவு',
    'header.unlockPro': 'ப்ரோ அன்லாக் செய்யுங்கள்',
    'header.premiumActive': 'பிரீமியம் செயலில்',
    
    // Invoice Form
    'invoice.settings': 'இன்வாய்ஸ் அமைப்புகள்',
    'invoice.number': 'இன்வாய்ஸ் எண்',
    'invoice.date': 'தேதி',
    'invoice.dueDate': 'செலுத்த வேண்டிய தேதி (விருப்பம்)',
    'invoice.gstInvoice': 'ஜிஎஸ்டி இன்வாய்ஸ்',
    'invoice.gstEnabled': 'ஜிஎஸ்டி இயக்கப்பட்டது',
    'invoice.nonGst': 'ஜிஎஸ்டி அல்லாத',
    'invoice.businessDetails': 'உங்கள் வணிக விவரங்கள்',
    'invoice.companyName': 'நிறுவனத்தின் பெயர்',
    'invoice.clientDetails': 'வாடிக்கையாளர் விவரங்கள்',
    'invoice.clientName': 'வாடிக்கையாளர் பெயர்',
    'invoice.items': 'பொருட்கள்',
    'invoice.addItem': 'பொருள் சேர்க்கவும்',
    'invoice.previewInvoice': 'இன்வாய்ஸ் முன்னோட்டம்',
    
    // Language Selector
    'language.select': 'மொழியைத் தேர்ந்தெடுக்கவும்',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
    'language.tamil': 'தமிழ்',
    'language.gujarati': 'ગુજરાતી',
    'language.bengali': 'বাংলা'
  },
  gu: {
    // Header
    'header.generator': 'જનરેટર',
    'header.guide': 'માર્ગદર્શિકા',
    'header.themes': 'થીમ્સ',
    'header.features': 'લક્ષણો',
    'header.whiteLabel': 'વ્હાઇટ લેબલ',
    'header.support': 'સહાય',
    'header.unlockPro': 'પ્રો અનલોક કરો',
    'header.premiumActive': 'પ્રીમિયમ સક્રિય',
    
    // Invoice Form
    'invoice.settings': 'ઇન્વૉઇસ સેટિંગ્સ',
    'invoice.number': 'ઇન્વૉઇસ નંબર',
    'invoice.date': 'તારીખ',
    'invoice.dueDate': 'બાકી તારીખ (વૈકલ્પિક)',
    'invoice.gstInvoice': 'જીએસટી ઇન્વૉઇસ',
    'invoice.gstEnabled': 'જીએસટી સક્ષમ',
    'invoice.nonGst': 'બિન-જીએસટી',
    'invoice.businessDetails': 'તમારા વ્યવસાયની વિગતો',
    'invoice.companyName': 'કંપનીનું નામ',
    'invoice.clientDetails': 'ગ્રાહક વિગતો',
    'invoice.clientName': 'ગ્રાહકનું નામ',
    'invoice.items': 'વસ્તુઓ',
    'invoice.addItem': 'વસ્તુ ઉમેરો',
    'invoice.previewInvoice': 'ઇન્વૉઇસ પૂર્વાવલોકન',
    
    // Language Selector
    'language.select': 'ભાષા પસંદ કરો',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
    'language.tamil': 'தமிழ்',
    'language.gujarati': 'ગુજરાતી',
    'language.bengali': 'বাংলা'
  },
  bn: {
    // Header
    'header.generator': 'জেনারেটর',
    'header.guide': 'গাইড',
    'header.themes': 'থিম',
    'header.features': 'বৈশিষ্ট্য',
    'header.whiteLabel': 'হোয়াইট লেবেল',
    'header.support': 'সহায়তা',
    'header.unlockPro': 'প্রো আনলক করুন',
    'header.premiumActive': 'প্রিমিয়াম সক্রিয়',
    
    // Invoice Form
    'invoice.settings': 'ইনভয়েস সেটিংস',
    'invoice.number': 'ইনভয়েস নম্বর',
    'invoice.date': 'তারিখ',
    'invoice.dueDate': 'বকেয়া তারিখ (ঐচ্ছিক)',
    'invoice.gstInvoice': 'জিএসটি ইনভয়েস',
    'invoice.gstEnabled': 'জিএসটি সক্ষম',
    'invoice.nonGst': 'নন-জিএসটি',
    'invoice.businessDetails': 'আপনার ব্যবসার বিবরণ',
    'invoice.companyName': 'কোম্পানির নাম',
    'invoice.clientDetails': 'ক্লায়েন্ট বিবরণ',
    'invoice.clientName': 'ক্লায়েন্টের নাম',
    'invoice.items': 'আইটেম',
    'invoice.addItem': 'আইটেম যোগ করুন',
    'invoice.previewInvoice': 'ইনভয়েস প্রিভিউ',
    
    // Language Selector
    'language.select': 'ভাষা নির্বাচন করুন',
    'language.english': 'English',
    'language.hindi': 'हिंदी',
    'language.marathi': 'मराठी',
    'language.tamil': 'தமிழ்',
    'language.gujarati': 'ગુજરાતી',
    'language.bengali': 'বাংলা'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('app_language') as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('app_language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}