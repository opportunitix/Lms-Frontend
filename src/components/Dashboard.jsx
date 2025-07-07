import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    (async () => {
      try {
        const res = await axios.get('https://lms-backend-7n33.onrender.com/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/');
      }
    })();
  }, []);

  if (!data) return <p className="p-8 animate-pulse">Loading dashboard…</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">
          {data.welcome} 👋
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500">Connected Accounts</p>
          <p className="text-4xl font-bold">{data.totalAccounts}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500 mb-2">Quick Links</p>
          <Link
            to="/accounts"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Manage Social Accounts
          </Link>
        </div>
      </div>
    </div>
  );
}
