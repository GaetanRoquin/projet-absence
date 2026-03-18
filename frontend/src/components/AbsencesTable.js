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

  const filtered = absences.filter(a => {
    const nom = `${a.student?.lastName} ${a.student?.firstName}`.toLowerCase();
    const matchSearch   = nom.includes(search.toLowerCase());
    const matchClasse   = classe ? a.student?.classeroom?.name === classe : true;
    const matchJustifie = justifie === 'oui' ?  a.justification :
                          justifie === 'non' ? !a.justification : true;
    return matchSearch && matchClasse && matchJustifie;
  });

  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div className='bg-white rounded-xl shadow p-4'>
      <table className='w-full text-sm'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-2 text-left text-black'>Élève</th>
            <th className='p-2 text-left text-black'>Classe</th>
            <th className='p-2 text-left text-black'>Matière</th>
            <th className='p-2 text-left text-black'>Date</th>
            <th className='p-2 text-left text-black'>Heures</th>
            <th className='p-2 text-left text-black'>Justifiée</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(a => (
            <tr key={a._id} className='border-b hover:bg-gray-50'>
              {/* ✅ CORRIGÉ : eleve?.nom/prenom → student?.lastName/firstName */}
              <td className='p-2 text-black'>{a.student?.lastName} {a.student?.firstName}</td>
              {/* ✅ CORRIGÉ : a.classe → a.student?.classeroom?.name */}
              <td className='p-2 text-black'>{a.student?.classeroom?.name}</td>
              {/* ✅ CORRIGÉ : a.matiere → a.subject?.name */}
              <td className='p-2 text-black'>{a.subject?.name}</td>
              <td className='p-2 text-black'>{new Date(a.date).toLocaleDateString('fr-FR')}</td>
              {/* ✅ CORRIGÉ : a.duree → a.duration */}
              <td className='p-2 text-black'>{a.duration} h</td>
              <td className='p-2 text-black'>
                {/* ✅ CORRIGÉ : a.justifie → a.justification */}
                <span className={a.justification ?
                  'bg-green-100 text-green-700 px-2 py-0.5 rounded' :
                  'bg-red-100 text-red-700 px-2 py-0.5 rounded'}>
                  {a.justification ? 'Oui' : 'Non'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex gap-2 mt-4 justify-center text-black'>
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>←</button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))}>→</button>
      </div>
    </div>
  );
}