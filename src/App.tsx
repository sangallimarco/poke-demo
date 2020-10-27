import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Canvas } from "./components/canvas";
import { Container } from "./components/container";
import { Navbar } from "./components/navbar";
import { PokemonDetails } from "./views/pokemon-details";
import { PokemonList } from "./views/pokemon-list";

export const App: React.FC = () => {
  return (
    <Canvas>
      <BrowserRouter>
        <Container>
          <Navbar title="Pokemons" />
          <Switch>
            <Route path="/" component={PokemonList} exact />
            <Route path="/details/:id" component={PokemonDetails} exact />
          </Switch>
        </Container>
      </BrowserRouter>
    </Canvas>
  );
};
