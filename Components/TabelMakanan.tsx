'use client';
import React, { useState, useEffect } from 'react';

interface RincianLemak {
    lemak_jenuh: number;
    lemak_tak_jenuh_ganda: number;
    lemak_tak_jenuh_tunggal: number;
    lemak_trans: number;
    kolesterol: number;
}

interface Makanan {
    id: number;
    nama_makanan: string;
    kategori_id: number;
    porsi: number;
    kadar_gizi: number;
    satuan_gizi: string;
    rincian_lemak: RincianLemak[];
}

export default function TabelMakanan({ refreshKey }: { refreshKey: number }) {
    const [data, setData] = useState<Makanan[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch('/api/makanan');
                const result = await res.json();
                if (Array.isArray(result)) {
                    setData(result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [refreshKey]);

    const toggleRow = (id: number) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    if (loading) return <div className="text-center p-4">Loading data...</div>;

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-50 uppercase text-gray-900 border-b">
                    <tr>
                        <th className="p-3">Nama Makanan</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Porsi</th>
                        <th className="p-3">Kadar Gizi</th>
                        <th className="p-3 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <React.Fragment key={item.id}>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium text-gray-900">{item.nama_makanan}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs text-white ${item.kategori_id === 2 ? 'bg-orange-500' : 'bg-blue-500'}`}>
                                        {item.kategori_id === 2 ? 'Lemak' : 'Biasa'}
                                    </span>
                                </td>
                                <td className="p-3">{item.porsi}</td>
                                <td className="p-3">{item.kadar_gizi} {item.satuan_gizi}</td>
                                <td className="p-3 text-center">
                                    {item.kategori_id === 2 && (
                                        <button 
                                            onClick={() => toggleRow(item.id)}
                                            className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                                        >
                                            {expandedRows.has(item.id) ? 'Tutup Rincian' : 'Lihat Rincian'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                            {/* Expand Logic (Apakah Kategori LEMAK?) */}
                            {item.kategori_id === 2 && expandedRows.has(item.id) && item.rincian_lemak && item.rincian_lemak.length > 0 && (
                                <tr className="bg-orange-50">
                                    <td colSpan={5} className="p-4 border-b">
                                        <div className="grid grid-cols-5 gap-2 text-xs">
                                            <div className="font-semibold text-gray-800">Lemak Jenuh:</div>
                                            <div className="text-gray-600">{item.rincian_lemak[0].lemak_jenuh} g</div>
                                            
                                            <div className="font-semibold text-gray-800">Lemak Tak Jenuh Ganda:</div>
                                            <div className="text-gray-600">{item.rincian_lemak[0].lemak_tak_jenuh_ganda} g</div>
                                            
                                            <div className="font-semibold text-gray-800">Lemak Tak Jenuh Tunggal:</div>
                                            <div className="text-gray-600">{item.rincian_lemak[0].lemak_tak_jenuh_tunggal} g</div>
                                            
                                            <div className="font-semibold text-gray-800">Lemak Trans:</div>
                                            <div className="text-gray-600">{item.rincian_lemak[0].lemak_trans} g</div>
                                            
                                            <div className="font-semibold text-gray-800">Kolesterol:</div>
                                            <div className="text-gray-600">{item.rincian_lemak[0].kolesterol} mg</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-4 text-center text-gray-500">Tidak ada data.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
