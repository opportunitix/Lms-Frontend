import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SocialAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ platform: '', handle: '', token: '' });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/social/accounts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAccounts(res.data);
    } catch (err) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/social/accounts', form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setForm({ platform: '', handle: '', token: '' });
    fetchAccounts();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Social Accounts</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow mb-6 grid gap-4 sm:grid-cols-3"
      >
        <input
          className="border p-2 rounded"
          placeholder="Platform"
          value={form.platform}
          onChange={(e) => setForm({ ...form, platform: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Handle"
          value={form.handle}
          onChange={(e) => setForm({ ...form, handle: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Token"
          value={form.token}
          onChange={(e) => setForm({ ...form, token: e.target.value })}
        />
        <button className="sm:col-span-3 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition">
          Add Account
        </button>
      </form>

      <ul className="space-y-2">
        {accounts.map((acc) => (
          <li
            key={acc.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium capitalize">{acc.platform}</p>
              <p className="text-gray-500">{acc.handle}</p>
            </div>
            <span className="text-sm text-gray-400">ID: {acc.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
