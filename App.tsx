import React, { useState, useRef } from 'react';
import { AnimatedLogo } from './components/AnimatedLogo';

const App: React.FC = () => {
  const [replayKey, setReplayKey] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [statusText, setStatusText] = useState('');

  const handleReplay = () => {
    setReplayKey(prev => prev + 1);
  };

  const handleDownload = async () => {
    try {
      setStatusText('Select "This Tab" to record');
      
      // 1. Request Screen Capture
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { 
          displaySurface: "browser",
          frameRate: 60
        },
        audio: false,
      });

      setStatusText('Recording...');
      setIsRecording(true);

      // 2. Setup MediaRecorder
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") 
        ? "video/webm;codecs=vp9" 
        : "video/webm";

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 5000000 // 5 Mbps for high quality
      });
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        // Create blob and download
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'genai-hackathon-logo.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Cleanup
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        setStatusText('');
      };

      // 3. Start Recording & Restart Animation
      mediaRecorder.start();
      
      // Slight delay to ensure recorder is ready before animation starts
      setTimeout(() => {
         setReplayKey(prev => prev + 1);
      }, 500);

      // 4. Stop automatically after animation completes (approx 7.5s to be safe)
      setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }, 7500);

    } catch (err: any) {
      console.error("Recording cancelled or failed:", err);
      setIsRecording(false);
      
      if (err.message && err.message.includes('permissions policy')) {
        setStatusText('Recording disabled by security policy.');
      } else if (err.name === 'NotAllowedError') {
        setStatusText('Recording permission denied.');
      } else {
        setStatusText('Recording cancelled.');
      }

      // Clear error message after 3 seconds
      setTimeout(() => setStatusText(''), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-8 overflow-hidden relative">
      
      {/* Decorative background elements (subtle) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-yellow-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[10%] left-[20%] w-[35%] h-[35%] bg-green-50 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Status Indicator (Visible during recording setup) */}
      {statusText && (
        <div className="fixed top-8 z-50 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse transition-all">
          {statusText}
        </div>
      )}

      <div className="z-10 flex flex-col items-center gap-12 w-full max-w-4xl">
        <div className="scale-75 sm:scale-100 md:scale-125 origin-center transition-transform duration-500 py-10">
           {/* Key prop forces re-mount on replay */}
           <AnimatedLogo key={replayKey} />
        </div>
        
        {/* Controls - Hidden during recording to keep video clean */}
        <div 
          className={`flex gap-4 transition-opacity duration-300 ${isRecording ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <button 
            onClick={handleReplay}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-all active:scale-95 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            Replay
          </button>

          <button 
            onClick={handleDownload}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-all active:scale-95 shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Download Video
          </button>
        </div>
      </div>

      <div className={`absolute bottom-4 text-gray-400 text-xs transition-opacity duration-300 ${isRecording ? 'opacity-0' : 'opacity-100'}`}>
         Press "Download Video" and select "This Tab" to record.
      </div>
    </div>
  );
};

export default App;