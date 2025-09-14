import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/sidebar/sidebar';

const Sunset = React.lazy(() => import('sunset/Module'));

export function App() {
  return (
    <BrowserRouter basename='/'>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
        <Routes>
          <Route path="/sunset" element={<Sunset />} />
        </Routes>

      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
