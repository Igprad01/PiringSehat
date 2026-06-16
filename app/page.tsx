'use client'
import { useState } from 'react'
import TabelMakanan from '@/Components/TabelMakanan'
import FormMam from '@/Components/FormMam'

export default function DashboardUtama() {
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = () => {
    setShowForm(false)
    setRefreshKey(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900">Dashboard Makanan</h1>
            <p className="text-gray-600 mt-1">Kelola data makanan dan rincian gizi/lemaknya secara spesifik.</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all"
          >
            + Tambah Data
          </button>
        </div>

        {/* Komponen Tabel Makanan */}
        <TabelMakanan refreshKey={refreshKey} />

        {/* Modal Komponen Form */}
        {showForm && (
          <FormMam 
            onSuccess={handleSuccess} 
            onClose={() => setShowForm(false)} 
          />
        )}
      </div>
    </main>
  )
}