
import React, { useState, useCallback } from 'react';
import { ANSWER_KEYS } from '../constants';
import { UploadIcon } from './icons/UploadIcon';

interface UploadStepProps {
  onProcess: (file: File, answerKeyId: string) => void;
  error: string | null;
}

export const UploadStep: React.FC<UploadStepProps> = ({ onProcess, error }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [answerKeyId, setAnswerKeyId] = useState<string>(Object.keys(ANSWER_KEYS)[0]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleFileChange = useCallback((selectedFile: File | null) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreview(null);
    }
  }, []);

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
        handleFileChange(droppedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onProcess(file, answerKeyId);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-semibold text-center mb-2">Upload OMR Sheet</h2>
      <p className="text-slate-500 text-center mb-6">Select the exam version and upload the scanned OMR sheet image to begin evaluation.</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="answer-key" className="block text-sm font-medium text-slate-700 mb-1">
            Exam Version / Answer Key Set
          </label>
          <select
            id="answer-key"
            value={answerKeyId}
            onChange={(e) => setAnswerKeyId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {Object.keys(ANSWER_KEYS).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            OMR Sheet Image
          </label>
           <label
            htmlFor="file-upload"
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer transition-colors ${isDragOver ? 'bg-indigo-50 border-indigo-500' : 'bg-white hover:border-slate-400'}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="space-y-1 text-center">
              {preview ? (
                <img src={preview} alt="OMR Preview" className="mx-auto h-48 w-auto object-contain rounded-md" />
              ) : (
                <>
                  <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600">
                    <span className="relative font-medium text-indigo-600 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </>
              )}
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={!file}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Process Sheet
        </button>
      </form>
    </div>
  );
};
