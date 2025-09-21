
import React, { useState, useEffect } from 'react';
import { PROCESSING_MESSAGES } from '../constants';

export const ProcessingStep: React.FC = () => {
  const [message, setMessage] = useState(PROCESSING_MESSAGES[0]);

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % PROCESSING_MESSAGES.length;
      setMessage(PROCESSING_MESSAGES[messageIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="flex justify-center items-center mb-6">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Processing OMR Sheet</h2>
      <p className="text-slate-500">{message}</p>
    </div>
  );
};
