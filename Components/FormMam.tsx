'use client';
import { useState } from 'react';

export default function FormMam({ onSuccess, onClose }: { onSuccess: () => void, onClose: () => void }) {
    const [formData, setFormData] = useState({
        nama_makanan: '',
        kategori_id: 1, // Default 1: Biasa, 2: Lemak (as per mermaid logic)
        porsi: 1,
        kadar_gizi: 0,
        satuan_gizi: 'g',
        // Rincian lemak if kategori_id === 2
        lemak_jenuh: 0,
        lemak_tak_jenuh_ganda: 0,
        lemak_tak_jenuh_tunggal: 0,
        lemak_trans: 0,
        kolesterol: 0
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'nama_makanan' || name === 'satuan_gizi' ? value : Number(value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/makanan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                onSuccess(); // Refresh Table State
            } else {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg text-black max-w-md w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Tambah Makanan</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nama Makanan</label>
                        <input type="text" name="nama_makanan" value={formData.nama_makanan} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Kategori</label>
                        <select name="kategori_id" value={formData.kategori_id} onChange={handleChange} className="w-full border p-2 rounded">
                            <option value={1}>Biasa / Lainnya</option>
                            <option value={2}>Lemak</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Porsi</label>
                        <input type="number" name="porsi" value={formData.porsi} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Kadar Gizi</label>
                        <input type="number" name="kadar_gizi" value={formData.kadar_gizi} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Satuan Gizi</label>
                        <input type="text" name="satuan_gizi" value={formData.satuan_gizi} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>

                    {formData.kategori_id === 2 && (
                        <div className="bg-gray-100 p-4 rounded space-y-2 mt-4">
                            <h3 className="font-semibold mb-2">Rincian Lemak</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-medium">Lemak Jenuh</label>
                                    <input type="number" name="lemak_jenuh" value={formData.lemak_jenuh} onChange={handleChange} className="w-full border p-1 rounded text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium">Lemak Tak Jenuh Ganda</label>
                                    <input type="number" name="lemak_tak_jenuh_ganda" value={formData.lemak_tak_jenuh_ganda} onChange={handleChange} className="w-full border p-1 rounded text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium">Lemak Tak Jenuh Tunggal</label>
                                    <input type="number" name="lemak_tak_jenuh_tunggal" value={formData.lemak_tak_jenuh_tunggal} onChange={handleChange} className="w-full border p-1 rounded text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium">Lemak Trans</label>
                                    <input type="number" name="lemak_trans" value={formData.lemak_trans} onChange={handleChange} className="w-full border p-1 rounded text-sm" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-medium">Kolesterol</label>
                                    <input type="number" name="kolesterol" value={formData.kolesterol} onChange={handleChange} className="w-full border p-1 rounded text-sm" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-2 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Batal</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
