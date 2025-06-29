import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, Crown, Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSelector from './LanguageSelector'

interface HeaderProps {
  isPremium: boolean
  onUnlockPremium: () => void
}

const Header: React.FC<HeaderProps> = ({ isPremium, onUnlockPremium }) => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const navItems = [
    { path: '/', label: t('header.generator'), icon: FileText },
    { path: '/guide', label: t('header.guide') },
    { path: '/themes', label: t('header.themes') },
    { path: '/features', label: t('header.features') },
    { path: '/white-label', label: t('header.whiteLabel') },
    { path: '/support', label: t('header.support') }
  ]

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xl font-bold text-gray-900 dark:text-white">BharatBillGen</span>
              <Globe className="w-4 h-4 text-blue-500" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            
            {isPremium ? (
              <div className="premium-badge">
                <Crown className="w-3 h-3 mr-1" />
                {t('header.premiumActive')}
              </div>
            ) : (
              <button
                onClick={onUnlockPremium}
                className="btn-primary flex items-center space-x-1"
              >
                <Crown className="w-4 h-4" />
                <span>{t('header.unlockPro')}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex items-center justify-between px-3">
                  <LanguageSelector />
                  
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {theme === 'light' ? (
                      <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    )}
                    <span className="text-gray-600 dark:text-gray-300">
                      {theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
                    </span>
                  </button>
                </div>
                
                {isPremium ? (
                  <div className="premium-badge mx-3">
                    <Crown className="w-3 h-3 mr-1" />
                    {t('header.premiumActive')}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onUnlockPremium()
                      setIsMenuOpen(false)
                    }}
                    className="btn-primary flex items-center space-x-1 mx-3"
                  >
                    <Crown className="w-4 h-4" />
                    <span>{t('header.unlockPro')}</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header