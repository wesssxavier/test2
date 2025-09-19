import { useState } from 'react';
import type { Item } from '../types';

export type CanvasLayer = {
  item: Item;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
};

export type MannequinCanvasProps = {
  layers: CanvasLayer[];
  onChange: (layers: CanvasLayer[]) => void;
};

const MannequinCanvas = ({ layers, onChange }: MannequinCanvasProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const moveLayer = (layer: CanvasLayer, deltaY: number) => {
    const next = layers.map((current) =>
      current.item.id === layer.item.id ? { ...current, y: current.y + deltaY } : current,
    );
    onChange(next);
  };

  return (
    <div className="relative h-[420px] rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="absolute inset-x-8 bottom-6 h-32 rounded-full bg-slate-300/30 blur-2xl" aria-hidden />
      <div className="absolute inset-x-0 top-6 flex justify-center">
        <div className="h-72 w-40 rounded-full border-2 border-dashed border-slate-300" />
      </div>
      <div className="absolute inset-0">
        {layers.map((layer) => (
          <button
            type="button"
            key={layer.item.id}
            onClick={() => setSelectedId(layer.item.id)}
            className={`absolute flex h-24 w-24 items-center justify-center rounded-lg border text-xs font-medium transition ${
              selectedId === layer.item.id
                ? 'border-primary bg-white text-primary shadow-lg'
                : 'border-transparent bg-white/70 text-slate-600 shadow'
            }`}
            style={{
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              transform: `translate(-50%, -50%) scale(${layer.scale}) rotate(${layer.rotation}deg)`,
              zIndex: layer.zIndex,
            }}
          >
            {layer.item.title}
          </button>
        ))}
      </div>
      {selectedId && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/90 px-4 py-2 text-xs shadow-lg">
          <span>Selected: {selectedId}</span>
          <button
            type="button"
            className="font-semibold text-primary"
            onClick={() => {
              const layer = layers.find((entry) => entry.item.id === selectedId);
              if (layer) {
                moveLayer(layer, -5);
              }
            }}
          >
            Move up
          </button>
          <button
            type="button"
            className="font-semibold text-primary"
            onClick={() => {
              const layer = layers.find((entry) => entry.item.id === selectedId);
              if (layer) {
                moveLayer(layer, 5);
              }
            }}
          >
            Move down
          </button>
        </div>
      )}
    </div>
  );
};

export default MannequinCanvas;
