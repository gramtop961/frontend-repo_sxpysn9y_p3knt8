import React from 'react';
import { MapPin, Calendar, Coins, ExternalLink, Sun, Utensils, Landmark } from 'lucide-react';

function LineItem({ label, value, note }) {
  return (
    <div className="flex items-start justify-between text-sm py-1">
      <span className="text-gray-600">{label}</span>
      <div className="text-right">
        <span className="font-medium text-gray-900">{value}</span>
        {note && <div className="text-xs text-gray-400">{note}</div>}
      </div>
    </div>
  );
}

export default function Itinerary({ plan }) {
  if (!plan) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-600">
        Submit your preferences to generate a realistic day-by-day itinerary with line-item costs.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700"><MapPin className="h-4 w-4"/> {plan.destination}</div>
          <div className="flex items-center gap-2 text-sm text-gray-700"><Calendar className="h-4 w-4"/> {plan.dateRange}</div>
          <div className="flex items-center gap-2 text-sm text-gray-700"><Coins className="h-4 w-4"/> Total: {plan.total.cost} {plan.total.currency}</div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold text-gray-900 mb-2">Day-by-day</h3>
            <ul className="space-y-3">
              {plan.days.map((d) => (
                <li key={d.day} className="rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">Day {d.day}: {d.title}</p>
                    <span className="text-sm text-gray-600">{d.cost} {plan.total.currency}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{d.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-indigo-700">
                    {d.tags?.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1">
                        {t === 'food' && <Utensils className="h-3 w-3"/>}
                        {t === 'temple' && <Landmark className="h-3 w-3"/>}
                        {t === 'outdoors' && <Sun className="h-3 w-3"/>}
                        {t}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Cost breakdown</h3>
            <div className="rounded-lg border border-gray-200 p-3">
              <LineItem label="Flights" value={`${plan.breakdown.flights} ${plan.total.currency}`} note={plan.sources.flights?.label} />
              <LineItem label="Accommodation" value={`${plan.breakdown.hotel} ${plan.total.currency}`} note={plan.sources.hotel?.label} />
              <LineItem label="Meals" value={`${plan.breakdown.meals} ${plan.total.currency}`} note={plan.sources.meals?.label} />
              <LineItem label="Transport" value={`${plan.breakdown.transport} ${plan.total.currency}`} note={plan.sources.transport?.label} />
              <LineItem label="Activities" value={`${plan.breakdown.activities} ${plan.total.currency}`} note={plan.sources.activities?.label} />
              <LineItem label="Buffer" value={`${plan.breakdown.buffer} ${plan.total.currency}`} note={plan.sources.buffer?.label} />
              <div className="mt-2 border-t pt-2 flex items-center justify-between">
                <span className="text-sm text-gray-700">Trip total</span>
                <span className="text-base font-semibold text-gray-900">{plan.total.cost} {plan.total.currency}</span>
              </div>
            </div>
            <a href={plan.bookingLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 w-full rounded-md bg-indigo-600 text-white py-2 hover:bg-indigo-700">
              Book with providers <ExternalLink className="h-4 w-4"/>
            </a>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        Prices are illustrative for demo purposes. In production, each line-item shows a source and timestamp.
      </div>
    </div>
  );
}
