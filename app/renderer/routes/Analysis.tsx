import { useState } from 'react';
import { useWardrobeStore } from '../state/useWardrobeStore';

const Analysis = () => {
  const { outfits } = useWardrobeStore((state) => ({ outfits: state.outfits }));
  const [result, setResult] = useState<string>('Pick an outfit to analyze.');
  const [tips, setTips] = useState<string[]>([
    'Refresh your rotation with a bold accessory today.',
    'Add a weather-ready layer before heading out.',
  ]);

  const analyze = async () => {
    const outfit = outfits[0];
    if (!outfit) return;
    if (!window.styleAI) {
      setResult('Analysis available in desktop build.');
      return;
    }
    const payload = await window.styleAI.analysis.analyzeOutfit({ outfitId: outfit.id });
    if (typeof payload === 'object' && payload && 'score' in payload) {
      const summary = payload as { score: number; notes: string[]; tips: string[] };
      setResult(`Score ${summary.score}/100 — ${summary.notes.join(', ')}`);
      setTips(summary.tips);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800">Outfit analysis</h2>
        <p className="text-sm text-slate-500">Leverage AI feedback on balance, fit and weather readiness.</p>
        <button
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow"
          onClick={analyze}
        >
          Analyze outfit
        </button>
        <p className="mt-4 text-sm text-slate-600">{result}</p>
      </section>

      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-primary">AI Style Assistant</h3>
        <p className="text-xs text-primary/80">Daily tips and trend callouts just for you.</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Analysis;
