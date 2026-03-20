'use client'
import { useState } from 'react';
import { useGlobalStats } from '@/context/GlobalStatsContext';
import { useFilters }     from '@/context/FiltersContext';
import StatCard           from '@/components/StatCard';
import AbsencesTable      from '@/components/AbsencesTable';
import BarChartClasse     from '@/components/BarChartClasse';
import PieChartMatiere    from '@/components/PieChartMatiere';
import LineChartMonthly   from '@/components/LineChartMonthly';
import AddAbsenceModal    from '@/components/AddAbsenceModal';

export default function Dashboard() {
  const { stats, highRisk, loading, refresh } = useGlobalStats();
  const { search, setSearch, classe, setClasse } = useFilters();
  const [showModal, setShowModal] = useState(false);

  return (
    <main className='p-6 max-w-7xl mx-auto'>

      {/* En-tête avec bouton Ajouter */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>
          Dashboard Absentéisme – Lycée Descartes
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition'
        >
          + Ajouter une absence
        </button>
      </div>

      {/* CARTES STATISTIQUES */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        <StatCard title='Total absences'  value={stats?.totalAbsences}              color='blue'   icon='📋' />
        <StatCard title='Heures cumulées' value={`${stats?.totalHeures}h`}          color='orange' icon='⏱️' />
        <StatCard title='% Justifiées'    value={`${stats?.pourcentageJustifiees}%`} color='green'  icon='✅' />
        <StatCard title='Élèves à risque' value={highRisk?.length}                  color='red'    icon='⚠️' />
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
      <AbsencesTable refreshTrigger={showModal} />

      {/* MODAL */}
      {showModal && (
        <AddAbsenceModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            // Recharge les stats globales si refresh est disponible
            if (refresh) refresh();
          }}
        />
      )}

    </main>
  );
}