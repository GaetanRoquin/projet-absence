'use client'
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getByClasse } from '@/utils/api';

export default function BarChartClasse() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getByClasse().then(d => setData(d.map(x => ({ name: x._id, absences: x.count }))));
  }, []);

  return (
    <div className='bg-white rounded-xl shadow p-4'>
      <h2 className='font-bold text-lg mb-4'>Absences par classe</h2>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Bar dataKey='absences' fill='#3B82F6' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
