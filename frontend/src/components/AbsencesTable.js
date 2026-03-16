'use client'
import { useState, useEffect } from 'react';
import { getAbsences } from '@/utils/api';
import { useFilters } from '@/context/FiltersContext';

export default function AbsencesTable() {
  const [absences, setAbsences] = useState([]);
  const [page, setPage]         = useState(1);
  const PER_PAGE = 10;
  const { search, classe, justifie } = useFilters();

  useEffect(() => {
    getAbsences().then(setAbsences);
  }, []);

  // Filtrage dynamique côté frontend
  const filtered = absences.filter(a => {
    const nom = `${a.eleve?.nom} ${a.eleve?.prenom}`.toLowerCase();
    const matchSearch  = nom.includes(search.toLowerCase());
    const matchClasse  = classe ? a.classe === classe : true;
    const matchJustifie = justifie === 'oui' ? a.justifie :
                          justifie === 'non' ? !a.justifie : true;
    return matchSearch && matchClasse && matchJustifie;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div className='bg-white rounded-xl shadow p-4'>
      <table className='w-full text-sm'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-2 text-left'>Élève</th>
            <th className='p-2 text-left'>Classe</th>
            <th className='p-2 text-left'>Matière</th>
            <th className='p-2 text-left'>Date</th>
            <th className='p-2 text-left'>Heures</th>
            <th className='p-2 text-left'>Justifiée</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(a => (
            <tr key={a._id} className='border-b hover:bg-gray-50'>
              <td className='p-2'>{a.eleve?.nom} {a.eleve?.prenom}</td>
              <td className='p-2'>{a.classe}</td>
              <td className='p-2'>{a.matiere}</td>
              <td className='p-2'>{new Date(a.date).toLocaleDateString('fr-FR')}</td>
              <td className='p-2'>{a.duree}h</td>
              <td className='p-2'>
                <span className={a.justifie ?
                  'bg-green-100 text-green-700 px-2 py-0.5 rounded' :
                  'bg-red-100 text-red-700 px-2 py-0.5 rounded'}>
                  {a.justifie ? 'Oui' : 'Non'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className='flex gap-2 mt-4 justify-center'>
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>←</button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))}>→</button>
      </div>
    </div>
  );
}
