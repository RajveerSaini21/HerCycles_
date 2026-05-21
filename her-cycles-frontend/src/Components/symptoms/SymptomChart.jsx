import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, CartesianGrid } from 'recharts';
import { format, parseISO, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { groupBy, map } from 'lodash';

export default function SymptomChart({ symptoms }) {
  const chartData = useMemo(() => {
    if (!symptoms || symptoms.length === 0) return [];

    const recentSymptoms = symptoms.filter(s => 
      isWithinInterval(parseISO(s.date), {
        start: startOfWeek(new Date(), { weekStartsOn: 1 }),
        end: endOfWeek(new Date(), { weekStartsOn: 1 })
      })
    );

    const groupedByDay = groupBy(recentSymptoms, s => format(parseISO(s.date), 'EEE'));
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return daysOfWeek.map(day => {
      const daySymptoms = groupedByDay[day] || [];
      const dataPoint = { name: day };
      daySymptoms.forEach(symptom => {
        dataPoint[symptom.symptom_type] = symptom.severity;
      });
      return dataPoint;
    });
  }, [symptoms]);

  const symptomTypes = useMemo(() => {
    return [...new Set(symptoms.map(s => s.symptom_type))];
  }, [symptoms]);

  const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#d8b4fe', '#e9d5ff'];

  if (symptoms.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center text-gray-500">
        <BarChart className="w-16 h-16 text-gray-300 mb-3" />
        <p>No symptoms logged for this week yet.</p>
        <p className="text-sm">Log a symptom to see your weekly trend.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 10]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(5px)',
              border: '1px solid #ddd', 
              borderRadius: '0.5rem'
            }} 
          />
          {symptomTypes.slice(0, 5).map((type, index) => (
            <Bar key={type} dataKey={type} stackId="a" fill={colors[index % colors.length]} name={type.replace(/_/g, ' ')} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}