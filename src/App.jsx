import { useState } from "react";
import "./App.css";

import { MergeSortVisualizer } from "./Merge";
import { Canvas } from "./ClickButton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <MergeSortVisualizer />
      <Canvas />
    </div>
  );
}

export default App;
