import React from 'react'
import { Crown, Download, ExternalLink, Palette, Star } from 'lucide-react'

interface ThemeStoreProps {
  isPremium: boolean
  onUnlockPremium: () => void
}

const ThemeStore: React.FC<ThemeStoreProps> = ({ isPremium, onUnlockPremium }) => {
  const freeThemes = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional professional design with clean typography',
      preview: '📄',
      rating: 4.8,
      downloads: '50K+'
    },
    {
      id: 'modern-blue',
      name: 'Modern Blue',
      description: 'Contemporary blue accent design with modern layout',
      preview: '🔷',
      rating: 4.9,
      downloads: '35K+'
    },
    {
      id: 'elegant-green',
      name: 'Elegant Green',
      description: 'Sophisticated green theme with professional styling',
      preview: '🟢',
      rating: 4.7,
      downloads: '28K+'
    }
  ]

  const premiumThemes = [
    {
      id: 'luxury-gold',
      name: 'Luxury Gold',
      description: 'Premium gold accents with elegant typography and luxury feel',
      preview: '🏆',
      rating: 5.0,
      downloads: '15K+'
    },
    {
      id: 'corporate-navy',
      name: 'Corporate Navy',
      description: 'Professional navy blue corporate design for enterprises',
      preview: '🏢',
      rating: 4.9,
      downloads: '22K+'
    },
    {
      id: 'creative-purple',
      name: 'Creative Purple',
      description: 'Modern purple gradient design for creative professionals',
      preview: '🎨',
      rating: 4.8,
      downloads: '18K+'
    },
    {
      id: 'minimal-gray',
      name: 'Minimal Gray',
      description: 'Clean minimalist gray design with perfect spacing',
      preview: '⚪',
      rating: 4.9,
      downloads: '25K+'
    },
    {
      id: 'vibrant-orange',
      name: 'Vibrant Orange',
      description: 'Energetic orange theme with modern layout and bold styling',
      preview: '🟠',
      rating: 4.7,
      downloads: '12K+'
    },
    {
      id: 'professional-teal',
      name: 'Professional Teal',
      description: 'Sophisticated teal with premium styling and clean design',
      preview: '🔹',
      rating: 4.8,
      downloads: '16K+'
    },
    {
      id: 'executive-black',
      name: 'Executive Black',
      description: 'Premium black and white executive design for high-end businesses',
      preview: '⚫',
      rating: 5.0,
      downloads: '8K+'
    }
  ]

  const digitalProducts = [
    {
      name: 'Freelancer Invoice Pack',
      description: '10 professional invoice templates for freelancers and consultants',
      price: '₹199',
      originalPrice: '₹399',
      link: 'https://gumroad.com/l/freelancer-invoice-pack',
      features: ['10 unique designs', 'Editable in Word/PDF', 'Commercial license', 'Instant download'],
      rating: 4.9,
      sales: '2.5K+'
    },
    {
      name: 'Business Letterhead Bundle',
      description: 'Professional letterhead designs for your business correspondence',
      price: '₹299',
      originalPrice: '₹599',
      link: 'https://gumroad.com/l/business-letterhead-bundle',
      features: ['15 letterhead designs', 'Multiple formats', 'Brand guidelines', 'Print ready'],
      rating: 4.8,
      sales: '1.8K+'
    },
    {
      name: 'Complete Branding Kit',
      description: 'Logo, business cards, and invoice templates - everything you need',
      price: '₹999',
      originalPrice: '₹1999',
      link: 'https://gumroad.com/l/complete-branding-kit',
      features: ['Logo design', 'Business cards', 'Invoice templates', 'Social media kit', 'Brand book'],
      rating: 5.0,
      sales: '950+'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🛒 Theme Store
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Choose from our collection of professional invoice themes and digital products 
          to enhance your business documents and brand identity.
        </p>
      </div>

      {/* Free Themes */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Free Invoice Themes
          </h2>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
            Always Free
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {freeThemes.map((theme) => (
            <div key={theme.id} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                <span className="text-6xl">{theme.preview}</span>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{theme.name}</h3>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                    FREE
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{theme.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(theme.rating)}
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{theme.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{theme.downloads} downloads</span>
                </div>
                
                <button
                  onClick={() => {
                    localStorage.setItem('selected_theme', theme.id)
                    alert(`${theme.name} theme applied!`)
                  }}
                  className="w-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Use This Theme
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Themes */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <Crown className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Premium Invoice Themes
          </h2>
          <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">
            Pro Only
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumThemes.map((theme) => (
            <div key={theme.id} className="border-2 border-yellow-200 dark:border-yellow-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative">
              <div className="aspect-video bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 flex items-center justify-center">
                <span className="text-6xl">{theme.preview}</span>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{theme.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-yellow-600 dark:text-yellow-400 text-xs font-medium">PREMIUM</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{theme.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(theme.rating)}
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{theme.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{theme.downloads} downloads</span>
                </div>
                
                <button
                  onClick={() => {
                    if (!isPremium) {
                      onUnlockPremium()
                    } else {
                      localStorage.setItem('selected_theme', theme.id)
                      alert(`${theme.name} theme applied!`)
                    }
                  }}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    isPremium
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {isPremium ? 'Use This Theme' : 'Unlock Premium'}
                </button>
              </div>
              
              {!isPremium && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Premium Required
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Template Builder */}
      {isPremium && (
        <div className="card border-2 border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Custom Template Builder</h3>
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">
              Premium Feature
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Create your own invoice templates with custom fields, layouts, and branding. 
            Perfect for businesses with unique requirements.
          </p>
          <a href="/custom-builder" className="btn-primary inline-flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span>Open Template Builder</span>
          </a>
        </div>
      )}

      {/* Digital Products */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          📦 Digital Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {digitalProducts.map((product, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{product.price}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-through">{product.originalPrice}</div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{product.sales} sold</span>
              </div>
              
              <ul className="space-y-1 mb-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <span>Buy Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Upgrade CTA */}
      {!isPremium && (
        <div className="card bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800">
          <div className="text-center py-8">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Unlock All Premium Themes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Get access to 7 premium invoice themes, custom template builder, remove branding, 
              and enjoy priority support for just ₹299/year.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">🎨</div>
                <div className="text-sm font-medium">7 Premium Themes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🛠️</div>
                <div className="text-sm font-medium">Template Builder</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🏷️</div>
                <div className="text-sm font-medium">Remove Branding</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💎</div>
                <div className="text-sm font-medium">Priority Support</div>
              </div>
            </div>
            <button
              onClick={onUnlockPremium}
              className="btn-primary px-8 py-3 text-lg"
            >
              Upgrade to Premium - ₹299/year
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeStore