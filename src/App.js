import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    fetch("http://localhost:8000/users");
  }, []);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
