import React, { useState } from 'react'
import { Plus, Trash2, Move, Eye, Save, Crown } from 'lucide-react'

interface CustomField {
  id: string
  type: 'text' | 'number' | 'date' | 'textarea' | 'select'
  label: string
  placeholder: string
  required: boolean
  options?: string[]
}

interface CustomTemplateBuilderProps {
  isPremium: boolean
  onUnlockPremium: () => void
}

const CustomTemplateBuilder: React.FC<CustomTemplateBuilderProps> = ({
  isPremium,
  onUnlockPremium
}) => {
  const [fields, setFields] = useState<CustomField[]>([])
  const [templateName, setTemplateName] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const fieldTypes = [
    { value: 'text', label: 'Text Input', icon: '📝' },
    { value: 'number', label: 'Number Input', icon: '🔢' },
    { value: 'date', label: 'Date Picker', icon: '📅' },
    { value: 'textarea', label: 'Text Area', icon: '📄' },
    { value: 'select', label: 'Dropdown', icon: '📋' }
  ]

  const addField = (type: string) => {
    const newField: CustomField = {
      id: Date.now().toString(),
      type: type as CustomField['type'],
      label: `New ${type} field`,
      placeholder: `Enter ${type}...`,
      required: false,
      options: type === 'select' ? ['Option 1', 'Option 2'] : undefined
    }
    setFields([...fields, newField])
  }

  const updateField = (id: string, updates: Partial<CustomField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ))
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const moveField = (id: string, direction: 'up' | 'down') => {
    const index = fields.findIndex(field => field.id === id)
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < fields.length - 1)
    ) {
      const newFields = [...fields]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      ;[newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]]
      setFields(newFields)
    }
  }

  const saveTemplate = () => {
    const template = {
      name: templateName,
      fields: fields,
      createdAt: new Date().toISOString()
    }
    
    const savedTemplates = JSON.parse(localStorage.getItem('custom_templates') || '[]')
    savedTemplates.push(template)
    localStorage.setItem('custom_templates', JSON.stringify(savedTemplates))
    
    alert('Template saved successfully!')
  }

  if (!isPremium) {
    return (
      <div className="card text-center py-12">
        <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Custom Template Builder
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Create your own invoice templates with custom fields, layouts, and branding. 
          Build templates that perfectly match your business needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Drag & Drop Builder</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Visual field editor with drag and drop</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Fields</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Add any field type you need</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Save Templates</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Reuse your custom templates</p>
          </div>
        </div>
        <button
          onClick={onUnlockPremium}
          className="btn-primary px-8 py-3 text-lg"
        >
          Unlock Template Builder - ₹299/year
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Template Info */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Crown className="w-5 h-5 text-yellow-500 mr-2" />
          Custom Template Builder
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Template Name
          </label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="input-field"
            placeholder="My Custom Invoice Template"
          />
        </div>
      </div>

      {/* Field Types */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Fields</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {fieldTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => addField(type.value)}
              className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all text-center"
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Field Editor */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Template Fields</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn-secondary flex items-center space-x-1"
            >
              <Eye className="w-4 h-4" />
              <span>{showPreview ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={saveTemplate}
              disabled={!templateName || fields.length === 0}
              className="btn-primary flex items-center space-x-1"
            >
              <Save className="w-4 h-4" />
              <span>Save Template</span>
            </button>
          </div>
        </div>

        {showPreview ? (
          /* Preview Mode */
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-gray-50 dark:bg-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {templateName || 'Template Preview'}
            </h4>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      className="input-field"
                      rows={3}
                      disabled
                    />
                  ) : field.type === 'select' ? (
                    <select className="input-field" disabled>
                      <option>{field.placeholder}</option>
                      {field.options?.map((option, idx) => (
                        <option key={idx}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="input-field"
                      disabled
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-4">
            {fields.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No fields added yet. Click on a field type above to get started.</p>
              </div>
            ) : (
              fields.map((field, index) => (
                <div key={field.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {fieldTypes.find(t => t.value === field.type)?.icon} {field.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => moveField(field.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <Move className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        onClick={() => moveField(field.id, 'down')}
                        disabled={index === fields.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <Move className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeField(field.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Field Label
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Placeholder
                      </label>
                      <input
                        type="text"
                        value={field.placeholder}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  {field.type === 'select' && (
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Options (one per line)
                      </label>
                      <textarea
                        value={field.options?.join('\n') || ''}
                        onChange={(e) => updateField(field.id, { 
                          options: e.target.value.split('\n').filter(opt => opt.trim()) 
                        })}
                        className="input-field text-sm"
                        rows={3}
                        placeholder="Option 1&#10;Option 2&#10;Option 3"
                      />
                    </div>
                  )}

                  <div className="mt-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Required field</span>
                    </label>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Saved Templates */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Saved Templates</h3>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Your saved templates will appear here. You can load, edit, or delete them.
        </div>
      </div>
    </div>
  )
}

export default CustomTemplateBuilder