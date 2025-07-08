import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, Users, DollarSign, FileText, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const ChartsDashboard = ({ className = '' }) => {
  const [dashboardData, setDashboardData] = useState({
    monthlyRevenue: [],
    topItems: [],
    clientStats: [],
    totalRevenue: 0,
    totalInvoices: 0,
    totalClients: 0
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    try {
      // Load invoice data from localStorage
      const savedInvoices = JSON.parse(localStorage.getItem('invoice_history') || '[]')
      
      if (savedInvoices.length === 0) {
        // Generate sample data for demo
        setDashboardData(generateSampleData())
        return
      }

      // Process real invoice data
      const processedData = processInvoiceData(savedInvoices)
      setDashboardData(processedData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setDashboardData(generateSampleData())
    }
  }

  const generateSampleData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const monthlyRevenue = months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      invoices: Math.floor(Math.random() * 20) + 5
    }))

    const topItems = [
      { name: 'Web Development', count: 15, revenue: 75000 },
      { name: 'Consulting', count: 12, revenue: 60000 },
      { name: 'Design Services', count: 8, revenue: 40000 },
      { name: 'Maintenance', count: 6, revenue: 30000 },
      { name: 'Training', count: 4, revenue: 20000 }
    ]

    const clientStats = [
      { name: 'Regular Clients', value: 65, count: 13 },
      { name: 'New Clients', value: 25, count: 5 },
      { name: 'One-time', value: 10, count: 2 }
    ]

    return {
      monthlyRevenue,
      topItems,
      clientStats,
      totalRevenue: monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0),
      totalInvoices: monthlyRevenue.reduce((sum, month) => sum + month.invoices, 0),
      totalClients: 20
    }
  }

  const processInvoiceData = (invoices) => {
    // Process real invoice data
    const monthlyData = {}
    const itemCounts = {}
    const clients = new Set()
    let totalRevenue = 0

    invoices.forEach(invoice => {
      const date = new Date(invoice.date)
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' })
      
      // Monthly revenue
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, revenue: 0, invoices: 0 }
      }
      
      const invoiceTotal = invoice.items?.reduce((sum, item) => sum + (item.total || 0), 0) || 0
      monthlyData[monthKey].revenue += invoiceTotal
      monthlyData[monthKey].invoices += 1
      totalRevenue += invoiceTotal

      // Item counts
      invoice.items?.forEach(item => {
        if (item.description) {
          itemCounts[item.description] = (itemCounts[item.description] || 0) + 1
        }
      })

      // Clients
      if (invoice.clientName) {
        clients.add(invoice.clientName)
      }
    })

    const monthlyRevenue = Object.values(monthlyData)
    const topItems = Object.entries(itemCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count, revenue: count * 5000 }))

    const clientStats = [
      { name: 'Total Clients', value: clients.size, count: clients.size }
    ]

    return {
      monthlyRevenue,
      topItems,
      clientStats,
      totalRevenue,
      totalInvoices: invoices.length,
      totalClients: clients.size
    }
  }

  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'orange' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400 mt-1`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/20 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          📈 Business Dashboard
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`₹${dashboardData.totalRevenue.toLocaleString()}`}
          subtitle="This year"
          color="green"
        />
        <StatCard
          icon={FileText}
          title="Total Invoices"
          value={dashboardData.totalInvoices}
          subtitle="Generated"
          color="blue"
        />
        <StatCard
          icon={Users}
          title="Total Clients"
          value={dashboardData.totalClients}
          subtitle="Active"
          color="purple"
        />
        <StatCard
          icon={Calendar}
          title="This Month"
          value={`₹${dashboardData.monthlyRevenue[dashboardData.monthlyRevenue.length - 1]?.revenue?.toLocaleString() || '0'}`}
          subtitle="Revenue"
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#f97316" 
                strokeWidth={3}
                dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Items Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Services/Products
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.topItems}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Client Distribution */}
      {dashboardData.clientStats.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Client Distribution
          </h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.clientStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboardData.clientStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Business Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ₹{Math.round(dashboardData.totalRevenue / Math.max(dashboardData.totalInvoices, 1)).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Average Invoice Value</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(dashboardData.totalRevenue / Math.max(dashboardData.totalClients, 1)).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Revenue per Client</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {dashboardData.monthlyRevenue.length > 1 ? 
                Math.round(((dashboardData.monthlyRevenue[dashboardData.monthlyRevenue.length - 1]?.revenue || 0) - 
                (dashboardData.monthlyRevenue[dashboardData.monthlyRevenue.length - 2]?.revenue || 0)) / 
                Math.max(dashboardData.monthlyRevenue[dashboardData.monthlyRevenue.length - 2]?.revenue || 1, 1) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Monthly Growth</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ChartsDashboard