import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const ReactZPP = () => {
  return (
    <TransformWrapper>
      <TransformComponent>
        <div
          style={{ width: '300px', height: '300px', background: 'lightblue' }}
        >
          Drag & Zoom me
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default ReactZPP;
