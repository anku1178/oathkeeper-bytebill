import React, { useEffect, useState } from 'react';

export default function ExpensesList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/expenses')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch expenses');
        return res.json();
      })
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading expenses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Expenses (from backend)</h2>
      <ul>
        {expenses.map((exp: any) => (
          <li key={exp.id}>{exp.name || 'Unnamed'} - {exp.amount || 0}</li>
        ))}
      </ul>
    </div>
  );
}
