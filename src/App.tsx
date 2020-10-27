import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Container } from "./components/container";
import { PokemonList } from "./components/pokemon-list";

function App() {


  return (
    <BrowserRouter>
      <Container>
        <Navbar title="Timesheet" />
        <Switch>
          <Route path="/" component={PokemonList} exact />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
