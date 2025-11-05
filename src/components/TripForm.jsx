import React, { useState } from 'react';
import { CalendarDays, Users, Wallet, Plane, Building2, Stars } from 'lucide-react';

const PREF_OPTIONS = [
  'Temple',
  'Food & Cuisine',
  'Photography',
  'Museums',
  'Outdoors',
  'Nightlife',
];

export default function TripForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    destination_country: 'France',
    arrival_airport: 'CDG',
    return_airport: 'CDG',
    start_date: '',
    end_date: '',
    budget: 50000,
    budget_currency: 'INR',
    preferences: ['Food & Cuisine', 'Photography'],
    group_size: 2,
    accommodation: 'Mid-range',
    travel_month: '',
  });

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const togglePref = (pref) => {
    setForm((f) => {
      const has = f.preferences.includes(pref);
      return { ...f, preferences: has ? f.preferences.filter((p) => p !== pref) : [...f.preferences, pref] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
          <input
            type="text"
            value={form.destination_country}
            onChange={(e) => update('destination_country', e.target.value)}
            className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., France"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Airport (IATA)</label>
          <input
            type="text"
            value={form.arrival_airport}
            onChange={(e) => update('arrival_airport', e.target.value.toUpperCase())}
            className="w-full uppercase rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="CDG"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Return Airport (IATA)</label>
          <input
            type="text"
            value={form.return_airport}
            onChange={(e) => update('return_airport', e.target.value.toUpperCase())}
            className="w-full uppercase rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="CDG"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><CalendarDays className="h-4 w-4"/>Start Date</label>
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => update('start_date', e.target.value)}
            className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><CalendarDays className="h-4 w-4"/>End Date</label>
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => update('end_date', e.target.value)}
            className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Users className="h-4 w-4"/>Group Size</label>
          <input
            type="number"
            min={1}
            value={form.group_size}
            onChange={(e) => update('group_size', parseInt(e.target.value || '1', 10))}
            className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Wallet className="h-4 w-4"/>Budget</label>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={form.budget}
              onChange={(e) => update('budget', parseFloat(e.target.value || '0'))}
              className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <select
              value={form.budget_currency}
              onChange={(e) => update('budget_currency', e.target.value)}
              className="rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Building2 className="h-4 w-4"/>Accommodation</label>
          <select
            value={form.accommodation}
            onChange={(e) => update('accommodation', e.target.value)}
            className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option>Budget</option>
            <option>Mid-range</option>
            <option>Luxury</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Travel Month</label>
          <input
            type="text"
            value={form.travel_month}
            onChange={(e) => update('travel_month', e.target.value)}
            placeholder="e.g., June"
            className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Stars className="h-4 w-4"/>Preferences</label>
        <div className="flex flex-wrap gap-2">
          {PREF_OPTIONS.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => togglePref(p)}
              className={`px-3 py-1.5 rounded-full border text-sm transition ${form.preferences.includes(p) ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Plane className="h-4 w-4"/>
          Reality-first planner. Numbers shown will be based on sources or clear assumptions.
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Planning…' : 'Plan my trip'}
        </button>
      </div>
    </form>
  );
}
