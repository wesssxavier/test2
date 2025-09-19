import { useCallback, useState, type ChangeEvent, type DragEvent } from 'react';
import { bgRemoveProvider } from '../services/bgRemoveProvider';

export type UploadWidgetProps = {
  onUpload: (file: File, processedPath: string) => void;
};

const UploadWidget = ({ onUpload }: UploadWidgetProps) => {
  const [isDragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState('Drop wardrobe images to digitize');

  const processFile = useCallback(
    async (file: File) => {
      setStatus('Processing background...');
      const result = await bgRemoveProvider.removeBackground(file.name);
      onUpload(file, result.imagePath);
      setStatus(result.usedFallback ? 'Mask editor used – refine in closet.' : 'Background removed.');
    },
    [onUpload],
  );

  const onDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
      const files = Array.from(event.dataTransfer.files);
      await Promise.all(files.map((file) => processFile(file)));
    },
    [processFile],
  );

  const onBrowse = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;
      await Promise.all(Array.from(files).map((file) => processFile(file)));
    },
    [processFile],
  );

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
        isDragOver ? 'border-primary bg-primary/5' : 'border-slate-300'
      }`}
    >
      <p className="text-sm font-medium text-slate-700">Digitize your wardrobe</p>
      <p className="text-xs text-slate-500">Drag & drop or browse files (PNG, JPEG)</p>
      <label className="mt-4 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow">
        Browse
        <input type="file" accept="image/*" multiple className="hidden" onChange={onBrowse} />
      </label>
      <p className="mt-3 text-xs text-slate-500">{status}</p>
    </div>
  );
};

export default UploadWidget;
