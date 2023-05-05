import { useState } from "react";
import WordSearch from "./pages/WordSearch";

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WordSearch></WordSearch>
      </div>
    </>
  );
}

export default App;
