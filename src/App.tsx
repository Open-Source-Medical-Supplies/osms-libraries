import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import CategoryLibrary from "./components/category-library/category-library";
import ProjectLibrary from "./components/project-library/project-library";
import { SET_ENV } from "./redux/env.reducer";
import loadTables from "./services/google-bucket.service";
import LanguageService from "./services/language.service";
import ScrollToTop from "./shared/utility/scroll-to-top";

/* '20-06-28 * Can't get working due to bad path names after build + hosting */
// const LazyCategoryLib = React.lazy(() =>
// 	import("./components/category-library/category-library.component")
// );
// const LazyProjectLib = React.lazy(() =>
// 	import("./components/project-library/project-library.component")
// );
// <Suspense fallback={<div>Loading...</div>}>
// </Suspense>

function App() {
  const dispatch = useDispatch();
  dispatch({ type: SET_ENV });

  useEffect(() => {
    LanguageService.loadStaticLanguage(dispatch);
    loadTables(dispatch);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <BrowserRouter basename="/libraries">
        <Switch>
          <Route path="/category" component={CategoryLibrary} />
          <Route path="/project" component={ProjectLibrary} />
          <Redirect from="*" to="/category" />
        </Switch>
      </BrowserRouter>
      <ScrollToTop />
    </React.Fragment>
  );
}

export default App;
