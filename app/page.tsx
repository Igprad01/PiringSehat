'use client'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function TesKoneksi() {
  const supabase = createClient()

  useEffect(() => {
    async function cekKoneksi() {
      // Mencoba mengambil data dari tabel kategori
      const { data, error } = await supabase.from('makanan').select('*')
      
      if (error) {
        console.error('❌ Koneksi Gagal atau Error:', error.message)
      } else {
        console.log('✅ Koneksi Sukses! Data dari Supabase:', data)
      }
    }
    
    cekKoneksi()
  }, [])

  return <div>Mengecek Koneksi Supabase... Silakan buka Inspect Element.</div>
}