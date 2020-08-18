import React from "react";
import PhotoSet from "./components/photoSet/PhotoSet";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Photos from here</h1>
      <PhotoSet />
      <PhotoSet longitude={-85} latitude={40} />
    </div>
  );
}

export default App;
