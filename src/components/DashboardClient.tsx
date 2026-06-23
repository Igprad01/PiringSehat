'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormMam from '@/components/FormMam';
import { Plus, LayoutDashboard, Utensils } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DashboardProps {
    children: React.ReactNode;
    stats: {
        totalMakanan: number;
        totalLemak: number;
    };
}

export default function DashboardClient({ children, stats }: DashboardProps) {
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();

    const handleSuccess = () => {
        setShowForm(false);
        router.refresh();
    };

    return (
        <div className="flex flex-col gap-6">
            <header className="flex justify-between items-center bg-white/70 backdrop-blur-md sticky top-0 z-10 p-4 -mx-4 border-b border-gray-200/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                        <LayoutDashboard className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">PiringSehat</h1>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Nutrition Tracker</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => setShowForm(true)}
                    className="group relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Tambah Data</span>
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                {[
                    { label: 'Total Makanan', value: stats.totalMakanan.toLocaleString(), icon: Utensils, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Kategori Lemak', value: stats.totalLemak.toString(), icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={cn("p-3 rounded-xl", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-tight">{stat.label}</p>
                            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {children}

            {showForm && (
                <FormMam 
                    onSuccess={handleSuccess} 
                    onClose={() => setShowForm(false)} 
                />
            )}
        </div>
    );
}
