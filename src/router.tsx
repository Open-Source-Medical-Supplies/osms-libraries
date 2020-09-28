import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LibraryMain from "./library-main/library-main";
import { SET_ENV } from "./redux/env.reducer";
import { LIB_ACTIONS } from "./redux/lib.reducer";
import loadTables from "./services/google-bucket.service";
import ErrorBoundary from "./shared/components/error-boundary";

function Router() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: SET_ENV });
    dispatch({ type: LIB_ACTIONS.LOAD_LIB });
    loadTables(dispatch);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Switch>
          <Route path="/library" exact component={LibraryMain} />
          <Redirect from="*" to="/library" />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default Router;
