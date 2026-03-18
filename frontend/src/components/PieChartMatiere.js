'use client'
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getByMatiere } from '@/utils/api';

const COLORS = ['#3B82F6','#EF4444','#10B981','#F59E0B','#8B5CF6','#EC4899'];

export default function PieChartMatiere() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ✅ CORRIGÉ : x.name → x._id (le controller retourne { _id: 'Maths', count: 5 })
    getByMatiere().then(d => setData(d.map(x => ({ name: x._id, value: x.count }))));
  }, []);

  return (
    <div className='bg-white rounded-xl shadow p-4'>
      <h2 className='font-bold text-lg text-black mb-4'>Absences par matière</h2>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie data={data} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={100}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}