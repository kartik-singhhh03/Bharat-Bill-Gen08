import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Star, Linkedin, User } from 'lucide-react'

const ContactPage: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    rating: 5,
    feedback: '',
    features: ''
  })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create email template
      const emailBody = `
New Contact Form Submission:

Name: ${contactForm.name}
Email: ${contactForm.email}
Type: ${contactForm.type}
Subject: ${contactForm.subject}

Message:
${contactForm.message}
      `.trim()

      // Open email client as fallback
      const mailtoLink = `mailto:contactsweatandcode@gmail.com?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(emailBody)}`
      window.open(mailtoLink, '_blank')

      setContactSubmitted(true)
      setContactForm({ name: '', email: '', subject: '', message: '', type: 'general' })
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Error sending message. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const emailBody = `
New Feedback Submission:

Name: ${feedbackForm.name}
Email: ${feedbackForm.email}
Rating: ${feedbackForm.rating}/5 stars

Feedback:
${feedbackForm.feedback}

Feature Requests:
${feedbackForm.features}
      `.trim()

      const mailtoLink = `mailto:contactsweatandcode@gmail.com?subject=BharatBillGen Feedback&body=${encodeURIComponent(emailBody)}`
      window.open(mailtoLink, '_blank')

      setFeedbackSubmitted(true)
      setFeedbackForm({ name: '', email: '', rating: 5, feedback: '', features: '' })
    } catch (error) {
      console.error('Error sending feedback:', error)
      alert('Error sending feedback. Please try again or email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          📞 Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions, need support, or want to share feedback? We'd love to hear from you!
        </p>
      </div>

      {/* Founder Section */}
      <div className="card bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meet the Founder</h2>
              <p className="text-gray-600 dark:text-gray-300">Kartik Singh</p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Hi! I'm Kartik Singh, the founder and developer of BharatBillGen. I created this tool to help 
            Indian businesses and freelancers generate professional GST-compliant invoices without any barriers. 
            Your feedback and suggestions help make this tool better for everyone!
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
            </a>
            <a
              href="mailto:contactsweatandcode@gmail.com"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email Directly</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email</p>
                  <a 
                    href="mailto:contactsweatandcode@gmail.com"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    contactsweatandcode@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Linkedin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">LinkedIn</p>
                  <a 
                    href="https://www.linkedin.com/in/kartik-singh-879b6b288?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B57nku3kgQQKl%2BFqI%2BvmSdw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    Kartik Singh
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Response Time</p>
                  <p className="text-gray-600 dark:text-gray-300">Within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Location</p>
                  <p className="text-gray-600 dark:text-gray-300">India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Help
            </h3>
            <div className="space-y-3">
              <a href="/guide" className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <h4 className="font-medium text-gray-900 dark:text-white">User Guide</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Step-by-step instructions</p>
              </a>
              <a href="/support" className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <h4 className="font-medium text-gray-900 dark:text-white">Support Center</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">FAQs and troubleshooting</p>
              </a>
              <a href="/white-label" className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <h4 className="font-medium text-gray-900 dark:text-white">White Label</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Custom solutions</p>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          {!contactSubmitted ? (
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={contactForm.type}
                    onChange={(e) => setContactForm(prev => ({ ...prev, type: e.target.value }))}
                    className="input-field"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="business">Business Partnership</option>
                    <option value="white-label">White Label Solution</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="input-field"
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="card text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Thank you for contacting us. Kartik will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setContactSubmitted(false)}
                className="btn-secondary"
              >
                Send Another Message
              </button>
            </div>
          )}

          {/* Feedback Form */}
          {!feedbackSubmitted ? (
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Share Your Feedback
              </h2>
              
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={feedbackForm.email}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackForm(prev => ({ ...prev, rating: star }))}
                        className={`p-1 ${star <= feedbackForm.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {feedbackForm.rating}/5 stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Feedback *
                  </label>
                  <textarea
                    value={feedbackForm.feedback}
                    onChange={(e) => setFeedbackForm(prev => ({ ...prev, feedback: e.target.value }))}
                    className="input-field"
                    rows={4}
                    placeholder="Tell us what you think about BharatBillGen..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Feature Requests
                  </label>
                  <textarea
                    value={feedbackForm.features}
                    onChange={(e) => setFeedbackForm(prev => ({ ...prev, features: e.target.value }))}
                    className="input-field"
                    rows={3}
                    placeholder="Any features you'd like to see added?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Star className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Submit Feedback'}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="card text-center py-8">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your feedback helps Kartik improve BharatBillGen for everyone.
              </p>
              <button
                onClick={() => setFeedbackSubmitted(false)}
                className="btn-secondary"
              >
                Submit More Feedback
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactPage