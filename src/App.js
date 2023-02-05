import React, { Fragment } from "react";
import "./App.css";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";

function App() {
  return (
    <Fragment className="App">
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
