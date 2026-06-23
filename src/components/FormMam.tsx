'use client';
import { useState } from 'react';
import { X, Save, UtensilsCrossed, Info } from 'lucide-react';

export default function FormMam({ onSuccess, onClose }: { onSuccess: () => void, onClose: () => void }) {
    const [formData, setFormData] = useState({
        nama_makanan: '',
        kategori_id: 1, 
        porsi: 1,
        kadar_gizi: 0,
        satuan_gizi: 'g',
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
                onSuccess();
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
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden border border-gray-100 flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
                            <UtensilsCrossed className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Tambah Makanan</h2>
                            <p className="text-xs text-gray-500 font-medium lowercase italic">Lengkapi detail nutrisi makanan</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-extrabold text-blue-600 uppercase tracking-wider ml-1">Nama Makanan</label>
                            <input 
                                type="text" 
                                name="nama_makanan" 
                                placeholder="Contoh: Nasi Goreng Spesial"
                                value={formData.nama_makanan} 
                                onChange={handleChange} 
                                className="w-full bg-gray-50 border-none ring-1 ring-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none text-gray-900" 
                                required 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-extrabold text-blue-600 uppercase tracking-wider ml-1">Kategori</label>
                                <select 
                                    name="kategori_id" 
                                    value={formData.kategori_id} 
                                    onChange={handleChange} 
                                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none appearance-none text-gray-900"
                                >
                                    <option value={1}>Biasa / Umum</option>
                                    <option value={2}>Khusus Lemak</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-extrabold text-blue-600 uppercase tracking-wider ml-1">Porsi</label>
                                <input 
                                    type="number" 
                                    name="porsi" 
                                    value={formData.porsi} 
                                    onChange={handleChange} 
                                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none text-gray-900" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                            <div className="space-y-2">
                                <label className="text-xs font-extrabold text-blue-600 uppercase tracking-wider ml-1">Kadar Gizi</label>
                                <input 
                                    type="number" 
                                    name="kadar_gizi" 
                                    value={formData.kadar_gizi} 
                                    onChange={handleChange} 
                                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none text-gray-900" 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-extrabold text-blue-600 uppercase tracking-wider ml-1">Satuan</label>
                                <input 
                                    type="text" 
                                    name="satuan_gizi" 
                                    placeholder="g, mg, kcal"
                                    value={formData.satuan_gizi} 
                                    onChange={handleChange} 
                                    className="w-full bg-gray-50 border-none ring-1 ring-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none text-gray-900" 
                                    required 
                                />
                            </div>
                        </div>

                        {formData.kategori_id === 2 && (
                            <div className="space-y-4 bg-orange-50/50 p-5 rounded-2xl border border-orange-100 animate-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <Info className="w-4 h-4 text-orange-600" />
                                    <h3 className="text-sm font-bold text-orange-900">Rincian Komposisi Lemak</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {( [
                                        { label: 'Lemak Jenuh', name: 'lemak_jenuh' },
                                        { label: 'Tak Jenuh Ganda', name: 'lemak_tak_jenuh_ganda' },
                                        { label: 'Tak Jenuh Tunggal', name: 'lemak_tak_jenuh_tunggal' },
                                        { label: 'Lemak Trans', name: 'lemak_trans' },
                                    ] as const).map((field) => (
                                        <div key={field.name} className="space-y-1">
                                            <label className="text-[10px] font-bold text-orange-700 uppercase">{field.label}</label>
                                            <input 
                                                type="number" 
                                                name={field.name} 
                                                value={formData[field.name]}
                                                onChange={handleChange} 
                                                className="w-full bg-white border-none ring-1 ring-orange-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all outline-none text-sm text-gray-900" 
                                            />
                                        </div>
                                    ))}
                                    <div className="col-span-2 space-y-1" key="kolesterol">
                                        <label className="text-[10px] font-bold text-orange-700 uppercase">Kolesterol</label>
                                        <input 
                                            type="number" 
                                            name="kolesterol" 
                                            value={formData.kolesterol} 
                                            onChange={handleChange} 
                                            className="w-full bg-white border-none ring-1 ring-orange-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all outline-none text-sm text-gray-900" 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
                        >
                            Batal
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <><Save className="w-5 h-5" /> Simpan Data</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
