'use client'
import { useState, useEffect } from 'react';
import { createStudent, createAbsence, getClasserooms, getSubjects, getStudents } from '@/utils/api';

export default function AddAbsenceModal({ onClose, onSuccess }) {
  const [mode, setMode]               = useState('existing'); // 'existing' | 'new'
  const [classerooms, setClasserooms] = useState([]);
  const [subjects, setSubjects]       = useState([]);
  const [students, setStudents]       = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  // Champs nouvel élève
  const [firstName, setFirstName]     = useState('');
  const [lastName, setLastName]       = useState('');
  const [sexe, setSexe]               = useState('M');
  const [classeroom, setClasseroom]   = useState('');

  // Champs absence
  const [studentId, setStudentId]     = useState('');
  const [subject, setSubject]         = useState('');
  const [date, setDate]               = useState('');
  const [duration, setDuration]       = useState(1);
  const [reason, setReason]           = useState('maladie');
  const [justification, setJustification] = useState(false);

  useEffect(() => {
    getClasserooms().then(setClasserooms);
    getSubjects().then(setSubjects);
    getStudents().then(setStudents);
  }, []);

  const handleSubmit = async () => {
    setError('');
    if (!subject || !date || !duration) {
      setError('Merci de remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);
    try {
      let finalStudentId = studentId;

      // Si nouvel élève : on le crée d'abord
      if (mode === 'new') {
        if (!firstName || !lastName || !classeroom) {
          setError('Merci de remplir tous les champs de l\'élève.');
          setLoading(false);
          return;
        }
        const newStudent = await createStudent({ firstName, lastName, classeroom, sexe });
        finalStudentId = newStudent._id;
      }

      if (!finalStudentId) {
        setError('Merci de sélectionner un élève.');
        setLoading(false);
        return;
      }

      await createAbsence({
        student: finalStudentId,
        subject,
        date,
        duration: Number(duration),
        reason,
        justification,
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError('Une erreur est survenue. Vérifie la console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fond sombre derrière le modal
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4'>

        {/* En-tête */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-gray-800'>Ajouter une absence</h2>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600 text-2xl'>✕</button>
        </div>

        {/* Choix : élève existant ou nouvel élève */}
        <div className='flex gap-2 mb-6'>
          <button
            onClick={() => setMode('existing')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              mode === 'existing'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Élève existant
          </button>
          <button
            onClick={() => setMode('new')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              mode === 'new'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Nouvel élève
          </button>
        </div>

        {/* ── SECTION ÉLÈVE ── */}
        <div className='mb-6'>
          <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3'>
            Élève
          </h3>

          {mode === 'existing' ? (
            <select
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
            >
              <option value=''>-- Sélectionner un élève --</option>
              {students.map(s => (
                <option key={s._id} value={s._id}>
                  {s.lastName} {s.firstName} — {s.classeroom?.name}
                </option>
              ))}
            </select>
          ) : (
            <div className='grid grid-cols-2 gap-3'>
              <input
                placeholder='Prénom *'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className='border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <input
                placeholder='Nom *'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className='border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <select
                value={classeroom}
                onChange={e => setClasseroom(e.target.value)}
                className='border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
              >
                <option value=''>-- Classe * --</option>
                {classerooms.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <select
                value={sexe}
                onChange={e => setSexe(e.target.value)}
                className='border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
              >
                <option value='M'>Masculin</option>
                <option value='F'>Féminin</option>
              </select>
            </div>
          )}
        </div>

        {/* ── SECTION ABSENCE ── */}
        <div className='mb-6'>
          <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3'>
            Absence
          </h3>
          <div className='grid grid-cols-2 gap-3'>
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className='border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
            >
              <option value=''>-- Matière * --</option>
              {subjects.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>

            <input
              type='date'
              value={date}
              onChange={e => setDate(e.target.value)}
              className='border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <div className='flex items-center gap-2'>
              <label className='text-sm text-gray-600 whitespace-nowrap'>Durée (h) *</label>
              <input
                type='number'
                min='1'
                max='8'
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>

            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className='border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400'
            >
              <option value='maladie'>Maladie</option>
              <option value='rdv'>Rendez-vous</option>
              <option value='non_justifiee'>Non justifiée</option>
              <option value='autre'>Autre</option>
            </select>
          </div>

          <label className='flex items-center gap-2 mt-3 cursor-pointer'>
            <input
              type='checkbox'
              checked={justification}
              onChange={e => setJustification(e.target.checked)}
              className='w-4 h-4 accent-blue-600'
            />
            <span className='text-sm text-gray-700'>Absence justifiée</span>
          </label>
        </div>

        {/* Erreur */}
        {error && (
          <p className='text-red-600 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg'>{error}</p>
        )}

        {/* Boutons */}
        <div className='flex gap-3'>
          <button
            onClick={onClose}
            className='flex-1 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition'
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className='flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition'
          >
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>

      </div>
    </div>
  );
}