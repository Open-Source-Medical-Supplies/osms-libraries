import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import LibraryMain from "./components/library-main/library-main";
import { SET_ENV } from "./redux/env.reducer";
import { LIB_ACTIONS } from "./redux/lib.reducer";
import loadTables from "./services/google-bucket.service";
import ErrorBoundary from "./shared/components/error-boundary";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: SET_ENV });
    dispatch({ type: LIB_ACTIONS.LIB_START });
    loadTables(dispatch);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter basename="/libraries">
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={LibraryMain} />
          <Redirect from="*" to="/" />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
