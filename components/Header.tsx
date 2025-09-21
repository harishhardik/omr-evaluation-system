
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v1"/><path d="m9 18 3-3-3-3"/><path d="m13 15-3-3 3-3"/><path d="M3 10v4c0 1.1.9 2 2 2h4"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Automated OMR Evaluation System
          </h1>
        </div>
        <span className="text-sm font-medium text-slate-500">Powered by Innomatics Research Labs</span>
      </div>
    </header>
  );
};
