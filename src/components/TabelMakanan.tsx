'use client';
import React, { useState, useEffect } from 'react';
import { Makanan as MakananType, RincianLemak } from '../types';
import { ChevronDown, ChevronUp, Salad, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Makanan extends MakananType {
    porsi?: number | string;
    rincian_lemak?: RincianLemak[];
}

export default function TabelMakanan({ initialData }: { initialData: Makanan[] }) {
    const [data, setData] = useState<Makanan[]>(initialData);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const toggleRow = (id: number) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    return (
        <div className="w-full bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Makanan</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Kategori</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Porsi</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Kadar Gizi</th>
                            <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-center">Rincian</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data.map((item) => (
                            <React.Fragment key={item.id_makanan}>
                                <tr className={cn(
                                    "transition-all hover:bg-blue-50/30",
                                    expandedRows.has(item.id_makanan) && "bg-blue-50/50"
                                )}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-100 rounded-lg text-gray-400">
                                                <Salad className="w-4 h-4" />
                                            </div>
                                            <span className="font-semibold text-gray-900">{item.nama_makanan}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                            item.kategori_id === 2 
                                                ? "bg-orange-50 text-orange-700 border-orange-100" 
                                                : "bg-blue-50 text-blue-700 border-blue-100"
                                        )}>
                                            {item.kategori_id === 2 ? 'Kategori Lemak' : 'Biasa'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600 font-medium">{item.porsi || '-'} <span className="text-xs text-gray-400 font-normal">porsi</span></td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 font-bold">{item.kadar || '0'}</span>
                                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">{item.satuan}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        {item.kategori_id === 2 ? (
                                            <button 
                                                onClick={() => toggleRow(item.id_makanan)}
                                                className={cn(
                                                    "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                                                    expandedRows.has(item.id_makanan)
                                                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                                        : "bg-white text-blue-600 border border-blue-200 hover:border-blue-400"
                                                )}
                                            >
                                                {expandedRows.has(item.id_makanan) ? (
                                                    <><ChevronUp className="w-3.5 h-3.5" /> Tutup</>
                                                ) : (
                                                    <><ChevronDown className="w-3.5 h-3.5" /> Lihat</>
                                                )}
                                            </button>
                                        ) : (
                                            <span className="text-gray-300">-</span>
                                        )}
                                    </td>
                                </tr>
                                {item.kategori_id === 2 && expandedRows.has(item.id_makanan) && item.rincian_lemak && item.rincian_lemak.length > 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-0 bg-blue-50/20">
                                            <div className="p-6 grid grid-cols-2 md:grid-cols-5 gap-6 border-x-4 border-blue-600/20 animate-in fade-in slide-in-from-top-1 duration-300">
                                                {[
                                                    { label: 'Lemak Total', value: item.rincian_lemak[0].lemak_total },
                                                    { label: 'Lemak Jenuh', value: item.rincian_lemak[0].lemak_jenuh },
                                                    { label: 'Tak Jenuh Ganda', value: item.rincian_lemak[0].lemak_tak_jenuh_ganda },
                                                    { label: 'Tak Jenuh Tunggal', value: item.rincian_lemak[0].lemak_tak_jenuh_tunggal },
                                                    { label: 'Keterangan', value: item.rincian_lemak[0].keterangan_omega || '-', full: true },
                                                ].map((stat, idx) => (
                                                    <div key={idx} className={cn("space-y-1", stat.full && "md:col-span-1")}>
                                                        <p className="text-[10px] uppercase font-extrabold text-blue-600 tracking-wider flex items-center gap-1">
                                                            <Info className="w-3 h-3" /> {stat.label}
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-800">{stat.value}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                {data.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Salad className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-gray-500 font-medium">Belum ada data makanan yang tersedia.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
