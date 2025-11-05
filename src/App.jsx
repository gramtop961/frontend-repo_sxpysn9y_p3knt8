import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import TripForm from './components/TripForm';
import ProgressSteps from './components/ProgressSteps';
import Itinerary from './components/Itinerary';

function daysBetween(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1);
}

function buildMockPlan(input) {
  const n = daysBetween(input.start_date, input.end_date);
  const currency = input.budget_currency || 'INR';

  // Very lightweight, deterministic demo numbers (not real). In production this comes from live sources.
  const flights = 22000 * input.group_size; // per trip for group
  const hotelPerNight = input.accommodation === 'Luxury' ? 14000 : input.accommodation === 'Mid-range' ? 8000 : 4000;
  const hotel = hotelPerNight * (n - 1);
  const meals = 1200 * n * input.group_size;
  const transport = 800 * n;
  const activities = 1000 * n * input.group_size;
  const buffer = Math.round((flights + hotel + meals + transport + activities) * 0.12);
  const total = flights + hotel + meals + transport + activities + buffer;

  const dateRange = `${input.start_date} → ${input.end_date}`;

  const tags = [
    ...(input.preferences.includes('Food & Cuisine') ? ['food'] : []),
    ...(input.preferences.includes('Temple') ? ['temple'] : []),
    ...(input.preferences.includes('Photography') ? ['outdoors'] : []),
  ];

  const days = Array.from({ length: n }).map((_, i) => ({
    day: i + 1,
    title: i === 0 ? 'Arrival & local exploration' : i === n - 1 ? 'Leisure & departure prep' : `Discover ${input.destination_country}`,
    summary: i === 0
      ? `Land at ${input.arrival_airport}, check-in to your ${input.accommodation.toLowerCase()} stay, and explore a nearby neighborhood.`
      : i === n - 1
      ? 'Relax, shop for souvenirs, and enjoy a farewell dinner.'
      : 'Guided highlights and hidden gems aligned to your vibe.',
    cost: Math.round((hotelPerNight || 0) / Math.max(1, (n - 1)) + (meals / n) + (transport / n) + (activities / n)),
    tags,
  }));

  return {
    destination: input.destination_country,
    dateRange,
    total: { cost: total, currency },
    breakdown: { flights, hotel, meals, transport, activities, buffer },
    days,
    sources: {
      flights: { label: 'Demo source: cached lowest fare (mock)' },
      hotel: { label: 'Demo source: median nightly rate (mock)' },
      meals: { label: 'Demo source: city meal index (mock)' },
      transport: { label: 'Demo source: local transport estimate (mock)' },
      activities: { label: 'Demo source: attraction fees (mock)' },
      buffer: { label: '12% contingency' },
    },
    bookingLink: 'https://www.google.com/travel/',
  };
}

export default function App() {
  const [progress, setProgress] = useState({ current: null, status: {} });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const canShowProgress = Boolean(progress.current);

  const handlePlan = async (input) => {
    setLoading(true);
    setPlan(null);
    const next = (key) => setProgress((p) => ({ current: key, status: { ...p.status, [key]: 'active' } }));
    const done = (key) => setProgress((p) => ({ current: key, status: { ...p.status, [key]: 'done' } }));

    next('feasibility');
    await new Promise((r) => setTimeout(r, 600));
    done('feasibility');

    next('fetching');
    await new Promise((r) => setTimeout(r, 800));
    done('fetching');

    next('planning');
    await new Promise((r) => setTimeout(r, 700));
    done('planning');

    next('finalizing');
    await new Promise((r) => setTimeout(r, 400));
    const built = buildMockPlan(input);
    setPlan(built);
    done('finalizing');

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Plan smarter. Travel better.</h1>
          <p className="mt-2 text-gray-600">Reality-first trip planning with transparent costs, explainable choices, and fast iterations.</p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6" id="plan">
          <div className="lg:col-span-3">
            <TripForm onSubmit={handlePlan} loading={loading} />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Progress</h3>
              {canShowProgress ? (
                <ProgressSteps current={progress.current} statusMap={progress.status} />
              ) : (
                <p className="text-sm text-gray-600">Submit the form to start feasibility checks and live data fetching.</p>
              )}
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Principles</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Reality-first pricing (no guesses)</li>
                <li>Explainable line-items and sources</li>
                <li>Graceful negotiation if budget is tight</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="results">
          <Itinerary plan={plan} />
        </section>
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Payani Maga — demo UI
      </footer>
    </div>
  );
}
