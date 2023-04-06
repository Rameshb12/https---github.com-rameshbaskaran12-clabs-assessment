import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Components/Navbar/Navbar";
import MainContent from "./Components/MainContent/MainContent";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <MainContent/>
    </div>
  );
}

export default App;
