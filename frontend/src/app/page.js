'use client'
import { useGlobalStats } from '@/context/GlobalStatsContext';
import { useFilters }     from '@/context/FiltersContext';
import StatCard           from '@/components/StatCard';
import AbsencesTable      from '@/components/AbsencesTable';
import BarChartClasse     from '@/components/BarChartClasse';
import PieChartMatiere    from '@/components/PieChartMatiere';
import LineChartMonthly   from '@/components/LineChartMonthly';
import RiskBadge          from '@/components/RiskBadge';

export default function Dashboard() {
  const { stats, highRisk, loading } = useGlobalStats();
  const { search, setSearch, classe, setClasse } = useFilters();

  return (
    <main className='p-6 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>
        Dashboard Absentéisme – Lycée Descartes
      </h1>

      {/* CARTES STATISTIQUES */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <StatCard title='Total absences'   value={stats?.totalAbsences}   color='blue'   icon='📋' />
        <StatCard title='Heures cumulées'  value={`${stats?.totalHeures}h`} color='orange' icon='⏱️' />
        <StatCard title='% Justifiées'     value={`${stats?.pourcentageJustifiees}%`} color='green' icon='✅' />
        <StatCard title='Élèves à risque'  value={highRisk?.length}       color='red'    icon='⚠️' />
      </div>

      {/* GRAPHIQUES */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        <BarChartClasse />
        <PieChartMatiere />
      </div>
      <div className='mb-8'>
        <LineChartMonthly />
      </div>

      {/* FILTRES */}
      <div className='flex gap-4 mb-4'>
        <input
          placeholder='Rechercher un élève...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='border rounded px-3 py-2 flex-1'
        />
        <input
          placeholder='Filtrer par classe...'
          value={classe}
          onChange={e => setClasse(e.target.value)}
          className='border rounded px-3 py-2 w-40'
        />
      </div>

      {/* TABLEAU */}
      <AbsencesTable />

      {/* SECTION ÉLÈVES À RISQUE */}
      <h2 className='text-xl font-bold mt-8 mb-4'>Élèves à surveiller</h2>
      <div className='flex flex-wrap gap-3'>
        {highRisk.map(e => <RiskBadge key={e._id} eleve={e} />)}
      </div>
    </main>
  );
}
