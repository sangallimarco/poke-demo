import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Canvas } from "./components/canvas";
import { Container } from "./components/container";
import { Navbar } from "./components/navbar";
import { FetchProvider } from "./statechart/fetch-provider";
import { DetailsView } from "./views/details/details-view";
import { ListView } from "./views/list/list-view";

export const App: React.FC = () => {
  return (
    <FetchProvider>
      <Canvas>
      <BrowserRouter>
      <Container>
        <Navbar/>
        <Switch>
          <Route path="/" component={ListView} exact />
          <Route path="/favourites" component={DetailsView} />
          <Route path="/details" component={DetailsView} />
        </Switch>
      </Container>
    </BrowserRouter>
      </Canvas>
    </FetchProvider>
  );
};
