import React from 'react';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>
      
      {/* Main Content */}
      <main className="relative z-10 w-full h-full pt-6 pb-20">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
