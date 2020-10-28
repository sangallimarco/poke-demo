import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Canvas } from "./components/canvas";
import { Container } from "./components/container";
import { Navbar } from "./components/navbar";
import { FetchProvider } from "./statechart/fetch-provider";
import { PokemonDetails } from "./views/pokemon-details";
import { PokemonList } from "./views/pokemon-list";

export const App: React.FC = () => {
  return (
    <FetchProvider>
      <Canvas>
      <BrowserRouter>
      <Container>
        <Navbar title="Pokemons" />
        <Switch>
          <Route path="/" component={PokemonList} exact />
          <Route path="/details" component={PokemonDetails} />
        </Switch>
      </Container>
    </BrowserRouter>
      </Canvas>
    </FetchProvider>
  );
};
