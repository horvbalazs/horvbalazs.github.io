import * as React from 'react';

const Sunset = React.lazy(() => import('sunset/Module'));

export function App() {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/sunset">🌅 Sunset</Link>
          </li>
        </ul>
      </nav> */}

      <React.Suspense fallback={<div>Loading...</div>}>
        <Sunset />
      </React.Suspense>
    </>
  );
}

export default App;
