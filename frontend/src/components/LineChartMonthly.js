'use client'
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMonthly } from '@/utils/api';

const MOIS = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];

export default function LineChartMonthly() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMonthly().then(d => setData(
      d.map(x => ({ name: MOIS[x._id.mois - 1], absences: x.count }))
    ));
  }, []);

  return (
    <div className='bg-white rounded-xl shadow p-4'>
      <h2 className='font-bold text-lg text-black mb-4'>Évolution mensuelle des absences</h2>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Line type='monotone' dataKey='absences' stroke='#3B82F6' strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
