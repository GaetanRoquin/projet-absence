export default function RiskBadge({ eleve }) {
  // Calcul du niveau de risque selon le nombre d'heures
  const heures = eleve.totalHeures;
  const niveau = heures > 20 ? 'Risque élevé' : heures > 10 ? 'Surveillance' : 'Normal';
  const colors = {
    'Normal':       'bg-green-100 text-green-800 border-green-300',
    'Surveillance': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Risque élevé': 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className={`border rounded-lg px-4 py-2 ${colors[niveau]}`}>
      <p className='font-bold'>
        {eleve.eleveInfo?.prenom} {eleve.eleveInfo?.nom}
      </p>
      <p className='text-sm'>{heures}h – {niveau}</p>
    </div>
  );
}
