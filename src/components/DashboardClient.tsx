'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormMam from '@/components/FormMam';
import { useTheme } from '@/components/ThemeProvider';
import { Plus, LayoutDashboard, Utensils, Sun, Moon } from 'lucide-react';
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
    const { theme, toggle } = useTheme();

    const handleSuccess = () => {
        setShowForm(false);
        router.refresh();
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <header className="flex justify-between items-center bg-white/70 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 p-4 -mx-4 border-b border-gray-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900">
                        <LayoutDashboard className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">PiringSehat</h1>
                        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium uppercase tracking-widest">Nutrition Tracker</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggle}
                        className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-4 h-4 text-amber-400" />
                        ) : (
                            <Moon className="w-4 h-4" />
                        )}
                    </button>

                    {/* Tambah Data Button */}
                    <button
                        onClick={() => setShowForm(true)}
                        className="group relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 dark:shadow-blue-900 hover:bg-blue-700 transition-all active:scale-95"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Tambah Data</span>
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                {[
                    { label: 'Total Makanan', value: stats.totalMakanan.toLocaleString(), icon: Utensils, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
                    { label: 'Kategori Lemak', value: stats.totalLemak.toString(), icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/30' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
                        <div className={cn("p-3 rounded-xl", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-slate-400 uppercase tracking-tight">{stat.label}</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-slate-100">{stat.value}</p>
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
