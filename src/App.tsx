import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import CategoryLibrary from "./components/category-library/category-library";
import ProjectLibrary from "./components/project-library/project-library";
import { SET_ENV } from "./redux/env.reducer";
import LanguageService from "./services/language.service";
import ScrollToTop from "./shared/utility/scroll-to-top";

/* '20-06-28 * Can't get working due to bad path names after build + hosting */
// const LazyCategoryLib = React.lazy(() =>
// 	import("./components/category-library/category-library.component")
// );
// const LazyProjectLib = React.lazy(() =>
// 	import("./components/project-library/project-library.component")
// );

function App() {
  const dispatch = useDispatch();
  dispatch({ type: SET_ENV });

  useEffect(() => {
    LanguageService.loadStaticLanguage(dispatch);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <React.Fragment>
      <BrowserRouter basename="/libraries">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/category-library" component={CategoryLibrary} />
            <Route path="/project-library" component={ProjectLibrary} />
            <Redirect from="*" to="/" />
          </Switch>
        </Suspense>
      </BrowserRouter>
      <ScrollToTop />
    </React.Fragment>
  );
}

export default App;
