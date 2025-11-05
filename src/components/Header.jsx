import React from 'react';
import { Rocket, Plane, Hotel, Map } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-indigo-600" />
          <span className="font-semibold text-gray-900">Payani Maga</span>
          <span className="hidden sm:inline text-gray-400">— autonomous travel planner</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          <a href="#plan" className="hover:text-gray-900 flex items-center gap-1"><Plane className="h-4 w-4"/>Plan</a>
          <a href="#stay" className="hover:text-gray-900 flex items-center gap-1"><Hotel className="h-4 w-4"/>Stay</a>
          <a href="#map" className="hover:text-gray-900 flex items-center gap-1"><Map className="h-4 w-4"/>Map</a>
        </nav>
      </div>
    </header>
  );
}
