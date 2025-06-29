import React from 'react'
import { Globe, MapPin } from 'lucide-react'

interface RegionSwitcherProps {
  currentRegion: 'india' | 'global'
  onRegionChange: (region: 'india' | 'global') => void
  detectedCountry?: string
}

const RegionSwitcher: React.FC<RegionSwitcherProps> = ({
  currentRegion,
  onRegionChange,
  detectedCountry
}) => {
  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Choose Your Region
        </h2>
        {detectedCountry && (
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4" />
            <span>Detected: {detectedCountry}</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onRegionChange('india')}
          className={`p-4 rounded-lg border-2 transition-all text-left ${
            currentRegion === 'india'
              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">🇮🇳</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">India (GST)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">GST-compliant invoices</p>
            </div>
          </div>
          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
            <li>• CGST/SGST/IGST calculations</li>
            <li>• Place of Supply logic</li>
            <li>• HSN/SAC codes</li>
            <li>• Indian tax compliance</li>
          </ul>
        </button>

        <button
          onClick={() => onRegionChange('global')}
          className={`p-4 rounded-lg border-2 transition-all text-left ${
            currentRegion === 'global'
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <Globe className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">International</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Global invoice formats</p>
            </div>
          </div>
          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Multi-currency support</li>
            <li>• Country-specific templates</li>
            <li>• VAT/Tax calculations</li>
            <li>• International standards</li>
          </ul>
        </button>
      </div>
    </div>
  )
}

export default RegionSwitcher