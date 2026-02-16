'use client';

import { useState } from 'react';
import { labResults } from '@/lib/data';
import { FlaskConical, Search, Filter, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

const categories = ['All', 'CBC', 'Metabolic', 'Lipids', 'Liver', 'Thyroid', 'Vitamins', 'Inflammatory', 'Hormones'];

export default function LabsPanel() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [flagFilter, setFlagFilter] = useState<string>('all');

  const filtered = labResults.filter(l => {
    const matchSearch = l.testName.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || l.category === category;
    const matchFlag = flagFilter === 'all' || l.flag === flagFilter;
    return matchSearch && matchCat && matchFlag;
  });

  const totalTests = labResults.length;
  const normalCount = labResults.filter(l => l.flag === 'normal').length;
  const flaggedCount = totalTests - normalCount;
  const normalPct = Math.round((normalCount / totalTests) * 100);

  const getBarWidth = (value: number, min: number, max: number) => {
    const range = max - min;
    const extended = range * 0.5;
    const totalRange = range + extended * 2;
    const pos = ((value - min + extended) / totalRange) * 100;
    return Math.max(2, Math.min(98, pos));
  };

  const getNormalBarRange = (min: number, max: number) => {
    const range = max - min;
    const extended = range * 0.5;
    const totalRange = range + extended * 2;
    const left = (extended / totalRange) * 100;
    const width = (range / totalRange) * 100;
    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Lab Results</h1>
        <p className="text-zinc-500 text-sm mt-1">Comprehensive lab panel — {totalTests} markers analyzed</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Total Tests</p>
          <p className="text-2xl font-bold text-white">{totalTests}</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Normal</p>
          <p className="text-2xl font-bold text-green-400">{normalCount}</p>
          <p className="text-xs text-zinc-600">{normalPct}%</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Flagged</p>
          <p className="text-2xl font-bold text-red-400">{flaggedCount}</p>
          <p className="text-xs text-zinc-600">{100 - normalPct}%</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-zinc-500 mb-1">Categories</p>
          <p className="text-2xl font-bold text-indigo-400">{categories.length - 1}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search lab tests..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#111118] border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none focus:border-indigo-500/50"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                category === c
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {['all', 'normal', 'high', 'low'].map(f => (
            <button
              key={f}
              onClick={() => setFlagFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                flagFilter === f
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
              }`}
            >
              <Filter className="w-3 h-3 inline mr-1" />
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Results Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs text-zinc-500 font-medium px-4 py-3">Test Name</th>
                <th className="text-left text-xs text-zinc-500 font-medium px-4 py-3">Category</th>
                <th className="text-right text-xs text-zinc-500 font-medium px-4 py-3">Value</th>
                <th className="text-center text-xs text-zinc-500 font-medium px-4 py-3">Range</th>
                <th className="text-center text-xs text-zinc-500 font-medium px-4 py-3 min-w-[200px]">Visual</th>
                <th className="text-center text-xs text-zinc-500 font-medium px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lab => {
                const normalRange = getNormalBarRange(lab.normalMin, lab.normalMax);
                const markerPos = getBarWidth(lab.value, lab.normalMin, lab.normalMax);
                return (
                  <tr key={lab.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FlaskConical className={`w-4 h-4 ${
                          lab.flag === 'normal' ? 'text-green-400' :
                          lab.flag === 'high' ? 'text-red-400' : 'text-blue-400'
                        }`} />
                        <div>
                          <p className="text-sm text-white font-medium">{lab.testName}</p>
                          {lab.notes && <p className="text-xs text-zinc-600 mt-0.5">{lab.notes}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded">{lab.category}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-bold ${
                        lab.flag === 'normal' ? 'text-white' :
                        lab.flag === 'high' ? 'text-red-400' : 'text-blue-400'
                      }`}>
                        {lab.value}
                      </span>
                      <span className="text-xs text-zinc-600 ml-1">{lab.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs text-zinc-500">{lab.normalMin} – {lab.normalMax}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 h-full bg-green-500/20 rounded-full"
                          style={normalRange}
                        />
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${
                            lab.flag === 'normal' ? 'bg-green-400 border-green-300' :
                            lab.flag === 'high' ? 'bg-red-400 border-red-300' : 'bg-blue-400 border-blue-300'
                          }`}
                          style={{ left: `calc(${markerPos}% - 6px)` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                        lab.flag === 'normal' ? 'badge-normal' :
                        lab.flag === 'high' ? 'badge-danger' : 'badge-info'
                      }`}>
                        {lab.flag === 'high' ? <TrendingUp className="w-3 h-3" /> :
                         lab.flag === 'low' ? <TrendingDown className="w-3 h-3" /> :
                         <Minus className="w-3 h-3" />}
                        {lab.flag.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary by Category */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.filter(c => c !== 'All').map(cat => {
          const catTests = labResults.filter(l => l.category === cat);
          const catFlagged = catTests.filter(l => l.flag !== 'normal').length;
          return (
            <div key={cat} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400 font-medium">{cat}</span>
                {catFlagged > 0 && <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-white">{catTests.length - catFlagged}</span>
                <span className="text-xs text-zinc-600">/ {catTests.length} normal</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-2">
                <div
                  className={`h-full rounded-full ${catFlagged > 0 ? 'bg-yellow-400' : 'bg-green-400'}`}
                  style={{ width: `${((catTests.length - catFlagged) / catTests.length) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
