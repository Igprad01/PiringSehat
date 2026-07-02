'use client';
import React, { useState, useMemo } from 'react';
import { Makanan as MakananType, RincianLemak } from '../types';
import { Search, Salad, X, Droplets, Wheat, Beef, Leaf, FlaskConical, Plus, Minus, Trash2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface Makanan extends MakananType {
    porsi?: number | string;
    kelompok?: string;
    rincian_lemak?: RincianLemak[];
}

const kelompokConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
    'Protein Hewani':  { color: 'text-red-600',    bg: 'bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-800',         icon: Beef },
    'Protein Nabati':  { color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-900/30 border-green-100 dark:border-green-800',  icon: Leaf },
    'Protein':         { color: 'text-red-600',    bg: 'bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-800',         icon: Beef },
    'Karbohidrat':     { color: 'text-amber-600',  bg: 'bg-amber-50 dark:bg-amber-900/30 border-amber-100 dark:border-amber-800',  icon: Wheat },
    'Lemak':           { color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/30 border-orange-100 dark:border-orange-800', icon: Droplets },
    'Serat':           { color: 'text-teal-600',   bg: 'bg-teal-50 dark:bg-teal-900/30 border-teal-100 dark:border-teal-800',     icon: Leaf },
    'Sayuran Hijau':   { color: 'text-emerald-600',bg: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800', icon: Leaf },
    'Sayuran Umbi':    { color: 'text-lime-600',   bg: 'bg-lime-50 dark:bg-lime-900/30 border-lime-100 dark:border-lime-800',     icon: Leaf },
    'Buah':            { color: 'text-pink-600',   bg: 'bg-pink-50 dark:bg-pink-900/30 border-pink-100 dark:border-pink-800',     icon: Leaf },
    'default':         { color: 'text-blue-600',   bg: 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800',    icon: FlaskConical },
};

export default function TabelMakanan({ initialData }: { initialData: Makanan[] }) {
    const [query, setQuery]       = useState('');
    const [selectedItems, setSelectedItems] = useState<Makanan[]>([]);

    const filtered = useMemo(() =>
        query.trim() === ''
            ? initialData
            : initialData.filter(item =>
                item.nama_makanan.toLowerCase().includes(query.toLowerCase())
              ),
        [initialData, query]
    );

    const toggleItem = (item: Makanan) => {
        setSelectedItems(prev => {
            const exists = prev.find(i => i.id_makanan === item.id_makanan);
            if (exists) {
                return prev.filter(i => i.id_makanan !== item.id_makanan);
            }
            return [...prev, item];
        });
    };

    const totalKadar = useMemo(() => {
        return selectedItems.reduce((acc, curr) => acc + (parseFloat(curr.kadar?.toString() || '0')), 0);
    }, [selectedItems]);

    const cfg = (k?: string) => kelompokConfig[k ?? ''] ?? kelompokConfig['default'];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* List Makanan */}
                <div className="flex-1 flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Cari makanan untuk ditambahkan ke piring..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm text-sm focus:ring-2 focus:ring-blue-500 transition-all dark:text-slate-200"
                        />
                    </div>

                    <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden">
                        <div className="max-h-[500px] overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                                    <tr className="border-b border-gray-100 dark:border-slate-700">
                                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Makanan</th>
                                        <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Kadar</th>
                                        <th className="p-4 text-right"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
                                    {filtered.map((item) => {
                                        const c = cfg(item.kelompok);
                                        const Icon = c.icon;
                                        const isSelected = selectedItems.some(i => i.id_makanan === item.id_makanan);
                                        return (
                                            <tr key={item.id_makanan} className="hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer" onClick={() => toggleItem(item)}>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn("p-1.5 rounded-lg border", c.bg)}>
                                                            <Icon className={cn("w-4 h-4", c.color)} />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900 dark:text-slate-100 text-sm">{item.nama_makanan}</p>
                                                            <p className={cn("text-[10px] font-bold uppercase tracking-tighter", c.color)}>{item.kelompok || 'Umum'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-bold text-gray-900 dark:text-slate-100">{item.kadar}</span>
                                                    <span className="text-[10px] text-gray-400 ml-1">{item.satuan}</span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className={cn(
                                                        "inline-flex p-1.5 rounded-lg transition-all",
                                                        isSelected ? "bg-red-100 dark:bg-red-900/30 text-red-600" : "bg-blue-600 text-white shadow-md shadow-blue-200"
                                                    )}>
                                                        {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Ringkasan Piring */}
                <div className="lg:w-80 flex flex-col gap-4">
                    <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-5 text-white shadow-xl shadow-blue-200 dark:shadow-none">
                        <div className="flex items-center gap-2 mb-4">
                            <Salad className="w-5 h-5" />
                            <h3 className="font-bold tracking-tight">Isi Piring Saya</h3>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-blue-100 tracking-wider">Total Kadar Gizi</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold">{totalKadar}</span>
                                <span className="text-sm font-medium opacity-80">gram</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-lg p-4 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <p className="text-xs font-bold uppercase text-gray-400 dark:text-slate-500 tracking-widest">Menu Terpilih</p>
                            {selectedItems.length > 0 && (
                                <button onClick={() => setSelectedItems([])} className="text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1">
                                    <Trash2 className="w-3 h-3" /> Bersihkan
                                </button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[350px] space-y-2 pr-1">
                            {selectedItems.length === 0 ? (
                                <div className="text-center py-12 opacity-30 italic text-sm text-gray-500 dark:text-slate-400">
                                    Belum ada makanan terpilih
                                </div>
                            ) : (
                                selectedItems.map(item => {
                                    const c = cfg(item.kelompok);
                                    return (
                                        <div key={item.id_makanan} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-700 animate-in fade-in slide-in-from-right-2 duration-200">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("p-1.5 rounded-lg border", c.bg)}>
                                                    <c.icon className={cn("w-3.5 h-3.5", c.color)} />
                                                </div>
                                                <div className="max-w-[120px]">
                                                    <p className="text-xs font-bold text-gray-900 dark:text-slate-100 truncate">{item.nama_makanan}</p>
                                                    <p className="text-[10px] text-gray-400">{item.kadar} {item.satuan}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => toggleItem(item)} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-300 hover:text-red-500 rounded-lg transition-colors">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
