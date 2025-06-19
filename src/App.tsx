import Planets from './pages/Planets';
import { getPlanets } from './actions/get-planets.action';
import { Suspense } from 'react';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Planetas del Sistema Solar</h1>

      <Suspense fallback= { <div>Cargando planetas... </div> } >
        <Planets getPlanets= {getPlanets()} />

      </Suspense>
    </div>
  );
}

export default App;
