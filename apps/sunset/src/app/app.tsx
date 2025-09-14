import { DragWrapper } from './components/drag-wrapper/drag-wrapper';
import { Skybox } from './components/skybox/skybox';
import { TimeProvider } from './contexts/time';


export function App() {
  return (
    <TimeProvider>
      <DragWrapper>
        <Skybox />
      </DragWrapper>
    </TimeProvider>
  );
}

export default App;
