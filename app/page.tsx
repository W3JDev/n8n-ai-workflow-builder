'use client'

import { useState } from 'react'

export default function Home() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleCreate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/n8n/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to create workflow' })
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🚀 N8N AI Workflow Builder
        </h1>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Describe your workflow in plain English:
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Send an email when a webhook receives data..."
          />

          <button
            onClick={handleCreate}
            disabled={loading || !description}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {loading ? 'Creating...' : 'Create Workflow'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  )
}
