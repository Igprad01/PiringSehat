import { Suspense } from 'react';
import TabelMakanan from '@/components/TabelMakanan';
import DashboardClient from '@/components/DashboardClient';
import { getMakanan, getStats } from '@/lib/data';

async function MakananList() {
  const data = await getMakanan();
  return <TabelMakanan initialData={data} />;
}

export default async function DashboardUtama() {
  const stats = await getStats();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <DashboardClient stats={stats}>
          <Suspense fallback={<div className="text-center p-4"></div>}>
            <MakananList />
          </Suspense>
        </DashboardClient>
      </div>
    </main>
  );
}