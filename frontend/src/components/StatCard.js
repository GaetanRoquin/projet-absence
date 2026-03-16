export default function StatCard({ title, value, color = 'blue', icon }) {
  const colors = {
    blue:   'bg-blue-50 border-blue-300 text-blue-700',
    red:    'bg-red-50  border-red-300  text-red-700',
    green:  'bg-green-50 border-green-300 text-green-700',
    orange: 'bg-orange-50 border-orange-300 text-orange-700',
  };

  return (
    <div className={`border-2 rounded-xl p-6 ${colors[color]}`}>
      <div className='text-3xl mb-2'>{icon}</div>
      <p className='text-sm font-medium opacity-75'>{title}</p>
      <p className='text-3xl font-bold mt-1'>{value ?? '...'}</p>
    </div>
  );
}
