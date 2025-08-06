import React from 'react';
import TailwindMainLayout from './components/layout/TailwindMainLayout';
import { DashboardProvider } from './context/DashboardContext';

function App() {
  return (
    <DashboardProvider>
      <TailwindMainLayout />
    </DashboardProvider>
  );
}

export default App;
